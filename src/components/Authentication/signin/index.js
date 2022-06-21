import "./index.css";
// import Alert from "@mui/material/Alert";
import BackgroundImage from "../../../images/login.png";
import useWindowSize from "../../../Hooks/useWindowSize";
// import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { FACEBOOK_AUTH_URL, GOOGLE_AUTH_URL } from "../../../constants";
// import { signin } from "../../Actions/authActions";
import { useState } from "react";
import fbLogo from "../../../images/fb-logo.png";
import googleLogo from "../../../images/google-logo.png";

function SigninComponent(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const dispatch = useDispatch();
  // const errorFromServer = useSelector((state) => state.user.error);
  // const user = useSelector((state) => state.user);
  const location = useLocation();
  const size = useWindowSize();

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   if (location?.state?.cartFlag === true)
  //     dispatch(
  //       signin(
  //         Email.toLowerCase(),
  //         password,
  //         location.state
  //       )
  //     );
  //   else if (user.admin === true)
  //     dispatch(signin(Email.toLowerCase(), password, null, null, null, true));
  //   dispatch(signin(Email.toLowerCase(), password));
  // };

  const LoginForm = (
    <form
      // onSubmit={handleSubmit}
      className="col signin-form"
      autocomplete="on"
    >
      <h4 id="title">התחברות</h4>

      <h5>כתובת דוא"ל</h5>
      <input
        className="input-field"
        type="email"
        placeholder="Email Address"
        required
        onChange={(e) => setEmail(e.target.value)}
      ></input>
      <h5>סיסמה</h5>
      <input
        className="input-field"
        type="password"
        placeholder="Password"
        required
        onChange={(e) => setPassword(e.target.value)}
      ></input>
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
      <SocialLogin />
    </form>
  );

  return (
    <div id="SignIncontainer">
      <div id="SignIn">
        {size.width > 768 && (
          <div className="col login-background-container">
            <img src={BackgroundImage} className="login-background" alt="" />
          </div>
        )}
        {LoginForm}
      </div>
    </div>
  );
}

function SocialLogin() {
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
}

export default SigninComponent;
