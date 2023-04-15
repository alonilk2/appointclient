import { Avatar } from "@mui/material";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumb from "../../../Breadcrumb";
import TimeDialog from "./TimeDialog";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { FindProviderWorkday } from "../../../Dashboard/Util";
import {
  BUSINESS_PAGE_TEXT,
  LOBBY_TITLE,
  DATE_PICKER_TITLE,
  APPOINTMENT_SELECTION_TITLE,
  CALENDAR_INSTRUCTIONS,
  DISABLED_DATE_CLASS,
} from "../../../../constants/AppointConstants";

export default function Schedule() {
  const [chosenDate, setChosenDate] = useState();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const today = new Date();
  const provider = location?.state?.provider;
  const business = location?.state?.business;
  const clickedService = location?.state?.clickedService;
  const customer = location?.state?.customer;
  const weeksRange = business?.dateRange * 7;

  const handleDateClick = (arg) => {
    if (provider?.workdays && !FindProviderWorkday(provider, arg.date.getDay()))
      return false;
    setOpen(true);
    setChosenDate(arg.date);
  };

  const getRangeEndDate = (today) => {
    return new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + weeksRange
    );
  };

  return (
    <div className="appoint-dashboard-container">
      <div className="form-container schedule-container">
        <Breadcrumb
          pageArr={[
            {
              name: business?.name + BUSINESS_PAGE_TEXT,
              url: "/appoint/" + business?.id,
            },
            {
              name: LOBBY_TITLE,
              url: "/appoint/" + business?.id + "/dashboard",
            },
            { name: DATE_PICKER_TITLE },
          ]}
          sx={{ position: "absolute", top: "3%", left: "3%" }}
        />
        <Avatar
          alt=""
          sx={{ width: 80, height: 80 }}
          src={provider?.filename}
        ></Avatar>
        <div className="right-column">
          <h5>
            {APPOINTMENT_SELECTION_TITLE}
            {business?.services[clickedService]?.name}
          </h5>
          <h5>אצל {provider?.firstname + " " + provider?.lastname}</h5>
          <h1>{CALENDAR_INSTRUCTIONS}</h1>
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
              !FindProviderWorkday(provider, date.date.getDay()) &&
              DISABLED_DATE_CLASS
            }
            validRange={{
              start: today,
              end: getRangeEndDate(today),
            }}
          />
        </div>
      </div>
    </div>
  );
}
