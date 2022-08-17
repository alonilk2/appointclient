import DashboardComponent from "../components/Dashboard";
import NavigationBar from "../components/NavigationBar";

export default function Dashboard() {
  return (
    <div className="Dashboard-container">
      <div className="blur-bg">
        <NavigationBar dark />
        <DashboardComponent />
      </div>
    </div>
  );
}
