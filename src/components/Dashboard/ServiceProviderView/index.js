import { Typography } from "@mui/material";
import { useContext, useState } from "react";
import UserContext from "../UserContext";
import UpcomingAppointmentsCard from "./UpcomingAppointmentsCard";

export default function ServiceProviderView() {
  const user = useContext(UserContext)

  return (
    <div className="business-details-container">
      <div className="header-bar">
        <Typography variant="h5">ברוך שובך, {user?.user?.firstname}</Typography>
      </div>
      <div className="widget-container">
        <div className="formcontainer">
          <UpcomingAppointmentsCard />
        </div>
      </div>
    </div>
  );
}
