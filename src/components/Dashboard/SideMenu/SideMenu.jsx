import PeopleIcon from "@mui/icons-material/Groups";
import ListIcon from "@mui/icons-material/List";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import { useDispatch, useSelector } from "react-redux";
import { selectTab } from "../../../features/dashboardSlice";
import SettingsIcon from "@mui/icons-material/Settings";
import HomeIcon from "@mui/icons-material/Home";
import { Divider } from "@mui/material";
import { API_BASE_URL, API_UPLOADS_URL, FRONT_BASE_URL } from "../../../constants";

export default function SideMenu(props) {
  const dispatch = useDispatch();
  const selectedTab = useSelector((state) => state.dashboard.selectedTabIndex);

  const handleListItemClick = (event, index) => {
    dispatch(selectTab(index));
  };

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
          <div className="row">
            {props?.user?.business?.name}
          </div>
          <div className="row">
            <a href={FRONT_BASE_URL+"appoint/"+props?.user?.business?.id} style={{fontSize: '14px'}}>
              לכניסה לעמוד העסק
            </a>
          </div>
        </div>
        <img src={API_UPLOADS_URL+props?.user?.business?.img} className="business-logo" alt="business logo" />


        </div>
        <Divider />
        <ListSubheader component="div" id="nested-list-subheader">
          פרופיל העסק
        </ListSubheader>
        <ListItemButton
          selected={selectedTab == 2}
          onClick={(event) => handleListItemClick(event, 2)}
        >
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="ניהול פרטי העסק" />
        </ListItemButton>
        <ListItemButton
          selected={selectedTab == 3}
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
          selected={selectedTab == 0}
          onClick={(event) => handleListItemClick(event, 0)}
        >
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="ניהול נותני שירות" />
        </ListItemButton>
        <ListItemButton
          selected={selectedTab == 1}
          onClick={(event) => handleListItemClick(event, 1)}
        >
          <ListItemIcon>
            <ListIcon />
          </ListItemIcon>
          <ListItemText primary="ניהול שירותים" />
        </ListItemButton>
      </List>
    </div>
  );
}
