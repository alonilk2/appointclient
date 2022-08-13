import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import { Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ColorModeContext } from "..";
import {
  _fetchAppointmentsByDay,
  _fetchAppointmentsByMonth,
  _fetchAppointmentsByServiceProviders,
  _fetchAppointmentsByServices,
} from "../../../features/appointSlice";
import { _fetchTotalMonthlyIncome } from "../../../features/businessSlice";
import UserContext from "../UserContext";
import Chart from "react-apexcharts";
import StatisticsCard from "./Card";

export default function Statistics() {
  const colorMode = useContext(ColorModeContext);
  const user = useContext(UserContext);
  const dispatch = useDispatch();
  const todaysAppointments = useSelector((state) => state.appoint?.totalToday);
  const totalMonthlyAppointments = useSelector(
    (state) => state.appoint?.totalMonth
  );
  const totalMonthlyIncome = useSelector(
    (state) => state.business.totalMonthlyIncome
  );
  const servicesCount = useSelector((state) => state.appoint?.servicesCount);
  const serviceProvidersCount = useSelector((state) => state.appoint?.serviceProvidersCounts);

  useEffect(() => {
    if (user) {
      dispatch(_fetchAppointmentsByDay(user?.business?.id));
      dispatch(_fetchAppointmentsByMonth(user?.business?.id));
      dispatch(_fetchTotalMonthlyIncome(user?.business?.id));
      dispatch(_fetchAppointmentsByServices(user?.business?.id));
      dispatch(_fetchAppointmentsByServiceProviders(user?.business?.id));
    }
  }, [user]);

  console.log(servicesCount && Object.values(servicesCount));
  return (
    <div className="business-details-container">
      <div
        className="header-bar"
        style={
          colorMode.mode === "dark" ? { backgroundColor: "#121212" } : null
        }
      >
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

        <StatisticsCard title={`סה"כ מפגשים החודש לפי שירותים`}>
          {servicesCount && (
            <Chart
              options={{ labels: Object.keys(servicesCount) }}
              series={Object.values(servicesCount)}
              type="pie"
              width="400"
            />
          )}
        </StatisticsCard>

        <StatisticsCard title={`סה"כ מפגשים החודש לפי נותני שירות`}>
          {serviceProvidersCount && (
            <Chart
              options={{ labels: Object.keys(serviceProvidersCount) }}
              series={Object.values(serviceProvidersCount)}
              type="donut"
              width="400"
            />
          )}
        </StatisticsCard>

      </div>
    </div>
  );
}

const styles = {
  formcontainer: {
    width: "48%",
    padding: 0,
    height: "80%",
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
