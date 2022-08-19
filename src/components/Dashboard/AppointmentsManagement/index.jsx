import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import { Card, CardContent, Divider, Typography } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useContext, useState } from "react";
import { ColorModeContext } from "..";
import UserContext from "../UserContext";
import { FindProviderWorkday } from "../util";
export default function AppointmentsManagement(props) {
  const [toggleDialog, setToggleDialog] = useState(false);
  const user = useContext(UserContext);
  const [chosenDate, setChosenDate] = useState();
  const [open, setOpen] = useState(false);
  const [provider, setProvider] = useState(
    user.user.business.serviceProviders[0]
  );
  const colorMode = useContext(ColorModeContext);

  let serviceProviders = user.user.business.serviceProviders;

  const handleDateClick = (arg) => {
    if (provider?.workdays && !FindProviderWorkday(provider, arg.date.getDay()))
      return false;
    setOpen(true);
    setChosenDate(arg.date);
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
                backgroundColor: "#121212",
                display: "flex",
                flexDirection: "row",
              }
            : null
        }
      >
        <Typography variant="h5">ניהול תורים</Typography>
      </div>
      <div className="first-row">
        <div className="landing-page-main">
          <Card elevation={0} sx={styles.cardContainer}>
            <CardContent sx={styles.inputcontent}>
              <Typography variant="subtitle1" sx={{margin: '1% 0'}}>בחר נותן שירות:</Typography>
              <FormControl sx={{ width: "250px", margin: "0 2% !important" }}>
                <InputLabel id="demo-simple-select-label">נותן שירות</InputLabel>
                <Select
                  id="demo-simple-select"
                  labelId="demo-simple-select-label"
                  value={provider}
                  onChange={(e) => handleChange(e.target.value)}
                  label="נותן שירות"
                >
                  {serviceProviders.map((provider) => {
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
        <div className="landing-page-main">
          <Card elevation={0} sx={styles.cardContainer}>
            <CardContent sx={{ height: "100%" }}>
              {provider && (
                <FullCalendar
                  plugins={[dayGridPlugin, interactionPlugin]}
                  height="100%"
                  initialView="dayGridMonth"
                  dateClick={handleDateClick}
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
  AddButton: { direction: "ltr", backgroundColor: "#0369ff" },
  DeleteIcon: { marginLeft: "20%", color: "red" },
  EditIcon: { marginRight: "20%" },
  Box: {
    height: "100%",
    width: "100%",
    marginLeft: "2%",
    backgroundColor: "white",
  },
  CardHeader: { textAlign: "right" },
  UserProfileCell: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  cardContainer: {
    border: "1px solid #dae0e7",
    borderRadius: "10px",
  },
  formcontrol: {
    width: "250px",
    position: "absolute",
    right: 0,
    top: 0,
    margin: "2px !important",
  },
  inputcontent: {
    display: "flex",
    flexDirection: "row",
  },
};
