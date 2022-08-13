import { Card, CardContent, CardHeader, Divider } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useContext, useState } from "react";
import UserContext from "../UserContext";
import "./index.css";
import Chip from "@mui/material/Chip";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { _removeAppointment } from "../../../features/appointSlice";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function UpcomingAppointmentsCard(props) {
  const user = useContext(UserContext);
  const dispatch = useDispatch();
  let appointments = user?.user?.serviceProvider?.appointments;
  const [open, setOpen] = useState(false);

  const handleConfirm = async () => {
    try {
      let response = await dispatch(_removeAppointment(open));
      setOpen(false);
      if (response?.type?.endsWith("fulfilled")) {
        user.refresh();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleCancelAppointment = (appointment) => {
    setOpen(appointment);
  };

  const ConfirmationDialog = (
    <Dialog
      open={open}
      onClose={()=>setOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{direction: 'ltr'}}
    >
      <DialogTitle id="alert-dialog-title">האם לבטל את התור ?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          שים\י לב: זוהי פעולה סופית, לא ניתן להחזיר תור שבוטל.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={()=>setOpen(false)} autoFocus>
          חזרה
        </Button>
        <Button onClick={handleConfirm}>ביטול התור</Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Card elevation={0} sx={styles.cardContainer}>
      {ConfirmationDialog}
      <CardHeader title="התורים הקרובים שלך" />
      <Divider />
      <CardContent>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
            <TableHead>
              <TableRow>
                <TableCell>שם האורח</TableCell>
                <TableCell>פרטי התקשרות</TableCell>
                <TableCell>שעת התחלה</TableCell>
                <TableCell>שעת סיום</TableCell>
                <TableCell>שירות</TableCell>
                <TableCell>ביטול</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row?.customer?.firstname + " " + row?.customer?.lastname}
                  </TableCell>
                  <TableCell>
                    {`דוא"ל: ` + row?.customer?.email}
                    <br />
                    {`טלפון: ` + row?.customer?.phone.replace("+972", "0")}
                  </TableCell>
                  <TableCell>{row.start_hour.split(" ")[0]}</TableCell>
                  <TableCell>{row.end_hour.split(" ")[0]}</TableCell>
                  <TableCell>{row.service.name}</TableCell>
                  <TableCell>
                    <Chip
                      label="ביטול פגישה"
                      onDelete={() => handleCancelAppointment(row.id)}
                      color="error"
                      deleteIcon={<DeleteIcon />}
                      variant="outlined"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
      {/* <CardActions>
        <Button
          variant="contained"
          endIcon={<AddIcon />}
          sx={styles.AddButton}
          onClick={handleUploadImage}
        >
          העלה תמונה
        </Button>
      </CardActions> */}
    </Card>
  );
}

const styles = {
  cardContainer: {
    border: "1px solid #dae0e7",
    borderRadius: "10px",
  },
  AddButton: {
    margin: "auto",
    direction: "ltr",
  },
  submitButton: {
    margin: "1%",
    direction: "ltr",
  },
  addWorkdays: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    padding: "2% 0",
    color: "rgba(0, 0, 0, 0.6)",
  },
};
