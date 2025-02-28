import { Card, CardContent, CardHeader, Divider } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useContext, useEffect, useMemo, useState } from "react";
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
import { ColorModeContext } from "..";

export default function UpcomingAppointmentsCard() {
  const [open, setOpen] = useState(false);
  const user = useContext(UserContext);
  const colorMode = useContext(ColorModeContext)

  const dispatch = useDispatch();
  let appointments = useMemo(
    () => [...user?.user?.serviceProvider?.appointments],
    [user]
  );

  const handleConfirm = async () => {
    let response = await dispatch(_removeAppointment(open));
    setOpen(false);
    if (response?.type?.endsWith("fulfilled")) {
      user.refresh();
    }
  };

  const handleCancelAppointment = (appointment) => {
    setOpen(appointment);
  };

  useEffect(() => {
    const sortAppointmentsByDayAndStartTime = () => {
      appointments.sort((a, b) => {
        return (
          a.day.localeCompare(b.day) && a.start_hour.localeCompare(b.start_hour)
        );
      });
    };

    if (appointments?.length > 0) {
      sortAppointmentsByDayAndStartTime();
    }
  }, [appointments]);

  const ConfirmationDialog = (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{ direction: "ltr" }}
    >
      <DialogTitle id="alert-dialog-title">האם לבטל את התור ?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          שים\י לב: זוהי פעולה סופית, לא ניתן להחזיר תור שבוטל.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)} autoFocus>
          חזרה
        </Button>
        <Button onClick={handleConfirm}>ביטול התור</Button>
      </DialogActions>
    </Dialog>
  );

  const appointmentsList = (
    <TableBody>
      {appointments
        .sort((a, b) => {
          return a.day === b.day
            ? a.start_hour.localeCompare(b.start_hour)
            : new Date(a.day) - new Date(b.day);
        })
        .map((row) => (
          <TableRow
            key={row.name}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {row?.customer
                ? row?.customer?.firstname + " " + row?.customer?.lastname
                : row?.title}
            </TableCell>
            <TableCell>
              {!row?.customer
                ? row?.details
                : [
                    `דוא"ל: ` + row?.customer?.email,
                    <br />,
                    `טלפון: ` + row?.customer?.phone.replace("+972", "0"),
                  ]}
            </TableCell>
            <TableCell>{row.day}</TableCell>
            <TableCell>{row.start_hour.split(" ")[0]}</TableCell>
            <TableCell>{row.end_hour.split(" ")[0]}</TableCell>
            <TableCell>{row?.service?.name}</TableCell>
            <TableCell>
              <Chip
                label="ביטול פגישה"
                onDelete={() => handleCancelAppointment(row.id)}
                onClick={() => handleCancelAppointment(row.id)}
                color="error"
                deleteIcon={<DeleteIcon />}
                variant="outlined"
              />
            </TableCell>
          </TableRow>
        ))}
    </TableBody>
  );
  return (
    <Card elevation={0} sx={styles.cardContainer}>
      {ConfirmationDialog}
      <CardHeader title="התורים הקרובים שלך" />
      <Divider />
      <CardContent sx={styles.cardContent}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
            <TableHead>
              <TableRow>
                <TableCell>שם האורח\אירוע</TableCell>
                <TableCell>פרטי התקשרות\תיאור אירוע</TableCell>
                <TableCell>תאריך</TableCell>
                <TableCell>שעת התחלה</TableCell>
                <TableCell>שעת סיום</TableCell>
                <TableCell>שירות</TableCell>
                <TableCell>ביטול</TableCell>
              </TableRow>
            </TableHead>
            {appointmentsList}
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
  cardContent: {
    padding: "0",
  },
};
