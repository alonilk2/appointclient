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
    let table = (
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="right">יום</TableCell>
            <TableCell align="right">שעת התחלה</TableCell>
            <TableCell align="right">שעת סיום</TableCell>
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
