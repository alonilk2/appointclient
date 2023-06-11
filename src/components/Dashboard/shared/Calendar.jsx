import FullCalendar from "@fullcalendar/react";
import { Card, CardContent } from "@mui/material";
import UserContext from "../UserContext";
import { useContext, useState } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { ColorModeContext } from "..";
import { darkModeBox, FindProviderWorkday } from "../Util";

export default function Calendar({chosenProvider, setEventAppointment, eventAppointment}) {
  const colorMode = useContext(ColorModeContext);
  const user = useContext(UserContext);
  const provider = chosenProvider || user.user.serviceProvider;

  const handleEventClick = (arg) => {
    setEventAppointment(eventAppointment ? null : arg.event._def.extendedProps.appointment);
  };

  const getEventTitle = (app, startHourArray, endHourArray) => {
    let title =
      startHourArray[0] +
      ":" +
      startHourArray[1] +
      "-" +
      endHourArray[0] +
      ":" +
      endHourArray[1] +
      " ";
    return app.customer
      ? title + app.customer?.firstname + " " + app.customer?.lastname + " "
      : title + app?.title + " " + app?.details + " ";
  };

  return (
    <div
      className="landing-page-main"
      style={
        colorMode.mode === "dark"
          ? { ...darkModeBox, ...styles.main }
          : styles.main
      }
    >
      <Card elevation={0}>
        <CardContent>
          {provider && (
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="timeGridWeek"
              eventClick={handleEventClick}
              navLinks={false}
              events={provider?.appointments?.map((app) => {
                const startHour = `${app.day}T${app.start_hour.substr(0, 8)}`;
                const endHour = `${app.day}T${app.end_hour.substr(0, 8)}`;
                const isoStart = new Date(startHour).toISOString();
                const isoEnd = new Date(endHour).toISOString();

                let startHourArray = app.start_hour.split(" ")[0].split(":");
                let endHourArray = app.end_hour.split(" ")[0].split(":");
                const title = getEventTitle(app, startHourArray, endHourArray);
                return {
                  title: title,
                  date: app.day,
                  appointment: app,
                  start: isoStart,
                  end: isoEnd,
                };
              })}
              dayCellClassNames={(date) =>
                !FindProviderWorkday(provider, date.date.getDay()) &&
                "disabled-date"
              }
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

const styles = {
  cardContainer: {
    border: "1px solid #dae0e7",
    borderRadius: "10px",
  },
  formcontrol: {
    width: "250px",
    margin: "0 2% !important",
  },
  inputcontent: {
    display: "flex",
    flexDirection: "row",
    paddingBottom: "0 !important",
  },
  main: {
    height: "95%",
  },
};
