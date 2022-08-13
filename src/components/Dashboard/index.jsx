import { useEffect } from "react";
import { useSelector } from "react-redux/es/exports";
import useUser from "../../hooks/Dashboard/useUser";
import BusinessDetailsManagement from "./BusinessProfileManagement";
import "./index.css";
import LandingPageManagement from "./LandingPageManagement";
import ProfileChip from "./ProfileChip";
import ServiceProvidersManagement from "./ServiceProvidersManagement";
import ServicesManagement from "./ServicesManagement";
import SideMenu from "./SideMenu/SideMenu";
import UserContext from "./UserContext";
import { useNavigate } from "react-router-dom";
import ServiceProviderView from "./ServiceProviderView";
import logo from "../../images/logo.png";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useState, useMemo, createContext } from "react";
import Statistics from "./Statistics";

export const ColorModeContext = createContext({ toggleColorMode: () => {}, mode: "" });

export default function Dashboard() {
  const selectedTab = useSelector((state) => state.dashboard.selectedTabIndex);
  const [mode, setMode] = useState("light");
  const user = useUser();
  const navigate = useNavigate();

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
      mode: mode
    }),
    [mode]
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  // useEffect(() => {
  //   if (!user.user) return navigate("/");
  // }, []);

  return (
    <UserContext.Provider value={user}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="dashboard-container">
            <header className="dashboard-header" style={mode === "dark" ? {backgroundColor: "#121212"} : null}>
              <a href="/">
                <img src={logo} alt="logo" width={200} />
              </a>
              {ProfileChip(user)}
            </header>
            <section className="row main-section">
              <main className="col-10 main">
                <div className="main-container" style={mode === "dark" ? {backgroundColor: "#28333e"} : null}>
                  {selectedTab === 0 && <ServiceProvidersManagement />}
                  {selectedTab === 1 && <ServicesManagement />}
                  {selectedTab === 2 &&
                    (!user.user?.serviceProvider ? (
                      <BusinessDetailsManagement />
                    ) : (
                      <ServiceProviderView  />
                    ))}
                  {selectedTab === 3 && <LandingPageManagement />}
                  {selectedTab === 4 && <Statistics />}
                </div>
              </main>
              <SideMenu />
            </section>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </UserContext.Provider>
  );
}

