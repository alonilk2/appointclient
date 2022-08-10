import {
  Alert,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { getHours, getMinutes } from "date-fns";
import { useState } from "react";
import { daysArray } from "../util";

// eslint-disable-next-line no-extend-native
Date.prototype.addHours = function (h) {
  this.setHours(this.getHours() + h);
  return this;
};

const formatTime = (time) => {
  let hours = getHours(time).toString()
  let minutes = getMinutes(time).toString()
  if(hours.length < 2) hours = "0" + hours
  if(minutes.length < 2) minutes = "0" + minutes
  return hours + ":" + minutes;
};

export default function AddWorkdaysDialog(props) {
  const [workdays, setWorkdays] = useState({
    starttime: new Date(),
    endtime: new Date().addHours(1),
    startTimeFormatted: formatTime(new Date()),
    endTimeFormatted: formatTime(new Date().addHours(1)),
    day: props?.firstDayAvailable,
  });
  const [error, setError] = useState({ field1: null, field2: null });

  const toggleDialog = () => {
    props.toggle(!props.open);
  };

  const daysMenuItemsArray = daysArray.map((day, idx) => {
    let isExist = false;
    props?.workdaysArr?.forEach((e) => {
      if (e.day === idx) {
        isExist = true;
      }
    });
    if (isExist) return null;
    return <MenuItem value={idx}>{day}</MenuItem>;
  });

  const handleChange = (e, field) => {
    field === 0 && setWorkdays({ ...workdays, day: e.target.value });
    if (field === 1) {
      setWorkdays({
        ...workdays,
        startTimeFormatted: formatTime(e),
        starttime: e,
      });
    }
    if (field === 2) {
      setWorkdays({
        ...workdays,
        endTimeFormatted: formatTime(e),
        endtime: e,
      });
    }
    if (e === "Invalid Date") {
      if (field === 1) {
        return setError({ ...error, field1: "Invalid Date" });
      }
      return setError({ ...error, field2: "Invalid Date" });
    }
    if (field === 1) setError({ ...error, field1: null });
    setError({ ...error, field2: null });
  };

  const handleSubmit = () => {
    let arr = props?.workdaysArr;
    props.addWorkdays([...arr, workdays]);
    toggleDialog();
  };

  return (
    <Dialog open={props.open} onClose={toggleDialog} dir="rtl">
      <DialogTitle>הוספת יום ושעות</DialogTitle>
      <DialogContent>
        {error.field1 && <Alert severity="error">Invalid Date</Alert>}
        {error.field2 && <Alert severity="error">Invalid Date</Alert>}

        <DialogContentText>
          בחרו את היום, ולאחר מכן בחרו את שעת ההתחלה והסיום:
        </DialogContentText>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Stack direction="row" spacing={2} sx={styles.stack}>
            <FormControl sx={{ width: 300 }}>
              <InputLabel id="day"> יום </InputLabel>
              <Select
                value={workdays.day}
                labelId="day"
                id="day"
                label="יום"
                onChange={(e) => handleChange(e, 0)}
                sx={styles.space2}
              >
                {daysMenuItemsArray}
              </Select>
            </FormControl>

            <TimePicker
              value={workdays.starttime}
              label="שעת התחלה"
              onChange={(e) => handleChange(e, 1)}
              renderInput={(params) => (
                <TextField sx={styles.space2} {...params} />
              )}
            />
            <TimePicker
              value={workdays.endtime}
              label="שעת סיום"
              onChange={(e) => handleChange(e, 2)}
              minTime={workdays.starttime}
              renderInput={(params) => (
                <TextField sx={styles.space2} {...params} />
              )}
            />
          </Stack>
        </LocalizationProvider>
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={toggleDialog}>
          ביטול
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          הוספה
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const styles = {
  space2: {
    margin: "0 2%",
  },
  stack: {
    padding: "5% 0",
  },
};
