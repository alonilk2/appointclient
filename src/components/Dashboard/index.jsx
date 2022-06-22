import "./index.css";
import SideMenu from "./SideMenu";
import { useState } from "react";
import { useDispatch } from "react-redux/es/exports";
import { useEffect } from "react";
import { _getCurrentUser } from "../../features/userSlice";
import UserProfileChip from "./UserProfileChip";
export default function Dashboard() {
  const dispatch = useDispatch();
  const [userInstance, setUserInstance] = useState();
  const initializeUserInstance = async () => {
    try {
      let response = await dispatch(_getCurrentUser());
      setUserInstance(response.payload);
    } catch (err) {
      console.log(err);
    }
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
        {UserProfileChip(userInstance)}
      </header>
      <section className="row main-section">
        <main className="col-10 main">
          <div className="main-container"> </div>
        </main>
        <SideMenu />
      </section>
    </div>
  );
}

