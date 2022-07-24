import {
    Card, CardContent,
    CardHeader,
    Divider
} from "@mui/material";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useContext } from "react";
import UserContext from "../UserContext";
import './index.css'


export default function UpcomingAppointmentsCard (props) {
  const user = useContext(UserContext)
  let appointments = user?.user?.serviceProvider?.appointments;

  return (
    <Card elevation={0} sx={styles.cardContainer}>
      <CardHeader title="התורים הקרובים שלך" />
      <Divider />
      <CardContent>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>שם האורח</TableCell>
            <TableCell>פרטי התקשרות</TableCell>
            <TableCell>שעת התחלה</TableCell>
            <TableCell>שעת סיום</TableCell>
            <TableCell>שירות</TableCell>
            <TableCell>פעולות</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row?.customer?.firstname + " " + row?.customer?.lastname}
              </TableCell>
              <TableCell>
                {`דוא"ל: ` + row?.customer?.email}<br />
                {`טלפון: ` + row?.customer?.phone.replace('+972', '0')}
              </TableCell>
              <TableCell>{row.start_hour.split(' ')[0]}</TableCell>
              <TableCell>{row.end_hour.split(' ')[0]}</TableCell>
              <TableCell>{row.service.name}</TableCell>

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
