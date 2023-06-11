import { Card, CardContent, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useContext, useState } from "react";
import { ColorModeContext } from "..";
import UserContext from "../UserContext";
import { darkModeBox } from "../Util";
import "./index.scss";
import FloatingDialog from "./FloatingDialog";
import Calendar from "../shared/Calendar";

export default function AppointmentsManagement() {
  const user = useContext(UserContext);
  const colorMode = useContext(ColorModeContext);
  const serviceProviders = user.user.business.serviceProviders;
  const [provider, setProvider] = useState(serviceProviders[0]);
  const [eventAppointment, setEventAppointment] = useState(false);

  const handleChange = (provider) => {
    setProvider(provider);
  };

  return (
    <div className="landing-page-container">
      {eventAppointment && (
        <FloatingDialog
          appointment={eventAppointment}
          setEventAppointment={setEventAppointment}
        />
      )}
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
                      <MenuItem value={provider} key={provider?.lastname}>
                        {provider?.firstname + " " + provider?.lastname}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </CardContent>
          </Card>
        </div>
      </div>
      <Calendar
        chosenProvider={provider}
        setEventAppointment={setEventAppointment}
      />
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
