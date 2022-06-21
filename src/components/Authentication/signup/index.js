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
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
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
  function SignupForm() {
    return (
      <form
        // onSubmit={handleSubmit}
        className="col signin-form"
        autocomplete="on"
      >
        <h4 id="title">הרשמה</h4>
        <h5>שם פרטי</h5>
        <input
          className="input-field"
          type="text"
          placeholder="שם פרטי"
          required
          onChange={(e) => setFirstname(e.target.value)}
        ></input>
        <h5>שם משפחה</h5>
        <input
          className="input-field"
          type="text"
          placeholder="שם משפחה"
          required
          onChange={(e) => setLastname(e.target.value)}
        ></input>
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
        <button className="home-btn signin-custom-btn" type="submit">
          הרשמה
        </button>
        <div className="need-acc-txt">
          כבר יש לך חשבון? <a href="/authorization/login">להתחברות</a>
        </div>
        <SocialLogin />
      </form>
    );
  }

  return (
    <div id="SignIncontainer">
      <div id="SignIn">
        {size.width > 768 && (
          <div className="col login-background-container">
            <img src={BackgroundImage} className="login-background" alt="" />
          </div>
        )}
        {SignupForm()}
      </div>
    </div>
  );
}

function SocialLogin() {
  return (
    <div className="social-login">
      <a className="btn btn-block social-btn google" href={GOOGLE_AUTH_URL}>
        <img src={googleLogo} alt="Google" />
        <span>Sign up with Google</span>
      </a>
      <a className="btn btn-block social-btn facebook" href={FACEBOOK_AUTH_URL}>
        <img src={fbLogo} alt="Facebook" />
        <span>Sign up with Facebook</span>
      </a>
    </div>
  );
}

export default SigninComponent;
