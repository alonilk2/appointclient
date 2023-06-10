import { Typography } from "@mui/material";
import { useContext, useState } from "react";
import UserContext from "../UserContext";
import UpcomingAppointmentsCard from "./UpcomingAppointmentsCard";
import AddAppointmentDialog from "../AddAppointmentDialog";


export default function ServiceProviderView({toggleAddEvent, setToggleAddEvent}) {
  const user = useContext(UserContext);

  const handleClose = () => {
    setToggleAddEvent(false);
  };

  return (
    <div className="business-details-container">
      <div className="header-bar">
        <Typography variant="h5">ברוך שובך, {user?.user?.firstname}</Typography>
      </div>
      <div className="widget-container">
        <div className="formcontainer upcoming" style={styles.formcontainer}>
          <UpcomingAppointmentsCard />
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
    height: "96%"
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
   backgroundColor: "rgb(162 61 213)"
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
    color: 'rgb(222 178 255)'
  }
};
