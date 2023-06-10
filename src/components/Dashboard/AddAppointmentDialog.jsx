import React, { useContext, useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";
import {
  Alert,
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
import {
  GENERIC_ERROR,
  NO_CHOSEN_TIME,
} from "../../constants/AppointConstants";
import { useDispatch } from "react-redux";
import { _addAppointment } from "../../features/appointSlice";
import { isFulfilled } from "@reduxjs/toolkit";
import { Navigate } from "react-router-dom";
export default function AddAppointmentDialog(props) {
    const { onClose, open } = props;
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [service, setService] = useState();
    const [title, setTitle] = useState();
    const [details, setDetails] = useState();
    const [error, setError] = useState();
    const user = useContext(UserContext);
    const dispatch = useDispatch();

    const handleClose = () => {
      onClose();
    };

    const handleChangeService = e => {
      console.log(e)
      setService(e.target.value);
    };

    const handleSubmit = async () => {
      if (!startDate || !endDate) {
        setError(NO_CHOSEN_TIME);
        return;
      }

      const appointment = {
        day: startDate.$d.getTime(),
        start_hour: startDate.$d.toTimeString(),
        end_hour: endDate.$d.toTimeString(),
        serviceProvider: user?.user?.serviceProvider,
        service,
        title,
        details,
        business: {
          ...user?.user?.business,
          gallery: JSON.stringify(user.user.business.gallery),
        },
      };

      const response = await dispatch(_addAppointment(appointment));

      if (isFulfilled(response)) {
        handleClose();
        Navigate(-1, { replace: true });
      } else {
        setError(GENERIC_ERROR);
      }
    };

    useEffect(() => {
      startDate && console.log(startDate.$d.getHours());
    }, [startDate]);

    return (
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>הוספת אירוע</DialogTitle>
        <DialogContent>
          {error && <Alert variant="error">error</Alert>}
          <TextField
            id="outlined-basic"
            label="שם האורח\אירוע"
            variant="outlined"
            fullWidth
            size="small"
            onChange={(e)=>setTitle(e.target.value)}
          />
          <TextField
            id="outlined-multiline-static"
            label="תיאור"
            multiline
            rows={4}
            fullWidth
            size="small"
            onChange={(e)=>setDetails(e.target.value)}
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
                disablePast
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
                minutesStep={5}
              />
              <DateTimePicker
                label="שעת סיום"
                renderInput={(params) => (
                  <TextField {...params} className="col" size="small" />
                )}
                disablePast
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
                minutesStep={5}
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
              value={service}
              label="שירות"
              onChange={handleChangeService}
              size="small"
            >
              {user?.user?.serviceProvider?.services?.map((service) => {
                return <MenuItem key={service.name} value={service}>{service.name}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            ביטול
          </Button>
          <Button onClick={handleSubmit} variant="contained">
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

