import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import { Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { ColorModeContext } from "..";
import { _getAppsStatistics } from "../../../features/appointSlice";
import UserContext from "../UserContext";
import StatisticsCard from "./Card";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import { darkModeBox } from "../Util";

export default function Statistics() {
  const colorMode = useContext(ColorModeContext);
  const user = useContext(UserContext);
  const dispatch = useDispatch();
  const todaysAppointments = useSelector((state) => state.appoint?.totalToday);
  const totalMonthlyAppointments = useSelector(
    (state) => state.appoint?.totalMonth
  );
  const totalMonthlyIncome = useSelector(
    (state) => state.appoint?.totalMonthlyIncome
  );
  const servicesCount = useSelector((state) => state.appoint?.servicesCount);
  const serviceProvidersCount = useSelector(
    (state) => state.appoint?.serviceProvidersCounts
  );

  useEffect(() => {
    if (user?.business && !todaysAppointments) {
      dispatch(_getAppsStatistics(user?.business?.id));
    }
  }, [user?.business]);

  return (
    <div className="business-details-container">
      <div
        className="header-bar"
        style={colorMode.mode === "dark" ? darkModeBox : null}
      >
        <Typography variant="h5">סטטיסטיקות</Typography>
      </div>
      <div className="widget-container">
        <div
          className="formcontainer data-widget"
          style={
            colorMode.mode === "dark" ? styles.bgBlueDark : styles.totalVisits
          }
        >
          <Typography variant="body1" gutterBottom sx={styles.widgetNumber}>
            {todaysAppointments || 0}
          </Typography>
          <Typography variant="body1" gutterBottom sx={styles.widgetTitle}>
            מספר הביקורים להיום
          </Typography>
          <SupervisedUserCircleIcon sx={styles.userIcon} />
        </div>
        <div
          className="formcontainer data-widget"
          style={
            colorMode.mode === "dark" ? styles.bgGreenDark : styles.totalIncomes
          }
        >
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
          style={
            colorMode.mode === "dark"
              ? styles.bgVioletDark
              : styles.totalMonthVisits
          }
        >
          <Typography variant="body1" gutterBottom sx={styles.widgetNumber}>
            {totalMonthlyAppointments || 0}
          </Typography>
          <Typography variant="body1" gutterBottom sx={styles.totalMonthTitle}>
            סה"כ ביקורים החודש
          </Typography>
          <ShowChartIcon sx={styles.monthIcon} />
        </div>

        <StatisticsCard
          title={`מפגשים החודש לפי שירותים`}
          colorMode={colorMode}
        >
          {servicesCount ? (
            <Chart
              options={{ labels: Object.keys(servicesCount) }}
              series={Object.values(servicesCount)}
              type="pie"
              width="400"
            />
          ) : (
            <div className="missing-stats">
              <QueryStatsIcon sx={styles.statsIcon} />
              <p style={styles.noStats}>אין סטטיסטיקה זמינה</p>
            </div>
          )}
        </StatisticsCard>

        <StatisticsCard
          title={`מפגשים החודש לפי נותני שירות`}
          colorMode={colorMode}
        >
          {serviceProvidersCount ? (
            <Chart
              options={{ labels: Object.keys(serviceProvidersCount) }}
              series={Object.values(serviceProvidersCount)}
              type="donut"
              width="400"
            />
          ) : (
            <div className="missing-stats">
              <QueryStatsIcon sx={styles.statsIcon} />
              <p style={styles.noStats}>אין סטטיסטיקה זמינה</p>
            </div>
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
  noStats: {
    fontSize: "32px",
    fontWeight: "600",
  },
  statsIcon: {
    fontSize: "120px",
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
  bgBlueDark: {
    backgroundColor: "#1655d9",
    borderColor: "rgb(74, 74, 74)",
  },
  bgGreenDark: {
    backgroundColor: "#2e9b41e0",
    borderColor: "rgb(74, 74, 74)",
  },
  bgVioletDark: {
    backgroundColor: "#7b359fcf",
    borderColor: "rgb(74, 74, 74)",
  },
};
