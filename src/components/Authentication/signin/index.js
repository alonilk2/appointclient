import { Alert, AlertTitle } from "@mui/material";
import Divider from "@mui/material/Divider";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ACCESS_TOKEN,
  FACEBOOK_AUTH_URL,
  GOOGLE_AUTH_URL,
} from "../../../constants";
import { _login } from "../../../features/userSlice";
import useWindowSize from "../../../hooks/useWindowSize";
import fbLogo from "../../../images/fb-logo.png";
import googleLogo from "../../../images/google-logo.png";
import BackgroundImage from "../../../images/login.png";
import "./index.css";

function SigninComponent(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const location = useLocation();
  const size = useWindowSize();
  const navigate = useNavigate();
  const loggedIn = localStorage.getItem(ACCESS_TOKEN);

  const handleSubmit = async (event) => {
    event.preventDefault();

    let obj = {
      email: email,
      password: password,
    };

    let response = await dispatch(_login(obj));
    if (response.type.endsWith("fulfilled")) {
      localStorage.setItem(ACCESS_TOKEN, response.payload.accessToken);
     navigate("/dashboard");
    } else if (response.type.endsWith("rejected")) {
      setError(response);
    }
  };

  const Alerts = (
    <>
      {location.state?.registered && (
        <Alert severity="success">
          <AlertTitle>משתמש חדש נרשם בהצלחה!</AlertTitle>
          <strong>
            נא אמת\י את חשבונך לפי ההוראות שנשלחו אלייך בהודעה בדוא"ל
          </strong>
        </Alert>
      )}
      {error && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          An error occured while trying to login —{" "}
          <strong>check credentials and try again</strong>
        </Alert>
      )}
    </>
  );

  // useEffect(() => {
  //   if (loggedIn) navigate("/dashboard", { replace: true });
  // }, []);

  const LoginForm = (
    <form
      onSubmit={handleSubmit}
      className="col-5 signin-form"
      autocomplete="on"
    >
      {Alerts}
      <h4 id="title">התחברות</h4>
      <h5>כתובת דוא"ל</h5>
      <input
        className="input-field"
        type="email"
        placeholder="Email Address"
        required
        onChange={(e) => setEmail(e.target.value)}
      />
      <h5>סיסמה</h5>
      <input
        className="input-field"
        type="password"
        placeholder="Password"
        required
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="forgot-row">
        <a id="forgot" href="/forgot">
          <input type="checkbox"></input>
          זכור סיסמה
        </a>
        <a id="forgot" style={{ justifyContent: "flex-end" }} href="/forgot">
          שכחת סיסמה?
        </a>
      </div>
      <button className="home-btn signin-custom-btn" type="submit">
        התחבר
      </button>
      <div className="need-acc-txt">
        אין לך חשבון? <a href="/authorization/signup">להרשמה</a>
      </div>
      <Divider sx={{ marginBottom: 2 }}>או</Divider>
      <SocialLogin />
    </form>
  );

  return (
    <div id="SignIncontainer">
      <div id="SignIn">
        {size.width > 768 && (
          <div className="col-7 login-background-container">
            <img src={BackgroundImage} className="login-background" alt="" />
          </div>
        )}
        {LoginForm}
      </div>
    </div>
  );
}

const SocialLogin = () => {
  return (
    <div className="social-login">
      <a className="btn btn-block social-btn google" href={GOOGLE_AUTH_URL}>
        <img src={googleLogo} alt="Google" />
        <span>Log in with Google</span>
      </a>
      <a className="btn btn-block social-btn facebook" href={FACEBOOK_AUTH_URL}>
        <img src={fbLogo} alt="Facebook" />
        <span>Log in with Facebook</span>
      </a>
    </div>
  );
};

export default SigninComponent;
