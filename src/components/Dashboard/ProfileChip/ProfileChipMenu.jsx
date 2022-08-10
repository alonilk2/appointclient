import DraftsIcon from "@mui/icons-material/Drafts";
import InboxIcon from "@mui/icons-material/Inbox";
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
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import { useContext } from "react";

import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ColorModeContext } from "..";

export const ProfileChipMenu = (props) => {
  const handleLogout = () => {
    props.auth.logout();
    props.navigate("/");
  };
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <Box sx={colorMode.mode === "light" ? styles.profileMenuBoxDark : styles.profileMenuBox}>
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
          {theme.palette.mode} mode
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
    backgroundColor: '#121212'
  },
  profileMenuBoxDark: {
    width: "100%",
    maxWidth: 360,
    boxShadow: "0px 10px 41px 3px rgba(0,0,0,0.3)",
    zIndex: 3,
    backgroundColor: 'white'
  },
};
