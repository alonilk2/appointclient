import InboxIcon from "@mui/icons-material/Inbox";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountSettings from './AccountSettings'
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import { useContext } from "react";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ColorModeContext } from "..";
import { useState } from "react";

export const ProfileChipMenu = (props) => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const [open, setOpen] = useState(false);

  const handleSettingsToggle = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    props.auth.logout();
    props.navigate("/");
  };

  return (
    <Box
      sx={
        colorMode.mode === "light"
          ? styles.profileMenuBoxDark
          : styles.profileMenuBox
      }
    >
      <AccountSettings open={open} setOpen={setOpen} />
      <nav aria-label="main mailbox folders">
        <List>
          {props.user?.user?.provider === "local" && <ListItem disablePadding>
            <ListItemButton onClick={handleSettingsToggle}>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="הגדרות חשבון" />
            </ListItemButton>
          </ListItem>}
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="התנתק\י" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
      <Divider />
      <nav aria-label="secondary mailbox folders">
        <Box
          sx={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "background.default",
            color: "text.primary",
            borderRadius: 1,
            p: 3,
          }}
        >
          {theme.palette.mode === "dark" ? (
            <span>Dark Mode</span>
          ) : (
            <span>Light Mode</span>
          )}
          <IconButton
            sx={{ ml: 1 }}
            onClick={colorMode.toggleColorMode}
            color="inherit"
          >
            {theme.palette.mode === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
        </Box>
      </nav>
    </Box>
  );
};

const styles = {
  profileMenuBox: {
    width: "100%",
    maxWidth: 360,
    boxShadow: "0px 10px 41px 3px rgba(0,0,0,0.3)",
    zIndex: 3,
    backgroundColor: "rgb(30 30 30)",
  },
  profileMenuBoxDark: {
    width: "100%",
    maxWidth: 360,
    boxShadow: "0px 10px 41px 3px rgba(0,0,0,0.3)",
    zIndex: 3,
    backgroundColor: "white",
  },
};
