import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState, useRef } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { compareAsc, format, parse } from "date-fns";
import { useDispatch } from "react-redux";
import {
  _addAppoint,
  _addAppointment,
} from "../../../../features/appointSlice";
import useCustomer from "../../../../hooks/useCustomer";

export default function TimeDialog(props) {
  const [workday, setWorkday] = useState("");
  const [day, setDay] = useState();
  const [chosenTime, setChosenTime] = useState(new Date());
  const serviceProvider = props?.serviceProvider;
  const service = props?.service;
  const chosenDate = props?.chosenDate;
  const business = props?.business;
  // Business open & close times
  const startTime = useRef();
  const endTime = useRef();
  const dispatch = useDispatch();
  const customer = useCustomer();

  const handleChange = (event) => {
    setChosenTime(event.target.value);
  };

  const handleClose = () => {
    props?.setOpen(false);
  };

  const hoursList = () => {
    serviceProvider?.workdays?.forEach((wd) => {
      if (wd.day === chosenDate?.getDay() && wd.starttime != null) {
        setWorkday(wd);
        startTime.current = parse(wd.starttime, "HH:mm", new Date(chosenDate));
        endTime.current = parse(wd.endtime, "HH:mm", new Date(chosenDate));
        return;
      }
    });
  };

  const handleSubmit = () => {
    let end = new Date();
    let [hours, minutes, seconds] = chosenTime.split(" ")[0].split(":");
    end.setHours(+hours);
    end.setMinutes(minutes + service?.duration);
    end.setSeconds(seconds);

    let appointment = {
      day: chosenDate.getTime(),
      start_hour: chosenTime,
      end_hour: end.toTimeString(),
      customer: customer?.customer,
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

  const MenuItems = () => {
    let timesArray = [];
    timesArray.push(new Date(startTime.current));
    while (
      timesArray.length > 0 &&
      new Date(endTime.current).getTime() !==
        new Date(timesArray[timesArray.length - 1]).getTime()
    ) {
      let timeObj = new Date(timesArray[timesArray.length - 1]);
      timesArray.push(
        new Date(timeObj?.setMinutes(timeObj?.getMinutes() + 30))
      );
    }

    return timesArray.map((t, idx) => {
      return (
        <MenuItem value={new Date(t).toTimeString()}>
          {new Date(t).toTimeString().split(" ")[0]}
        </MenuItem>
      );
    });
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
              {MenuItems()}
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
