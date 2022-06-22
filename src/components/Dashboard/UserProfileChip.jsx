import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
const ProfileMenu = (props) => {
  const handleLogout = () => {
    props.auth.logout();
    props.navigate("/");
  };
  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="התנתק\י" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary="Drafts" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
      <Divider />
      <nav aria-label="secondary mailbox folders">
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Trash" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemText primary="Spam" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
  );
};
export default function UserProfileChip(userInstance) {
  const [toggleMenu, setToggleMenu] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();
  const handleClick = () => {
    setToggleMenu(!toggleMenu);
  };

  return (
    <div className="profile-chip-container">
      <Stack direction="row" spacing={1}>
        <Chip
          avatar={<Avatar alt="Natacha" src={userInstance?.imageUrl} />}
          label={userInstance?.firstname + " " + userInstance?.lastname}
          variant="outlined"
          clickable
          onClick={handleClick}
        />
      </Stack>
      {toggleMenu && <ProfileMenu auth={auth} navigate={(path)=>navigate(path)} />}
    </div>
  );
}
