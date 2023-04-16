import React, { useContext, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";
import {
  Button,
  DialogActions,
  DialogContent,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import {
  DatePicker,
  DateTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import UserContext from "./UserContext";

export default function AddAppointmentDialog(props) {
  const { onClose, open } = props;
  const [startHour, setStartHour] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endHour, setEndHour] = useState("");
  const [endDate, setEndDate] = useState("");
  const [service, setService] = useState("");
  const user = useContext(UserContext);

  const handleChange = (event) => {
    setService(event.target.value);
  };

  const handleClose = () => {
    onClose();
  };
  
  const handleSubmit = async () => {
    if (!chosenTime) {
      setError(NO_CHOSEN_TIME);
      return;
    }

    const appointment = {
      day: chosenDate.getTime(),
      start_hour: startHour,
      end_hour: endHour,
      serviceProvider: user?.user?.serviceProvider,
      service,
      business: user?.user?.business
    };

    const response = await dispatch(_addAppointment(appointment));

    if (isFulfilled(response)) {
      handleClose();
      navigate(-1, { replace: true });
    } else {
      setError(GENERIC_ERROR);
    }
  };
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>הוספת אירוע</DialogTitle>
      <DialogContent>
        <TextField
          id="outlined-basic"
          label="כותרת"
          variant="outlined"
          fullWidth
          size="small"
        />
        <TextField
          id="outlined-multiline-static"
          label="תיאור"
          multiline
          rows={4}
          fullWidth
          size="small"
        />
        <FormControlLabel
          control={<Switch defaultChecked />}
          label="כל היום?"
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className="row">
            <DateTimePicker
              label="שעת התחלה"
              renderInput={(params) => (
                <TextField {...params} className="col" size="small" />
              )}
            />
            <DateTimePicker
              label="שעת סיום"
              renderInput={(params) => (
                <TextField {...params} className="col" size="small" />
              )}
            />
          </div>
        </LocalizationProvider>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            שירות (אופציונלי)
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Age"
            onChange={handleChange}
            size="small"
          >
            {user?.user?.serviceProvider?.services?.map((service) => {
              return <MenuItem key={service}>{service.name}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="error">
          ביטול
        </Button>
        <Button onClick={handleClose} variant="contained">
          הוספה
        </Button>
      </DialogActions>
    </Dialog>
  );
}

AddAppointmentDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
