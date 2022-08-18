import { Typography } from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import UserContext from "../UserContext";
import BusinessDetailsCard from "./BusinessDetails/BusinessDetailsCard";
import "./index.css";
import ProfileImageCard from "./ProfileImage/ProfileImageCard";
import ProfileImageUploadDialog from "./ProfileImage/ProfileImageUploadDialog";
import WorkdaysCard from "./Workdays/WorkdaysCard";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ShowChartIcon from '@mui/icons-material/ShowChart';
import { _fetchAppointmentsByDay, _fetchAppointmentsByMonth } from "../../../features/appointSlice";
import { _fetchTotalMonthlyIncome } from "../../../features/businessSlice";
import { ColorModeContext } from "..";

export default function BusinessProfileManagement() {
  const [open, setOpen] = useState(false);
  const colorMode = useContext(ColorModeContext)
  const user = useContext(UserContext);
  const dispatch = useDispatch();
  const todaysAppointments = useSelector(state => state.appoint?.totalToday)
  const totalMonthlyAppointments = useSelector(state => state.appoint?.totalMonth)
  const totalMonthlyIncome = useSelector(state => state.business.totalMonthlyIncome)

  useEffect(() => {
    if(user.business){
      dispatch(_fetchAppointmentsByDay(user?.business?.id))
      dispatch(_fetchAppointmentsByMonth(user?.business?.id))
      dispatch(_fetchTotalMonthlyIncome(user?.business?.id))
    }
  }, [user.business])

  return (
    <div className="business-details-container">
      {open && <ProfileImageUploadDialog open={open} toggle={setOpen} />}
      <div className="header-bar" style={colorMode.mode === "dark" ? {backgroundColor: "#121212"} : null}>
        <Typography variant="h5">ניהול פרטי העסק</Typography>
      </div>
      <div className="widget-container">
        <div className="formcontainer data-widget">
          <Typography variant="body1" gutterBottom sx={styles.widgetNumber}>
            {todaysAppointments || 0}
          </Typography>
          <Typography variant="body1" gutterBottom sx={styles.widgetTitle}>
            מספר הביקורים להיום
          </Typography>
          <SupervisedUserCircleIcon sx={styles.userIcon} />
        </div>
        <div className="formcontainer data-widget" style={styles.totalIncomes}>
          <Typography variant="body1" gutterBottom sx={styles.widgetNumber}>
            ₪{totalMonthlyIncome}
          </Typography>
          <Typography variant="body1" gutterBottom sx={styles.totalIncomeTitle}>
            סה"כ הכנסות החודש
          </Typography>
          <MonetizationOnIcon sx={styles.dollarIcon} />
        </div>
        <div
          className="formcontainer data-widget"
          style={styles.totalMonthVisits}
        >
          <Typography variant="body1" gutterBottom sx={styles.widgetNumber}>
            {totalMonthlyAppointments || 0}
          </Typography>
          <Typography variant="body1" gutterBottom sx={styles.totalMonthTitle}>
            סה"כ ביקורים החודש
          </Typography>
          <ShowChartIcon sx={styles.monthIcon} />
        </div>
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

const styles = {
  formcontainer: {
    width: "48%",
    padding: 0,
    height: "80%"
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
