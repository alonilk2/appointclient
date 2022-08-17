import { Alert, AlertTitle } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { _recovery } from "../../../features/userSlice";
import useWindowSize from "../../../hooks/useWindowSize";
import BackgroundImage from "../../../images/login.png";
import Breadcrumb from "../../Breadcrumb";
import "./index.css";

function Recovery(props) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const size = useWindowSize();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (email.length === 0) return setError(true)
    let recoveryRequest = {
      email: email
    }
    let response = await dispatch(_recovery(recoveryRequest));
    if (response.type.endsWith("fulfilled")) {
      return setSuccess(true)
    }
    return setError(response);
  };

  const Alerts = (
    <>
      {success && (
        <Alert severity="success" sx={{direction: 'ltr'}}>
          <AlertTitle>הודעה נשלחה לדוא"ל שלך</AlertTitle>
          <strong>
            נא שחזר את סיסמתך לפי ההוראות שנשלחו אלייך בהודעה בדוא"ל
          </strong>
        </Alert>
      )}
      {error && (
        <Alert severity="error" sx={{direction: 'ltr'}}>
          <AlertTitle>שגיאה</AlertTitle>
          <strong>אירעה שגיאה - יש לוודא כי הדוא"ל שהוזן תקין</strong>
        </Alert>
      )}
    </>
  );

  const LoginForm = (
    <form
      onSubmit={handleSubmit}
      className="col-5 signin-form"
      autocomplete="on"
    >
      <Breadcrumb
        sx={{ alignSelf: 'flex-end', direction: 'ltr' }}
        pageArr={[
          { name: 'דף הבית', url: '/' },
          { name: 'שחזור סיסמה', url: '/authorization/recovery' },
        ]}
      />
      {Alerts}
      <h4 id="title">שחזור סיסמה</h4>
      <h5>כתובת דוא"ל</h5>
      <input
        className="input-field"
        type="email"
        placeholder="Email Address"
        required
        onChange={(e) => setEmail(e.target.value)}
      />

      <button className="home-btn signin-custom-btn" type="submit">
        שליחה
      </button>
      <div className="need-acc-txt">
        נזכרת בסיסמה? <a href="/authorization/signin">להתחברות</a>
      </div>
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

export default Recovery;
