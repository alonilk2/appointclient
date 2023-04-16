/* eslint-disable react-hooks/exhaustive-deps */
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { createContext, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { selectTab } from "../../features/dashboardSlice";
import AddAppointmentDialog from "./AddAppointmentDialog";

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
  mode: "",
});

export default function Dashboard() {
  const selectedTab = useSelector((state) => state.dashboard.selectedTabIndex);
  const [mode, setMode] = useState("light");
  const [open, setOpen] = useState(false);
  const user = useUser();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
    dispatch(selectTab(2));
  };

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
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
          ...(mode === "dark" && {
            background: {
              default: "rgb(27, 38, 53)",
              paper: "rgb(27, 38, 53)",
            },
          }),
        },
      }),
    [mode]
  );

  useEffect(() => {
    if (user.user === false) {
      localStorage.removeItem(ACCESS_TOKEN);
      return navigate("/authorization/login");
    }
  }, [user.user]);

  useEffect(() => {
    if (selectedTab === 6) {
      setOpen(true);
    }
  }, [selectedTab]);

  return (
    <UserContext.Provider value={user}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="dashboard-container">
            <header
              className="dashboard-header"
              style={
                mode === "dark" ? { backgroundColor: "rgb(27, 38, 53)" } : null
              }
            >
              <a href="/">
                <h1
                  className="main-title"
                  style={
                    mode === "dark" ? { color: "white" } : { color: "black" }
                  }
                >
                  Torgate
                </h1>
              </a>
              {ProfileChip(user)}
            </header>
            {user.user && (
              <section className="row main-section">
                <main className="col-10 main">
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
                        <ServiceProviderView />
                      ))}
                    {selectedTab === 3 && <LandingPageManagement />}
                    {selectedTab === 4 && <Statistics />}
                    {selectedTab === 5 && <AppointmentsManagement />}
                    {selectedTab === 6 && (
                      <AddAppointmentDialog open={open} onClose={handleClose} />
                    )}
                  </div>
                </main>
                <SideMenu />
              </section>
            )}
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </UserContext.Provider>
  );
}
