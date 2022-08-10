import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import EnhancedEncryptionIcon from "@mui/icons-material/EnhancedEncryption";
import {
  Alert,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Fab,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import DialogContentText from "@mui/material/DialogContentText";
import { useCallback, useContext, useEffect, useState, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import { validEmail } from "../../../../common/Regex";
import { API_UPLOADS_URL } from "../../../../constants";
import {
  _createProviderUser,
  _signup,
  _updateUser,
} from "../../../../features/userSlice";
import useServices from "../../../../hooks/Dashboard/useServices";
import AddWorkdaysDialog from "../../AddWorkdayDialog/AddWorkdaysDialog";
import UserContext from "../../UserContext";
import WorkdaysTable from "../../WorkdaysTable";
import HorizontalLinearStepper from "./HorizontalLinearStepper";

export default function AddServiceProviderDialog(props) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [workdaysDialog, setWorkdaysDialog] = useState(false);
  const [workdaysArr, setWorkdaysArr] = useState([]);
  const [file, setFile] = useState([]);
  const [firstDayAvailable, setFirstDayAvailable] = useState(0);
  const [error, setError] = useState(false);
  const [chosenServices, setChosenServices] = useState([]);
  const [password, setPassword] = useState(
    Math.random().toString(36).slice(-8)
  );
  const user = useContext(UserContext);
  const services = useServices(user);
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  let providerForEdit = props?.providerForEdit;

  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleClose = () => {
    toggleDialog();
  };

  const toggleDialog = () => {
    props.toggle(!props.open);
  };

  useEffect(()=>{
    setActiveStep(0)
    setFile([])
    setPassword(Math.random().toString(36).slice(-8))
  },[props?.open])

  const handleNext = () => {
    if (
      (activeStep === 0 &&
        (firstname === "" ||
          lastname === "" ||
          !validEmail.test(email) ||
          phone === "")) ||
      (activeStep === 2 && file.length === 0 && !providerForEdit?.filename) ||
      (activeStep === 3 && password === "")
    )
      return setError(true);
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  useEffect(() => {
    if (providerForEdit) {
      setFirstname(providerForEdit.firstname);
      setPhone(providerForEdit.phone);
      setLastname(providerForEdit.lastname);
      setEmail(providerForEdit.email);
      setWorkdaysArr(providerForEdit?.workdays);
      setChosenServices(providerForEdit?.services);
    } else {
      setFirstname("");
      setPhone("");
      setLastname("");
      setEmail("");
      setWorkdaysArr([]);
      setChosenServices([]);
    }
  }, [providerForEdit]);

  const handleAdd = async () => {
    let newUser = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
    };

    let existingUser = await user.findUserByEmail(email);
    let response;

    if (providerForEdit) {
      response = await dispatch(_updateUser({ ...existingUser, ...newUser }));
    } else response = await dispatch(_createProviderUser(newUser));

    let userResponse = response?.payload;
    if (response.type.endsWith("fulfilled")) {
      const workdays = workdaysArr.map((wd) => {
        return {
          id: wd?.id,
          starttime: wd.startTimeFormatted || wd.starttime,
          endtime: wd.endTimeFormatted || wd.endtime,
          day: wd.day,
        };
      });

      let newProvider = {
        id: providerForEdit?.id || null,
        firstname: firstname,
        lastname: lastname,
        phone: phone,
        email: email,
        file: file,
        filename: providerForEdit?.filename || "",
        workdays: workdays,
        services: chosenServices,
        business: user?.business,
        appointments: providerForEdit?.appointments || [],
        user: user?.user || providerForEdit?.user,
      };

      if (providerForEdit)
        response = await props?.providers.update(newProvider);
      else response = await props?.providers.add(newProvider);
      userResponse.serviceProvider = response.payload;
      userResponse = { ...userResponse, ...newUser, business: user?.business };
      console.log(userResponse)
      response = await dispatch(_updateUser(userResponse));

      if (response.type.endsWith("fulfilled")) {
        toggleDialog();
        user?.refresh();
      }
    } else return setError(response.error.message);
  };

  const Dropzone = (
    <div
      className="dropzone-container"
      {...getRootProps()}
      style={
        error && file?.length === 0
          ? { borderColor: "red", borderWidth: "3px", color: "red" }
          : null
      }
    >
      <input {...getInputProps()} />
      <p>גרור ושחרר קובץ, או לחץ לבחירה</p>
      <CloudUploadIcon sx={styles.CloudUploadIcon} />
    </div>
  );

  const findFirstDayAvailable = () => {
    for (let idx = 0; idx < 7; idx++) {
      let found = false;
      workdaysArr.forEach((e) => {
        if (e.day === idx) {
          found = true;
          return;
        }
      });
      if (found === false) {
        setFirstDayAvailable(idx);
        idx = 7;
      }
    }
  };

  const handleCheck = (e, service) => {
    if (e.target.checked) setChosenServices([...chosenServices, service]);
    else {
      let tempServices = [...chosenServices];
      tempServices = tempServices.filter(
        (_service) => _service.id !== service.id
      );
      setChosenServices(tempServices);
    }
  };

  useEffect(() => {
    findFirstDayAvailable();
  }, [workdaysArr, setFirstDayAvailable]);

  const ServicesCheckboxes = useMemo(
    () =>
      services?.list?.map((service) => {
        return (
          <FormControlLabel
            control={
              <Checkbox
                checked={chosenServices.some((_ser) => _ser.id === service.id)}
                onChange={(e) => handleCheck(e, service)}
              />
            }
            label={service?.name}
            sx={{ margin: "1%" }}
          />
        );
      }),
    [chosenServices]
  );

  const DetailsForm = (
    <>
      <DialogContentText sx={{ direction: "ltr" }}>
        יש למלא את כל הפרטים לפי הסדר.
        <br />
        לנותן השירות יפתח חשבון במערכת באופן אוטומטי בלחיצה על "הוספה", כאשר
        פרטי ההתחברות יהיו הדוא"ל והסיסמה הזמנית שתוצג בהמשך הטופס.
        <br />
        בסעיף יצירת סיסמה יש ללחוץ על הכפתור להצגת הסיסמה הזמנית.
      </DialogContentText>
      <br />
      <TextField
        required
        error={error && firstname.length === 0 && true}
        id="outlined-required"
        variant="outlined"
        label="שם פרטי"
        value={firstname}
        sx={styles.textField}
        onChange={(e) => setFirstname(e.target.value)}
        fullWidth
      />
      <TextField
        required
        error={error && lastname.length === 0 && true}
        id="outlined-required"
        variant="outlined"
        value={lastname}
        label="שם משפחה"
        sx={styles.textField}
        onChange={(e) => setLastname(e.target.value)}
        fullWidth
      />
      <TextField
        required
        value={email}
        error={error && !validEmail.test(email) && true}
        id="outlined-required"
        variant="outlined"
        label='דוא"ל'
        sx={styles.textField}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        required
        value={phone}
        error={error && phone.length === 0 && true}
        id="outlined-required"
        variant="outlined"
        label="מספר טלאפון"
        sx={styles.textField}
        onChange={(e) => setPhone(e.target.value)}
        fullWidth
      />
      <Typography variant="subtitle1" gutterBottom component="div">
        תחומי שירות
      </Typography>
      <Divider />
      <div className="services-container">{ServicesCheckboxes}</div>
    </>
  );

  const workdaysView = (
    <>
      <Typography variant="subtitle1" gutterBottom component="div">
        ימי ושעות עבודה
      </Typography>
      <Divider />
      <WorkdaysTable
        workdaysArr={workdaysArr}
        setWorkdaysArr={setWorkdaysArr}
        openDialog={workdaysDialog}
        setOpenDialog={setWorkdaysDialog}
      />
    </>
  );

  const profilePictureView = (
    <>
      <Typography variant="subtitle1" gutterBottom component="div">
        תמונת פרופיל
      </Typography>
      <Divider />
      <br />

      <div
        className="profile-img-preview"
        style={{ width: "100%", display: "flex", justifyContent: "center" }}
      >
        {props?.providerForEdit?.filename ? (
          <img
            style={{ maxWidth: "100px" }}
            src={props?.providerForEdit?.filename}
            alt="profile"
          />
        ) : (
          <Typography variant="subtitle1" gutterBottom component="div">
            אין תמונה
          </Typography>
        )}
      </div>
      <br />
      {Dropzone}
      {file && (
        <p>
          {file[0]?.name} - {file[0]?.size}
        </p>
      )}
    </>
  );

  const CredentialsView = (
    <>
      <DialogContentText sx={{ direction: "ltr" }}>
        פרטים אלו ישמשו את נותן השירות לכניסה למערכת:
      </DialogContentText>
      <Stack direction="column" sx={styles.addWorkdays}>
        <Typography variant="h6" gutterBottom sx={{ direction: "ltr" }}>
          שם משתמש: {email}
        </Typography>
        <Typography variant="h6" gutterBottom sx={{ direction: "ltr" }}>
          סיסמה זמנית: {password}
        </Typography>
      </Stack>
    </>
  );

  return (
    <Dialog open={props.open} sx={styles.dialogContainer}>
      {workdaysDialog && (
        <AddWorkdaysDialog
          open={workdaysDialog}
          toggle={setWorkdaysDialog}
          addWorkdays={setWorkdaysArr}
          workdaysArr={workdaysArr}
          firstDayAvailable={firstDayAvailable}
        />
      )}
      <DialogTitle>הוסף נותן שירות</DialogTitle>
      <DialogContent>
        {error && (
          <Alert severity="error">
            יש למלא את כל השדות ולהוסיף תמונה פרופיל.
            <br />
            יש לוודא כי המייל איננו תפוס כבר.
          </Alert>
        )}
        <HorizontalLinearStepper
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
        {activeStep === 0 && DetailsForm}
        {activeStep === 1 && workdaysView}
        {activeStep === 2 && profilePictureView}
        {activeStep === 3 && CredentialsView}
      </DialogContent>
      <DialogActions>
        {activeStep < 3 ? (
          <Button variant="contained" onClick={handleNext}>
            המשך
          </Button>
        ) : (
          <Button variant="contained" onClick={handleAdd}>
            הוספה
          </Button>
        )}
        <Box sx={{ flex: "1 1 auto" }} />
        <Button variant="text" onClick={handleClose}>
          ביטול
        </Button>
        {activeStep > 0 && (
          <Button variant="contained" onClick={handleBack}>
            חזור
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

const styles = {
  dialogContainer: {
    direction: "rtl",
    minWidth: "500px",
  },
  textField: {
    margin: "2% 0",
    border: "0px",
    overflow: "hidden",
  },
  CloudUploadIcon: {
    margin: "0 2% ",
  },
  addWorkdays: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    padding: "2% 0",
    color: "rgba(0, 0, 0, 0.6)",
  },
  addButton: {
    bgcolor: "success",
  },
};
