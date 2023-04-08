import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import { Card, CardContent, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useEffect } from "react";
import { useContext, useState } from "react";
import { ColorModeContext } from "..";
import UserContext from "../UserContext";
import { darkModeBox, FindProviderWorkday } from "../Util";

export default function AppointmentsManagement(props) {
  const user = useContext(UserContext);
  const colorMode = useContext(ColorModeContext);
  let serviceProviders = user.user.business.serviceProviders;
  const [provider, setProvider] = useState(
    (serviceProviders) => serviceProviders?.length > 0 && serviceProviders[0]
  );

  const handleDateClick = (arg) => {
    if (provider?.workdays && !FindProviderWorkday(provider, arg.date.getDay()))
      return false;
  };

  const handleChange = (provider) => {
    setProvider(provider);
  };

  return (
    <div className="landing-page-container">
      <div
        className="header-bar"
        style={
          colorMode.mode === "dark"
            ? {
                ...darkModeBox,
                display: "flex",
                flexDirection: "row",
              }
            : null
        }
      >
        <Typography variant="h5">ניהול תורים</Typography>
      </div>
      <div className="first-row">
        <div
          className="landing-page-main"
          style={colorMode.mode === "dark" ? darkModeBox : null}
        >
          <Card elevation={0}>
            <CardContent sx={styles.inputcontent}>
              <Typography variant="subtitle1" sx={{ margin: "1% 0" }}>
                בחר נותן שירות:
              </Typography>
              <FormControl sx={styles.formcontrol}>
                <InputLabel id="demo-simple-select-label">
                  נותן שירות
                </InputLabel>
                <Select
                  id="demo-simple-select"
                  labelId="demo-simple-select-label"
                  value={provider}
                  onChange={(e) => handleChange(e.target.value)}
                  label="נותן שירות"
                >
                  {serviceProviders?.map((provider) => {
                    return (
                      <MenuItem value={provider}>
                        {provider.firstname + " " + provider.lastname}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="first-row" style={{ height: "100%" }}>
        <div
          className="landing-page-main"
          style={
            colorMode.mode === "dark"
              ? { ...darkModeBox, ...styles.main }
              : styles.main
          }
        >
          <Card elevation={0}>
            <CardContent sx={{ height: "100%" }}>
              {provider && (
                <FullCalendar
                  plugins={[dayGridPlugin, interactionPlugin]}
                  height="100%"
                  initialView="dayGridMonth"
                  dateClick={handleDateClick}
                  events={provider?.appointments?.map((app) => {
                    let startHourArray = app.start_hour
                      .split(" ")[0]
                      .split(":");
                    let endHourArray = app.end_hour.split(" ")[0].split(":");
                    return {
                      title:
                        startHourArray[0] +
                        ":" +
                        startHourArray[1] +
                        "-" +
                        endHourArray[0] +
                        ":" +
                        endHourArray[1] +
                        " " +
                        app.customer.firstname +
                        " " +
                        app.customer.lastname +
                        " ",
                      date: app.day,
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
      </div>
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
