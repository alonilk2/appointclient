import NavigationBar from "../components/NavigationBar";
import Breadcrumb from '../components/Breadcrumb'
import Recovery from "../components/Authentication/recovery";

export default function RecoveryView() {
    return (
      <div className="signin-container">
        <div className="blur-bg">
          <NavigationBar dark/>
          <Recovery />
        </div>
      </div>
    );
}
