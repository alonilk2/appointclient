import NavigationBar from "../components/NavigationBar";
import RecoveryTokenValidation from "../components/Authentication/recovery/TokenValidation";

export default function RecoveryTokenValidationView() {
    return (
      <div className="signin-container">
        <div className="blur-bg">
          <NavigationBar dark/>
          <RecoveryTokenValidation />
        </div>
      </div>
    );
}
