import AddIcon from "@mui/icons-material/Add";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Fab from "@mui/material/Fab";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import { _fetchServiceProviders } from "../../../features/dashboardSlice";
import AddWorkdaysDialog from "./AddWorkdaysDialog";
import { useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { Alert } from "@mui/material";

const days = [
  "יום ראשון",
  "יום שני",
  "יום שלישי",
  "יום רביעי",
  "יום חמישי",
  "יום שישי",
  "יום שבת",
];

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
  const dispatch = useDispatch();
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

  const handleAddWorkdays = () => {
    setWorkdaysDialog(!workdaysDialog);
  };

  const handleRemove = (dayId) => {
    workdaysArr.forEach((e, idx) => {
      if (e.day === dayId) {
        console.log(e.day + " - " + idx + "-" + dayId);
        let tempArr = [...workdaysArr];
        tempArr.splice(idx, 1);
        setWorkdaysArr(tempArr);
      }
    });
  };

  useEffect(() => {
    if (props?.providerForEdit) {
      setFirstname(props?.providerForEdit.firstname);
      setPhone(props?.providerForEdit.phone);
      setLastname(props?.providerForEdit.lastname);
      setEmail(props?.providerForEdit.email);
      setWorkdaysArr(props?.providerForEdit?.workdays);
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
        starttime: wd.startTimeFormatted,
        endtime: wd.endTimeFormatted,
        day: wd.day,
      };
    });

    let newProvider = {
      firstname: firstname,
      lastname: lastname,
      phone: phone,
      email: email,
      file: file,
      filename: "",
      workdays: workdays,
    };

    let response = await props?.add(newProvider);
    if (response?.type == "dashboard/addServiceProvider/fulfilled") {
      toggleDialog();
      dispatch(_fetchServiceProviders());
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

  useEffect(() => {
    findFirstDayAvailable();
  }, [workdaysArr, setFirstDayAvailable]);

  const WorkdaysRow = () => {
    let table = (
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="right">יום</TableCell>
            <TableCell align="right">שעת התחלה</TableCell>
            <TableCell align="right">שעת סיום</TableCell>
            <TableCell align="right">מחיקה</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {workdaysArr.map((row) => {
            return (
              <TableRow
                key={row.day}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right" component="th" scope="row">
                  {days[row.day]}
                </TableCell>
                <TableCell align="right">{row?.startTimeFormatted}</TableCell>
                <TableCell align="right">{row?.endTimeFormatted}</TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-label="delete"
                    color="error"
                    size="small"
                    onClick={() => handleRemove(row.day)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );

    return (
      <>
        <Typography variant="subtitle1" component="div">
          ימי ושעות עבודה
        </Typography>
        <Divider />
        {workdaysArr.length > 0 && table}
        {workdaysArr.length != 7 && (
          <Stack direction="column" sx={styles.addWorkdays}>
            <Fab color="primary" aria-label="add" onClick={handleAddWorkdays}>
              <AddIcon />
            </Fab>
            <p>הוספת ימי ושעות עבודה</p>
          </Stack>
        )}
      </>
    );
  };

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
          variant="filled"
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
          variant="filled"
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
          variant="filled"
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
          variant="filled"
          label="מספר טלאפון"
          sx={styles.textField}
          onChange={(e) => setPhone(e.target.value)}
          fullWidth
        />
        {WorkdaysRow()}
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
