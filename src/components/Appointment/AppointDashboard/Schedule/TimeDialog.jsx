import { Alert } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { parse } from "date-fns";
import { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { _addAppointment } from "../../../../features/appointSlice";
import {
  DIALOG_TITLE,
  SELECTED_DATE_LABEL,
  SELECT_TIME_LABEL,
  SELECT_TIME_INPUT_LABEL,
  CANCEL_BUTTON_LABEL,
  CONFIRM_BUTTON_LABEL,
  NO_CHOSEN_TIME,
  GENERIC_ERROR,
  CONFIRM_DIALOG_TITLE,
  SELECT_TIME_CONFIRM,
} from "../../../../constants/AppointConstants";
import { isFulfilled } from "../../../../common";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";

export default function TimeDialog(props) {
  const [error, setError] = useState();
  const [chosenTime, setChosenTime] = useState();
  const [timesArray, setTimesArray] = useState();
  const [activeStep, setActiveStep] = useState(0);
  const serviceProvider = props?.serviceProvider;
  const service = props?.service;
  const chosenDate = props?.chosenDate;
  const business = props?.business;
  const openingTime = useRef();
  const closingTime = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (value) => {
    console.log("ABC")
    setChosenTime(value);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }
  const handleClose = () => props?.setOpen(false);

  const handleNext = () => {
    if (chosenTime) {
      
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const parseWorkingHoursForChosenDate = () => {
    serviceProvider?.workdays?.forEach((wd) => {
      if (wd.day === chosenDate?.getDay() && wd.starttime != null) {
        openingTime.current = parse(
          wd.starttime,
          "HH:mm",
          new Date(chosenDate)
        );
        closingTime.current = parse(wd.endtime, "HH:mm", new Date(chosenDate));
        return;
      }
    });
  };

  const handleSubmit = async () => {
    if (!chosenTime) {
      setError(NO_CHOSEN_TIME);
      return;
    }

    const appointment = {
      day: chosenDate.getTime(),
      start_hour: chosenTime,
      end_hour: CalculateClosingTime().toTimeString(),
      customer: props?.customer,
      serviceProvider,
      service: {
        ...service,
        business,
        serviceProviderSet: business?.serviceProviders,
      },
      business,
    };

    const response = await dispatch(_addAppointment(appointment));

    if (isFulfilled(response)) {
      handleClose();
      navigate(-1, { replace: true });
    } else {
      setError(GENERIC_ERROR);
    }
  };

  useEffect(() => {
    parseWorkingHoursForChosenDate();
    CalculateMenuItems();
  }, [chosenDate]);

  const CalculateClosingTime = () => {
    let end = new Date(chosenDate);
    let [hours, minutes] = chosenTime.split(" ")[0].split(":");
    end.setHours(parseInt(hours));
    end.setMinutes(parseInt(minutes) + parseInt(service?.duration));
    return end;
  };

  const CalculateMenuItems = () => {
    const times = [new Date(openingTime.current)];
    let skipFlag = 0;

    // Loop through time slots until end time is reached
    while (true) {
      const lastTime = new Date(times[times.length - 1]);

      // Calculate time of next slot, taking into account skipped slots
      const slotDuration =
        service.duration * (skipFlag + 1) || service.duration;
      lastTime.setMinutes(lastTime.getMinutes() + slotDuration);

      // Exit loop if end time has been reached
      if (lastTime > new Date(closingTime.current)) {
        break;
      }

      // Check if current slot is available, skip if necessary
      const lastSkipFlag = skipFlag;
      skipFlag = checkTimeAvailability(lastTime, skipFlag);
      if (skipFlag > lastSkipFlag) {
        continue;
      }

      // Add current slot to array of available times
      skipFlag = 0;
      times.push(new Date(lastTime));
    }

    // Render available times as menu items
    const timesList = times.map((time) => {
      const timeString = new Date(time).toTimeString();
      const timeDisplay = timeString.split(" ")[0].slice(0, 5);

      return (
        <MenuItem key={timeString} value={timeString}>
          {timeDisplay}
        </MenuItem>
      );
    });

    // Set state with available times
    setTimesArray(timesList);
  };

  const checkTimeAvailability = (newTimeObj, skipCount) => {
    const isSameTimeSlot = (appointment) => {
      const appointmentDate = parse(
        appointment.day,
        "yyyy-MM-dd",
        new Date(chosenDate)
      );
      const appointmentTime = appointment.start_hour.slice(0, 5);
      const newTime = newTimeObj.toTimeString().slice(0, 5);
      return (
        chosenDate.toDateString() === appointmentDate.toDateString() &&
        newTime === appointmentTime
      );
    };

    const hasConflict = serviceProvider?.appointments.some(isSameTimeSlot);
    return hasConflict ? skipCount + 1 : skipCount;
  };

  return (
    <Dialog open={props?.open} onClose={handleClose}>
      {error && (
        <Alert severity="error" sx={{ direction: "ltr" }}>
          {error}
        </Alert>
      )}
      <DialogTitle>{DIALOG_TITLE}</DialogTitle>
      <DialogContent>
        <Stepper activeStep={activeStep}>
          <Step key={DIALOG_TITLE}>
            <StepLabel>{DIALOG_TITLE}</StepLabel>
          </Step>
          <Step key={CONFIRM_DIALOG_TITLE}>
            <StepLabel>{CONFIRM_DIALOG_TITLE}</StepLabel>
          </Step>
        </Stepper>

        {activeStep === 0 && (
          <Fragment>
            <DialogContentText sx={{ direction: "ltr" }}>
              {SELECTED_DATE_LABEL} <b>{chosenDate?.toDateString()}</b>
              <br />
              {SELECT_TIME_LABEL}
            </DialogContentText>
            {openingTime.current && (
              <FormControl fullWidth sx={styles.timesArray}>
                {timesArray?.map((time) => {
                  return (
                    <Button key={time.key} color="primary" variant="contained" size={"small"} onClick={(time)=>handleChange(time)}>
                      {time}
                    </Button>
                  );
                })}
              </FormControl>
            )}
          </Fragment>
        )}
        {activeStep === 1 && (
          <Fragment>
            <DialogContentText sx={{ direction: "ltr" }}>
              <br />
              {SELECTED_DATE_LABEL} <b>{chosenDate?.toDateString()}</b>
              <br />
              <b>{SELECT_TIME_CONFIRM}</b>
            </DialogContentText>
          </Fragment>
        )}
      </DialogContent>
      <DialogActions>
        {activeStep === 0 ? (
          <>
            <Button onClick={()=>handleClose()}>{CANCEL_BUTTON_LABEL}</Button>
            <Button onClick={()=>handleNext()}>אישור פרטים</Button>
          </>
        ) : (
          <>
            <Button onClick={()=>handleBack()}>חזרה</Button>
            <Button onClick={()=>handleSubmit()}>{CONFIRM_BUTTON_LABEL}</Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}

const styles = {
  timesArray: { flexDirection: "row", justifyContent: 'center', gap: '0.5em' }
}