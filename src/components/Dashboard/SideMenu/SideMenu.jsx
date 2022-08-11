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
import BarChartIcon from '@mui/icons-material/BarChart';

export default function SideMenu() {
  const dispatch = useDispatch();
  const selectedTab = useSelector((state) => state.dashboard.selectedTabIndex);
  const user = useContext(UserContext);

  const handleListItemClick = (event, index) => {
    dispatch(selectTab(index));
  };

  const serviceProviderMenu = <></>;

  const adminMenu = (
    <>
      <ListSubheader component="div" id="nested-list-subheader">
        פרופיל העסק
      </ListSubheader>
      <ListItemButton
        selected={selectedTab === 2}
        onClick={(event) => handleListItemClick(event, 2)}
      >
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="ניהול פרטי העסק" />
      </ListItemButton>
      <ListItemButton
        selected={selectedTab === 3}
        onClick={(event) => handleListItemClick(event, 3)}
      >
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="ניהול דף נחיתה" />
      </ListItemButton>
      <ListSubheader component="div" id="nested-list-subheader">
        שירותים ומוצרים
      </ListSubheader>
      <ListItemButton
        selected={selectedTab === 0}
        onClick={(event) => handleListItemClick(event, 0)}
      >
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="ניהול נותני שירות" />
      </ListItemButton>
      <ListItemButton
        selected={selectedTab === 1}
        onClick={(event) => handleListItemClick(event, 1)}
      >
        <ListItemIcon>
          <ListIcon />
        </ListItemIcon>
        <ListItemText primary="ניהול שירותים" />
      </ListItemButton>

      <ListSubheader component="div" id="nested-list-subheader">
        מידע
      </ListSubheader>
      <ListItemButton
        selected={selectedTab === 4}
        onClick={(event) => handleListItemClick(event, 4)}
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
