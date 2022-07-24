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

export default function Dashboard() {
  const selectedTab = useSelector((state) => state.dashboard.selectedTabIndex);
  const user = useUser();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!user.user) return navigate("/");
  // }, []);

  return (
    <UserContext.Provider value={user}>
      <div className="dashboard-container">
        <header className="dashboard-header">
          <a href="/">
            <h1 href="#home" className="main-title" style={{ color: "black" }}>
              APPoint
            </h1>
          </a>
          {ProfileChip(user)}
        </header>
        <section className="row main-section">
          <main className="col-10 main">
            <div className="main-container">
              {selectedTab === 0 && <ServiceProvidersManagement />}
              {selectedTab === 1 && <ServicesManagement />}
              {selectedTab === 2 && (user.user?.serviceProvider ? <ServiceProviderView /> : <BusinessDetailsManagement />)}
              {selectedTab === 3 && <LandingPageManagement />}
            </div>
          </main>
          <SideMenu />
        </section>
      </div>
    </UserContext.Provider>
  );
}
