import { Typography } from "@mui/material";
import { useContext, useState } from "react";
import UserContext from "../UserContext";
import UpcomingAppointmentsCard from "./UpcomingAppointmentsCard";
import AddAppointmentDialog from "../AddAppointmentDialog";
import { darkModeBox } from "../Util";
import { ColorModeContext } from "..";
import Calendar from "../shared/Calendar";
import FloatingDialog from "../Appointments/FloatingDialog";

export default function ServiceProviderView({
  toggleAddEvent,
  setToggleAddEvent,
}) {
  const [eventAppointment, setEventAppointment] = useState();
  const user = useContext(UserContext);
  const colorMode = useContext(ColorModeContext);

  const handleClose = () => {
    setToggleAddEvent(false);
  };

  return (
    <div className="business-details-container">
      {eventAppointment && <FloatingDialog appointment={eventAppointment} setEventAppointment={setEventAppointment} />}
      <div
        className="header-bar"
        style={colorMode.mode === "dark" ? darkModeBox : null}
      >
        <Typography variant="h5">ברוך שובך, {user?.user?.firstname}</Typography>
      </div>
      <div className="widget-container">
        <div
          className="formcontainer upcoming"
          style={
            colorMode.mode === "dark"
              ? { ...darkModeBox, ...styles.formcontainer }
              : { ...styles.formcontainer }
          }
        >
          <UpcomingAppointmentsCard />
        </div>
      </div>
      <div className="widget-container">
        <div
          className="formcontainer upcoming"
          style={
            colorMode.mode === "dark"
              ? { ...darkModeBox, ...styles.formcontainer }
              : { ...styles.formcontainer }
          }
        >
      <Calendar setEventAppointment={setEventAppointment} eventAppointment={eventAppointment}/>
        </div>
      </div>
      <AddAppointmentDialog open={toggleAddEvent} onClose={handleClose} />
    </div>
  );
}

const styles = {
  formcontainer: {
    width: "98%",
    padding: 0,
    height: "96%",
  },
  widgetNumber: {
    fontWeight: "500",
    fontSize: "2.3rem",
  },
  widgetTitle: {
    fontWeight: "500",
    fontSize: "1.1rem",
    color: "rgb(128 168 255)",
  },
  userIcon: {
    position: "absolute",
    right: "5%",
    fontSize: "12vw",
    color: "rgb(128 168 255)",
  },
  totalIncomes: {
    backgroundColor: "#22c93e",
  },
  totalIncomeTitle: {
    fontWeight: "500",
    fontSize: "1.1rem",
    color: "rgb(178 255 202)",
  },
  dollarIcon: {
    position: "absolute",
    right: "5%",
    fontSize: "12vw",
    color: "rgb(178 255 202)",
  },
  totalMonthVisits: {
    backgroundColor: "rgb(162 61 213)",
  },
  monthIcon: {
    position: "absolute",
    right: "5%",
    fontSize: "12vw",
    color: "rgb(222 178 255)",
  },
  totalMonthTitle: {
    fontWeight: "500",
    fontSize: "1.1rem",
    color: "rgb(222 178 255)",
  },
};
