import Button from "@mui/material/Button";
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
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { _addAppointment } from "../../../../features/appointSlice";

export default function TimeDialog(props) {
  const [workday, setWorkday] = useState("");
  const [day, setDay] = useState();
  const [chosenTime, setChosenTime] = useState(new Date());
  const serviceProvider = props?.serviceProvider;
  const service = props?.service;
  const chosenDate = props?.chosenDate;
  const business = props?.business;
  let providerAppointments = serviceProvider?.appointments;
  // Business open & close times
  const startTime = useRef();
  const endTime = useRef();
  const dispatch = useDispatch();
  const customer = props?.customer;

  const handleChange = (event) => {
    setChosenTime(event.target.value);
  };

  const handleClose = () => {
    props?.setOpen(false);
  };

  const hoursList = () => {
    serviceProvider?.workdays?.forEach((wd) => {
      if (wd.day === chosenDate?.getDay() && wd.starttime != null) {
        startTime.current = parse(wd.starttime, "HH:mm", new Date(chosenDate));
        setWorkday(wd);
        endTime.current = parse(wd.endtime, "HH:mm", new Date(chosenDate));
        return;
      }
    });
  };

  const handleSubmit = () => {
    let end = new Date(chosenDate);
    let [hours, minutes, seconds] = chosenTime.split(" ")[0].split(":");
    end.setHours(parseInt(hours));
    end.setMinutes(parseInt(minutes) + parseInt(service?.duration));

    let appointment = {
      day: chosenDate.getTime(),
      start_hour: chosenTime,
      end_hour: end.toTimeString(),
      customer: customer,
      serviceProvider: serviceProvider,
      service: {
        ...service,
        business: business,
        serviceProviderSet: business?.serviceProviders,
      },
    };
    dispatch(_addAppointment(appointment));
  };

  useEffect(() => {
    hoursList();
  }, [chosenDate]);

  const CalculateMenuItems = () => {
    let timesArray = [];
    let skipFlag = 0;
    timesArray.push(new Date(startTime.current));
    while (true) {
      let lastTimeObj = new Date(timesArray[timesArray.length - 1]);

      // advance next time object by service duration
      // If last iteration was unavailable time - add service.duration (skipFlag + 1) times.
      if (skipFlag > 0) {
        lastTimeObj?.setMinutes(
          lastTimeObj?.getMinutes() + service?.duration * (skipFlag + 1)
        );
      } else
        lastTimeObj?.setMinutes(lastTimeObj?.getMinutes() + service?.duration);

      if (new Date(lastTimeObj) > new Date(endTime.current)) break;

      skipFlag = 0;
      skipFlag = checkTimeAvailability(lastTimeObj, skipFlag);
      if (skipFlag > 0) continue;

      timesArray.push(new Date(lastTimeObj));
    }

    return timesArray.map((t) => {
      return (
        <MenuItem value={new Date(t).toTimeString()}>
          {new Date(t).toTimeString().split(" ")[0]}
        </MenuItem>
      );
    });
  };

  const checkTimeAvailability = (newTimeObj, skipFlag) => {
    providerAppointments.forEach((pa) => {
      let day = parse(pa.day, "yyyy-MM-dd", new Date(chosenDate));
      // If same day & start-time of an appointment - skip adding time to select list
      if (
        day.getDay() === chosenDate.getDay() &&
        new Date(newTimeObj).toTimeString() === pa.start_hour
      ) {
        return skipFlag++;
      }
    });
    return skipFlag;
  };

  return (
    <Dialog open={props?.open} onClose={handleClose}>
      <DialogTitle>בחירת שעה</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ direction: "ltr" }}>
          בחרת בתאריך: <b>{chosenDate?.toDateString()}</b> <br />
          יש לבחור את השעה הנוחה לך לפגישה מהרשימה הבאה:
        </DialogContentText>
        {startTime.current && (
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">שעה</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={chosenTime}
              label="Hour"
              onChange={handleChange}
            >
              {CalculateMenuItems()}
            </Select>
          </FormControl>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>ביטול</Button>
        <Button onClick={handleSubmit}>קביעת תור</Button>
      </DialogActions>
    </Dialog>
  );
}
