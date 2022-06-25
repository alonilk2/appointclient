import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack
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
import { useRef, useState } from "react";

const days = [
  "יום ראשון",
  "יום שני",
  "יום שלישי",
  "יום רביעי",
  "יום חמישי",
  "יום שישי",
  "יום שבת",
];

const formatTime = (time) => {
  return getHours(time).toString() + ":" + getMinutes(time).toString();
};

export default function AddWorkdaysDialog(props) {
  const [workdays, setWorkdays] = useState({
    startTime: new Date(),
    endTime: new Date(),
    startTimeFormatted: formatTime(new Date()),
    endTimeFormatted: formatTime(new Date()),
    day: '',
  });
  const day = useRef(0)

  const toggleDialog = () => {
    props.toggle(!props.open);
  };

  const daysArr = days.map((day, idx) => {
    let isExist = false;
    props?.workdaysArr.forEach((e) => {
      if (e.day == idx) {
        isExist = true;
      }
    });
    return isExist ? null : <MenuItem value={idx}>{day}</MenuItem>;
  });

  const handleChange = (e, field) => {
    console.log(e);
    field == 0 && setWorkdays({ ...workdays, day: e.target.value });
    field == 1 &&
      setWorkdays({
        ...workdays,
        startTimeFormatted: formatTime(e),
        startTime: e,
      });
    field == 2 &&
      setWorkdays({
        ...workdays,
        endTimeFormatted: formatTime(e),
        endTime: e,
      });
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
                {daysArr}
              </Select>
            </FormControl>

            <TimePicker
              value={workdays.startTime}
              label="שעת התחלה"
              onChange={(e) => handleChange(e, 1)}
              renderInput={(params) => (
                <TextField sx={styles.space2} {...params} />
              )}
            />
            <TimePicker
              value={workdays.endTime}
              label="שעת סיום"
              onChange={(e) => handleChange(e, 2)}
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
