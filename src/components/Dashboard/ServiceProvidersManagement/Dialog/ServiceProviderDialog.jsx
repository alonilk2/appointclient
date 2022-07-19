import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Alert,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback, useContext, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import useServices from "../../../../hooks/Dashboard/useServices";
import AddWorkdaysDialog from "../../AddWorkdayDialog/AddWorkdaysDialog";
import UserContext from "../../UserContext";
import WorkdaysTable from "../../WorkdaysTable";

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
  const user = useContext(UserContext);
  const services = useServices(user);

  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleClose = () => {
    toggleDialog();
  };

  const toggleDialog = () => {
    props.toggle(!props.open);
  };

  useEffect(() => {
    if (props?.providerForEdit) {
      setFirstname(props?.providerForEdit.firstname);
      setPhone(props?.providerForEdit.phone);
      setLastname(props?.providerForEdit.lastname);
      setEmail(props?.providerForEdit.email);
      setWorkdaysArr(props?.providerForEdit?.workdays);
      setChosenServices(props?.providerForEdit?.services);
    }
  }, [props?.providerForEdit]);

  const handleAdd = async () => {
    if (
      firstname === "" ||
      lastname === "" ||
      email === "" ||
      phone === "" ||
      file.length === 0
    )
      return setError(true);

    const workdays = workdaysArr.map((wd) => {
      return {
        id: wd?.id,
        starttime: wd.startTimeFormatted || wd.starttime,
        endtime: wd.endTimeFormatted || wd.endtime,
        day: wd.day,
      };
    });

    let newProvider = {
      id: props?.providerForEdit?.id || null,
      firstname: firstname,
      lastname: lastname,
      phone: phone,
      email: email,
      file: file,
      filename: "",
      workdays: workdays,
      services: chosenServices,
      business: user?.business,
    };

    console.log(newProvider)

    let response;
    if (props?.providerForEdit) await props?.providers.update(newProvider);
    else await props?.providers.add(newProvider);

    if (response?.type.endsWith("fuloutlined")) {
      toggleDialog();
      user.refresh();
    }
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

  const ServicesCheckboxes = services?.list?.map((service) => {
    return (
      <FormControlLabel
        control={<Checkbox onChange={(e) => handleCheck(e, service)} />}
        label={service?.name}
        sx={{ margin: "1%" }}
      />
    );
  });

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
            יש למלא את כל השדות ולהוסיף קובץ תמונה להעלאה
          </Alert>
        )}

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
          error={error && email.length === 0 && true}
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
          ימי ושעות עבודה
        </Typography>
        <Divider />
        <WorkdaysTable
          workdaysArr={workdaysArr}
          setWorkdaysArr={setWorkdaysArr}
          openDialog={workdaysDialog}
          setOpenDialog={setWorkdaysDialog}
        />
        <Typography variant="subtitle1" gutterBottom component="div">
          תחומי שירות
        </Typography>
        <Divider />
        <div className="services-container">{ServicesCheckboxes}</div>
        <Typography variant="subtitle1" gutterBottom component="div">
          תמונת פרופיל
        </Typography>
        <Divider />
        <br />
        {Dropzone}
        {file && (
          <p>
            {file[0]?.name} - {file[0]?.size}
          </p>
        )}
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={handleClose}>
          ביטול
        </Button>
        <Button variant="contained" onClick={handleAdd}>
          הוספה
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const styles = {
  dialogContainer: {
    direction: "rtl",
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
