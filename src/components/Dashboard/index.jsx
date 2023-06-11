/* eslint-disable react-hooks/exhaustive-deps */
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { createContext, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN } from "../../constants";
import useUser from "../../hooks/Dashboard/useUser";
import AppointmentsManagement from "./Appointments";
import BusinessDetailsManagement from "./BusinessProfile";
import "./index.css";
import LandingPageManagement from "./LandingPage";
import ProfileChip from "./ProfileChip";
import ServiceProvidersManagement from "./ServiceProviders";
import ServiceProviderView from "./ServiceProviderView";
import ServicesManagement from "./Services";
import SideMenu from "./Sidemenu/SideMenu";
import Statistics from "./Statistics";
import UserContext from "./UserContext";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MuiDrawer from "@mui/material/Drawer";
import useWindowSize from "../../hooks/useWindowSize";
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
  mode: "",
});

export default function Dashboard() {
  const selectedTab = useSelector((state) => state.dashboard.selectedTabIndex);
  const cachedColorMode = localStorage.getItem("colorMode");
  const [mode, setMode] = useState(cachedColorMode ? cachedColorMode : "dark");
  const [openMenu, setOpenMenu] = useState(false);
  const [toggleAddEvent, setToggleAddEvent] = useState(false);
  const user = useUser();
  const navigate = useNavigate();
  const windowSize = useWindowSize();

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        localStorage.setItem("colorMode", mode === "light" ? "dark" : "light")
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
      mode: mode,
    }),
    [mode]
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            light: '#757ce8',
            main: mode === "dark" ? '#7e5dc0' : '#5e35b1',
            dark: '#002884',
            contrastText: '#fff',
          },
          secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000',
          },
          ...(mode === "dark" && {
            background: {
              default: "rgb(30 30 30)",
              paper: "rgb(30 30 30)",
            },
          }),
        },
      }),
    [mode]
  );

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };

  useEffect(() => {
    if (user.user === false) {
      localStorage.removeItem(ACCESS_TOKEN);
      return navigate("/authorization/login");
    }
  }, [user.user]);

  useEffect(() => {
    setOpenMenu(false);
  }, [selectedTab]);

  return (
    <UserContext.Provider value={user}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="dashboard-container">
            <header
              className="dashboard-header"
              style={{
                backgroundColor: mode === "dark" ? "rgb(30 30 30)" : null,
                zIndex: 1201,
              }}
            >
              <h1
                className="main-title"
                style={
                  mode === "dark" ? { color: "white" } : { color: "black" }
                }
              >
                Torgate
              </h1>
              {windowSize.width <= 1000 && (
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2, zIndex: 4 }}
                  onClick={handleOpenMenu}
                >
                  <MenuIcon />
                </IconButton>
              )}

              {ProfileChip(user)}
            </header>
            {user.user && (
              <section className="row main-section">
                <main className="main">
                  <div
                    className="main-container"
                    style={
                      mode === "dark" ? { backgroundColor: "#28333e" } : null
                    }
                  >
                    {selectedTab === 0 && <ServiceProvidersManagement />}
                    {selectedTab === 1 && <ServicesManagement />}
                    {selectedTab === 2 &&
                      (!user.user?.serviceProvider ? (
                        <BusinessDetailsManagement />
                      ) : (
                        <ServiceProviderView
                          setToggleAddEvent={setToggleAddEvent}
                          toggleAddEvent={toggleAddEvent}
                        />
                      ))}
                    {selectedTab === 3 && <LandingPageManagement />}
                    {selectedTab === 4 && <Statistics />}
                    {selectedTab === 5 && <AppointmentsManagement />}
                  </div>
                </main>
              </section>
            )}
            {windowSize.width > 1000 ? (
              <MuiDrawer anchor={"left"} variant="persistent" open={true}>
                <SideMenu open={openMenu} toggleAddEvent={setToggleAddEvent} />
              </MuiDrawer>
            ) : (
              <MuiDrawer anchor={"left"} open={openMenu}>
                <SideMenu open={openMenu} />
              </MuiDrawer>
            )}
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </UserContext.Provider>
  );
}
