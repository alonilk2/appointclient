import { Typography } from "@mui/material";
import { useState } from "react";
import BusinessDetailsCard from "./BusinessDetails/BusinessDetailsCard";
import "./index.css";
import ProfileImageCard from "./ProfileImage/ProfileImageCard";
import ProfileImageUploadDialog from "./ProfileImage/ProfileImageUploadDialog";
import WorkdaysCard from "./Workdays/WorkdaysCard";
import useUser from '../../../hooks/Dashboard/useUser'
import useBusiness from "../../../hooks/useBusiness";
export default function BusinessProfileManagement() {
  const [open, setOpen] = useState();
  const {object: business, update} = useBusiness();

  console.log(business)
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
          <WorkdaysCard business={business} update={update}/>
        </div>
      </div>
    </div>
  );
}

const styles = {
  cardContainer: {
    border: "1px solid #dae0e7",
    borderRadius: "10px",
  },
  AddButton: {
    margin: "auto",
    direction: "ltr",
  },
  submitButton: {
    margin: "1%",
    direction: "ltr",
  },
  addWorkdays: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    padding: "2% 0",
    color: "rgba(0, 0, 0, 0.6)",
  },
};
