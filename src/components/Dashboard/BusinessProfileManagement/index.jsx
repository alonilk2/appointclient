import { Typography } from "@mui/material";
import { useContext, useState } from "react";
import UserContext from "../UserContext";
import BusinessDetailsCard from "./BusinessDetails/BusinessDetailsCard";
import "./index.css";
import ProfileImageCard from "./ProfileImage/ProfileImageCard";
import ProfileImageUploadDialog from "./ProfileImage/ProfileImageUploadDialog";
import WorkdaysCard from "./Workdays/WorkdaysCard";

export default function BusinessProfileManagement() {
  const [open, setOpen] = useState();
  const user = useContext(UserContext)

  return (
    <div className="business-details-container">
      <ProfileImageUploadDialog open={open} toggle={setOpen} />
      <div className="header-bar">
        <Typography variant="h5">ניהול פרטי העסק</Typography>
      </div>
      <div className="widget-container">
        <div className="formcontainer">
          <BusinessDetailsCard />
        </div>
        <div className="formcontainer">
          <ProfileImageCard openDialog={open} setOpenDialog={setOpen} />
        </div>
        <div className="formcontainer">
          <WorkdaysCard business={user?.business} />
        </div>
      </div>
    </div>
  );
}
