import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { _getCurrentUser } from "../../features/userSlice";
import "./index.css";
import ServiceProvidersManagement from "./ServiceProvidersManagement";
import ServicesManagement from "./ServicesManagement";
import SideMenu from "./SideMenu/SideMenu";
import ProfileChip from "./ProfileChip";
import BusinessDetailsManagement from "./BusinessProfileManagement";
import LandingPageManagement from "./LandingPageManagement";

export default function Dashboard() {
  const dispatch = useDispatch();
  const [userInstance, setUserInstance] = useState();
  const selectedTab = useSelector((state) => state.dashboard.selectedTabIndex);

  const initializeUserInstance = async () => {
    let response = await dispatch(_getCurrentUser());
    setUserInstance(response.payload);
  };

  useEffect(() => {
    initializeUserInstance();
  }, []);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <a href="/">
          <h1 href="#home" className="main-title" style={{ color: "black" }}>
            APPoint
          </h1>
        </a>
        {ProfileChip(userInstance)}
      </header>
      <section className="row main-section">
        <main className="col-10 main">
          <div className="main-container">
            {selectedTab == 0 && <ServiceProvidersManagement />}
            {selectedTab == 1 && <ServicesManagement />}
            {selectedTab == 2 && <BusinessDetailsManagement />}
            {selectedTab == 3 && <LandingPageManagement />}

          </div>
        </main>
        <SideMenu />
      </section>
    </div>
  );
}
