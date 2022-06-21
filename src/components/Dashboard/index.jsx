import "./index.css";
import SideMenu from "./SideMenu";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <a href="/">
          <h1 href="#home" className="main-title" style={{ color: "black" }}>
            APPoint
          </h1>
        </a>
        <Stack direction="row" spacing={1}>
          <Chip
            avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
            label="Avatar"
            variant="outlined"
          />
        </Stack>
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
