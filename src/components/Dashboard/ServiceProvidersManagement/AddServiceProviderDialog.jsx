import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useDropzone } from "react-dropzone";
import { useCallback } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  _addServiceProvider,
  _fetchServiceProviders,
} from "../../../features/dashboardSlice";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { Divider, Stack } from "@mui/material";
import AddWorkdaysDialog from "./AddWorkdaysDialog";
import {
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

function createData(day, startTime, endTime) {
  return { day, startTime, endTime };
}

export default function AddServiceProviderDialog(props) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [workdaysDialog, setWorkdaysDialog] = useState(false);
  const [workdaysArr, setWorkdaysArr] = useState([]);
  const dispatch = useDispatch();

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
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
  const handleAdd = async () => {
    let newProvider = {
      firstname: firstname,
      lastname: lastname,
      phone: phone,
      email: email,
    };
    let response = await props?.add(newProvider);
    if (response?.type == "dashboard/addServiceProvider/fulfilled") {
      toggleDialog();
      dispatch(_fetchServiceProviders());
    }
  };
  const Dropzone = (
    <div className="dropzone-container" {...getRootProps()}>
      <input {...getInputProps()} />
      <p>גרור ושחרר קובץ, או לחץ לבחירה</p>
      <CloudUploadIcon sx={styles.CloudUploadIcon} />
    </div>
  );
  const WorkdaysRow = () => {
    const table = (
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>יום</TableCell>
            <TableCell align="right">שעת התחלה</TableCell>
            <TableCell align="right">שעת סיום</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {workdaysArr.map((row) => {
            console.log(row)(
              <TableRow
                key={row.day}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.day}
                </TableCell>
                <TableCell align="right">{row?.startTime}</TableCell>
                <TableCell align="right">{row?.endTime}</TableCell>
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
        <Stack direction="column" sx={styles.addWorkdays}>
          <Fab color="primary" aria-label="add" onClick={handleAddWorkdays}>
            <AddIcon />
          </Fab>
          <p>הוספת ימי ושעות עבודה</p>
        </Stack>
      </>
    );
  };
  return (
    <Dialog open={props.open} sx={styles.dialogContainer}>
      <AddWorkdaysDialog
        open={workdaysDialog}
        toggle={setWorkdaysDialog}
        addWorkdays={setWorkdaysArr}
        workdaysArr={workdaysArr}
      />
      <DialogTitle>הוסף נותן שירות</DialogTitle>
      <DialogContent>
        <TextField
          required
          id="outlined-required"
          variant="filled"
          label="שם פרטי"
          sx={styles.textField}
          onChange={(e) => setFirstname(e.target.value)}
          fullWidth
        />
        <TextField
          required
          id="outlined-required"
          variant="filled"
          label="שם משפחה"
          sx={styles.textField}
          onChange={(e) => setLastname(e.target.value)}
          fullWidth
        />
        <TextField
          required
          id="outlined-required"
          variant="filled"
          label='דוא"ל'
          sx={styles.textField}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        <TextField
          required
          id="outlined-required"
          variant="filled"
          label="מספר טלאפון"
          sx={styles.textField}
          onChange={(e) => setPhone(e.target.value)}
          fullWidth
        />
        {WorkdaysRow()}
        {Dropzone}
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
