import PeopleIcon from "@mui/icons-material/Groups";
import HomeIcon from "@mui/icons-material/Home";
import ListIcon from "@mui/icons-material/List";
import SettingsIcon from "@mui/icons-material/Settings";
import { Divider } from "@mui/material";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FRONT_BASE_URL } from "../../../constants";
import { selectTab } from "../../../features/dashboardSlice";
import NoImage from "../../../images/noimage.png";
import UserContext from "../UserContext";
import BarChartIcon from "@mui/icons-material/BarChart";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import {
  BUSINESS_PROFILE_TAB,
  LANDING_PAGE_TAB,
  APPOINTMENTS_TAB,
  SERVICES_TAB,
  SERVICE_PROVIDERS_TAB,
  STATISTICS_TAB,
  ADD_APPOINTMENT_TAB
} from "../../../constants";

export default function SideMenu() {
  const dispatch = useDispatch();
  const selectedTab = useSelector((state) => state.dashboard.selectedTabIndex);
  const user = useContext(UserContext);

  const handleListItemClick = (_event, index) => {
    dispatch(selectTab(index));
  };

  const serviceProviderMenu = (
    <>
      <ListSubheader component="div" id="nested-list-subheader">
        הוספת אירוע
      </ListSubheader>
      <ListItemButton
        selected={selectedTab === ADD_APPOINTMENT_TAB}
        onClick={(event) => handleListItemClick(event, ADD_APPOINTMENT_TAB)}
      >
        <ListItemIcon>
          <MoreTimeIcon />
        </ListItemIcon>
        <ListItemText primary="הוספת אירוע" />
      </ListItemButton>
    </>
  );

  const adminMenu = (
    <>
      <ListSubheader component="div" id="nested-list-subheader">
        פרופיל העסק
      </ListSubheader>
      <ListItemButton
        selected={selectedTab === BUSINESS_PROFILE_TAB}
        onClick={(event) => handleListItemClick(event, BUSINESS_PROFILE_TAB)}
      >
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="ניהול העסק" />
      </ListItemButton>
      <ListItemButton
        selected={selectedTab === LANDING_PAGE_TAB}
        onClick={(event) => handleListItemClick(event, LANDING_PAGE_TAB)}
      >
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="ניהול דף נחיתה" />
      </ListItemButton>
    
      <ListSubheader component="div" id="nested-list-subheader">
        תורים
      </ListSubheader>
      <ListItemButton
        selected={selectedTab === APPOINTMENTS_TAB}
        onClick={(event) => handleListItemClick(event, APPOINTMENTS_TAB)}
      >
        <ListItemIcon>
          <CalendarMonthIcon />
        </ListItemIcon>
        <ListItemText primary="ניהול תורים" />
      </ListItemButton>
    
      <ListSubheader component="div" id="nested-list-subheader">
        שירותים ומוצרים
      </ListSubheader>
      <ListItemButton
        selected={selectedTab === SERVICES_TAB}
        onClick={(event) => handleListItemClick(event, SERVICES_TAB)}
      >
        <ListItemIcon>
          <ListIcon />
        </ListItemIcon>
        <ListItemText primary="ניהול שירותים" />
      </ListItemButton>
      <ListItemButton
        selected={selectedTab === SERVICE_PROVIDERS_TAB}
        onClick={(event) => handleListItemClick(event, SERVICE_PROVIDERS_TAB)}
      >
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="ניהול נותני שירות" />
      </ListItemButton>
    
      <ListSubheader component="div" id="nested-list-subheader">
        מידע
      </ListSubheader>
      <ListItemButton
        selected={selectedTab === STATISTICS_TAB}
        onClick={(event) => handleListItemClick(event, STATISTICS_TAB)}
      >
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="סטטיסטיקות" />
      </ListItemButton>
    </>
  );

  return (
    <div className="col-2 sidemenu-container">
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={<li />}
      >
        <ListSubheader component="div" id="nested-list-subheader">
          עמוד העסק
        </ListSubheader>
        <div className="business-link-row">
          <div className="links">
            <div className="row">{user?.business?.name}</div>
            <div className="row">
              <a
                href={FRONT_BASE_URL + "appoint/" + user?.business?.id}
                style={{
                  fontSize: "14px",
                  color: "blue",
                  textDecoration: "underline",
                }}
              >
                לכניסה לעמוד העסק
              </a>
            </div>
          </div>
          <img
            src={user?.business?.img ? user?.business?.img : NoImage}
            className="business-logo"
            alt="business logo"
          />
        </div>
        <Divider />
        {user.user?.serviceProvider ? serviceProviderMenu : adminMenu}
      </List>
    </div>
  );
}
