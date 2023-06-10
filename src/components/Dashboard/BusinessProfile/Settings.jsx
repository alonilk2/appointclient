import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import { useContext, useEffect, useState } from "react";
import UserContext from "../UserContext";

export default function SettingsCard() {
  const { user, update, refresh } = useContext(UserContext);
  const [range, setRange] = useState();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmitForm = async () => {

    if (user) {
      let tempUser = { ...user, business: {...user.business} };
      tempUser.business.dateRange = range;
      let response = await update(tempUser);
      if (response?.type?.endsWith("fulfilled")) {
        setSuccess(true);
        setError();
        setTimeout(() => {
          setSuccess(false);
        }, 6000);
        refresh();
      }
    }
  };

  return (
    <Card elevation={0} sx={styles.cardContainer}>
      <Snackbar open={success}>
        <Alert severity="success" sx={{ width: "100%" }}>
          This is a success message!
        </Alert>
      </Snackbar>
      <CardHeader title="הגדרות" />
      <Divider />
      <CardContent>
        {error && <Alert severity="error">יש למלא את כל שדות החובה!</Alert>}
        <FormControl >
          <InputLabel id="demo-simple-select-label">לכמה שבועות לפתוח תורים החל מהיום?</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={range}
            label="טווח זמנים לקביעת תורים"
            onChange={(e)=>setRange(e.target.value)}
          >
            <MenuItem value={1}>שבוע מהיום</MenuItem>
            <MenuItem value={2}>שבועיים מהיום</MenuItem>
            <MenuItem value={3}>שלושה שבועות מהיום</MenuItem>
            <MenuItem value={4}>ארבעה שבועות מהיום</MenuItem>
          </Select>
        </FormControl>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          sx={styles.submitButton}
          onClick={handleSubmitForm}
        >
          עדכון פרטים
        </Button>
        {success && (
          <>
            <CheckCircleOutlineIcon
              sx={{ color: "green", marginRight: "5px" }}
            />
            נשמר
          </>
        )}
      </CardActions>
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
};
