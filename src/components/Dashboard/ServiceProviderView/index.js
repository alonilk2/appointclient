import { Typography } from "@mui/material";
import { useContext, useState } from "react";
import UserContext from "../UserContext";
import UpcomingAppointmentsCard from "./UpcomingAppointmentsCard";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ShowChartIcon from '@mui/icons-material/ShowChart';

export default function ServiceProviderView() {
  const user = useContext(UserContext);
  // const todaysAppointments = useSelector(state => state.appoint?.appoint)
  // const totalMonthlyIncome = useSelector(state => state.business.totalMonthlyIncome)
  // // let appointmentsToday = user?.business?.serviceProviders?.
  // useEffect(() => {
  //   if(user){
  //     dispatch(_fetchAppointmentsByDay(user?.user?.id))
  //     dispatch(_fetchTotalMonthlyIncome(user?.user?.id))
  //   }
  // }, [user])
  return (
    <div className="business-details-container">
      <div className="header-bar">
        <Typography variant="h5">ברוך שובך, {user?.user?.firstname}</Typography>
      </div>
      <div className="widget-container">
        <div className="formcontainer data-widget">
          <Typography variant="body1" gutterBottom sx={styles.widgetNumber}>
            28
          </Typography>
          <Typography variant="body1" gutterBottom sx={styles.widgetTitle}>
            מספר הביקורים להיום
          </Typography>
          <SupervisedUserCircleIcon sx={styles.userIcon} />
        </div>
        <div className="formcontainer data-widget" style={styles.totalIncomes}>
          <Typography variant="body1" gutterBottom sx={styles.widgetNumber}>
            ₪30,285
          </Typography>
          <Typography variant="body1" gutterBottom sx={styles.totalIncomeTitle}>
            סה"כ הכנסות החודש
          </Typography>
          <MonetizationOnIcon sx={styles.dollarIcon} />
        </div>
        <div className="formcontainer data-widget" style={styles.totalMonthVisits}>
          <Typography variant="body1" gutterBottom sx={styles.widgetNumber}>
            132
          </Typography>
          <Typography variant="body1" gutterBottom sx={styles.totalMonthTitle}>
            סה"כ ביקורים החודש
          </Typography>
          <ShowChartIcon sx={styles.monthIcon} />
        </div>
        <div className="formcontainer upcoming" style={styles.formcontainer}>
          <UpcomingAppointmentsCard />
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
