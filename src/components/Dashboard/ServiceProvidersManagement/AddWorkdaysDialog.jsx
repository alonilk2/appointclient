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
import { useState } from "react";
import {
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useEffect } from "react";

const days = [
  "יום ראשון",
  "יום שני",
  "יום שלישי",
  "יום רביעי",
  "יום חמישי",
  "יום שישי",
  "יום שבת",
];

export default function AddWorkdaysDialog(props) {
  const [workdays, setWorkdays] = useState({
    startTime: 0,
    endTime: 0,
    day: 0,
  });

  const toggleDialog = () => {
    props.toggle(!props.open);
  };

  const daysArr = days.map((day, idx) => {
    return <MenuItem value={idx}>{day}</MenuItem>;
  });

  const handleChange = (e, field) => {
    field == 0 && setWorkdays({ ...workdays, day: e.target.value });
    field == 1 && setWorkdays({ ...workdays, startTime: e});
    field == 2 && setWorkdays({ ...workdays, endTime: e});
  };

  const handleSubmit = () => {
    let arr = props?.workdaysArr;
    props.addWorkdays([...arr, workdays]);
    toggleDialog();
  };

  useEffect(()=>{
    console.log(workdays)
  }, [workdays])

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
