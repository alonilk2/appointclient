import { Avatar } from "@mui/material";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumb from "../../../Breadcrumb";
import TimeDialog from "./TimeDialog";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { FindProviderWorkday } from "../../../Dashboard/Util";

export default function Schedule() {
  const [chosenDate, setChosenDate] = useState();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  let provider = location?.state?.provider;
  let business = location?.state?.business;
  let clickedService = location?.state?.clickedService;
  let customer = location?.state?.customer;
  
  const handleDateClick = (arg) => {
    if (provider?.workdays && !FindProviderWorkday(provider, arg.date.getDay()))
      return false;
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
          src={provider?.filename}
        ></Avatar>
        <div className="right-column">
          <h5>בחרת לקבוע תור ל{business?.services[clickedService]?.name}</h5>
          <h5>אצל {provider?.firstname + " " + provider?.lastname}</h5>
          <h1>לחץ\י על היום הרצוי בלוח השנה:</h1>
        </div>
        {open && (
          <TimeDialog
            open={open}
            setOpen={setOpen}
            chosenDate={chosenDate}
            service={business?.services[clickedService]}
            serviceProvider={provider}
            business={business}
            customer={customer}
          />
        )}
        <div className="calendar">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            height="100%"
            initialView="dayGridMonth"
            dateClick={handleDateClick}
            dayCellClassNames={(date) =>
              !FindProviderWorkday(provider, date.date.getDay()) && "disabled-date"
            }
          />
        </div>
      </div>
    </div>
  );
}
