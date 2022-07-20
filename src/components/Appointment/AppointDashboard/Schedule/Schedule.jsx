import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import { useLocation } from "react-router-dom";
import { Avatar } from "@mui/material";
import { API_UPLOADS_URL } from "../../../../constants";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TimeDialog from "./TimeDialog";
import interactionPlugin from "@fullcalendar/interaction";
import Breadcrumb from "../../../Breadcrumb";

export default function Schedule() {
  const location = useLocation();
  let provider = location?.state?.provider;
  let business = location?.state?.business;
  let clickedService = location?.state?.clickedService;
  let customer = location?.state?.customer;
  const [chosenDate, setChosenDate] = useState();
  const [open, setOpen] = useState(false);

  const handleDateClick = (arg) => {
    setOpen(true);
    setChosenDate(arg.date);
  };

  return (
    <div className="appoint-dashboard-container">
      <div className="form-container schedule-container">
        <Breadcrumb
          pageArr={[
            {
              name: business?.name + " - עמוד העסק",
              url: "/appoint/" + business?.id,
            },
            {
              name: "לובי זימון תורים",
              url: "/appoint/" + business?.id + "/dashboard",
            },
            { name: "בחירת תאריך" },
          ]}
          sx={{ position: "absolute", top: "3%", left: "3%" }}
        />
        <Avatar
          alt=""
          sx={{ width: 80, height: 80 }}
          src={API_UPLOADS_URL + provider?.filename}
        ></Avatar>
        <div className="right-column">
          <h5>בחרת לקבוע תור ל{business?.services[clickedService]?.name}</h5>
          <h5>אצל {provider?.firstname + " " + provider?.lastname}</h5>
          <h1>לחץ\י על היום הרצוי בלוח השנה:</h1>
        </div>
        <TimeDialog
          open={open}
          setOpen={setOpen}
          chosenDate={chosenDate}
          service={business?.services[clickedService]}
          serviceProvider={provider}
          business={business}
          customer={customer}
        />
        <div className="calendar">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            height="100%"
            initialView="dayGridMonth"
            dateClick={handleDateClick}
          />
        </div>
      </div>
    </div>
  );
}
