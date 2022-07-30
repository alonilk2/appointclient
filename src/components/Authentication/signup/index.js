import "./index.css";
import { Alert, AlertTitle, Divider } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { FACEBOOK_AUTH_URL, GOOGLE_AUTH_URL } from "../../../constants";
import { _signup } from "../../../features/userSlice";
import useWindowSize from "../../../hooks/useWindowSize";
import fbLogo from "../../../images/fb-logo.png";
import googleLogo from "../../../images/google-logo.png";
import BackgroundImage from "../../../images/login.png";
import { mediumRegex, validEmail } from "../../../common/Regex";

function Signup(props) {
  const dispatch = useDispatch();
  const size = useWindowSize();
  const navigate = useNavigate();
  const location = useLocation()
  const [email, setEmail] = useState(location?.state || "");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if(!validEmail.test(email) || !mediumRegex.test(password) || firstname.length === 0 || lastname.length === 0){
      return setError("Missing fields")
    }
    
    let obj = {
      email: email,
      password: password,
      firstname: firstname,
      lastname: lastname,
    };

    let response = await dispatch(_signup(obj));

    if (response.type === "user/signup/fulfilled") {
      return navigate("/authorization/login", { state: { registered: true } });
    }
    return setError(response.error.message);
  };

  function SignupForm() {
    return (
      <form
        onSubmit={handleSubmit}
        className="col-5 signin-form"
        autocomplete="on"
      >
        {error.length > 0 && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            An error occured while trying to register —
            <strong>check credentials and try again</strong>
          </Alert>
        )}
        <h4 id="title">הרשמה</h4>
        <h5>שם פרטי</h5>
        <input
          className="input-field"
          type="text"
          placeholder="שם פרטי"
          required
          error={error && firstname.length === 0}
          onChange={(e) => setFirstname(e.target.value)}
        ></input>
        <h5>שם משפחה</h5>
        <input
          className="input-field"
          type="text"
          placeholder="שם משפחה"
          required
          error={error && lastname.length === 0}
          onChange={(e) => setLastname(e.target.value)}
        ></input>
        <h5>כתובת דוא"ל</h5>
        <input
          className="input-field"
          type="email"
          placeholder="email Address"
          required
          value={email}
          error={error && !validEmail.test(email)}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <h5>סיסמה</h5>
        <input
          className="input-field"
          type="password"
          placeholder="Password"
          required
          error={error && !mediumRegex.test(password)}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button className="home-btn signin-custom-btn" type="submit">
          הרשמה
        </button>
        <div className="need-acc-txt">
          כבר יש לך חשבון? <a href="/authorization/login">להתחברות</a>
        </div>
        <Divider sx={{ marginBottom: 2 }}>או</Divider>

        <SocialLogin />
      </form>
    );
  }

  return (
    <div id="SignIncontainer">
      <div id="SignIn">
        {size.width > 768 && (
          <div className="col-7 login-background-container">
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

export default Signup;
