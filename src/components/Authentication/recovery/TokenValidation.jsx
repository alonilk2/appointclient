import { Alert, AlertTitle } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { _changePassword, _findRecoveryToken, _recovery, _updateUser } from "../../../features/userSlice";
import useWindowSize from "../../../hooks/useWindowSize";
import BackgroundImage from "../../../images/login.png";
import Breadcrumb from "../../Breadcrumb";
import "./index.css";

export default function RecoveryTokenValidation(props) {
  const [password, setPassword] = useState();
  const [password1, setPassword1] = useState();
  const [error, setError] = useState();
  const [user, setUser] = useState();
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  let token = searchParams.get("token");
  const dispatch = useDispatch();
  const size = useWindowSize();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(password !== password1) return setError()
    let response = await dispatch(_changePassword({...user, password: password}));
    if (response.type.endsWith("fulfilled") ) {
      return setSuccess(true);
    }
    return setError(response);
  };

  const fetchToken = async () => {
    let response = await dispatch(
      _findRecoveryToken(searchParams.get("token"))
    );
    if (response.type.endsWith("fulfilled") && response.payload?.user) {
      return setUser(response.payload.user);
    }
    return navigate("/");
  };

  useEffect(() => {
    if (token) fetchToken();
  }, [token]);

  const Alerts = (
    <>
      {success && (
        <Alert severity="success" sx={styles.ltr}>
          <AlertTitle>סיסמתך שונתה בהצלחה</AlertTitle>
        </Alert>
      )}
      {error && (
        <Alert severity="error" sx={styles.ltr}>
          <AlertTitle>שגיאה</AlertTitle>
          <strong>אירעה שגיאה - יש לוודא כי הסיסמאות שהוזנו זהות</strong>
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
        sx={styles.breadcrumb}
        pageArr={[
          { name: "דף הבית", url: "/" },
          { name: "שחזור סיסמה", url: "/authorization/recovery" },
        ]}
      />
      {Alerts}
      <h4 id="title">שחזור סיסמה</h4>
      <h5>סיסמה חדשה:</h5>
      <input
        className="input-field"
        type="password"
        placeholder="סיסמה"
        required
        onChange={(e) => setPassword(e.target.value)}
      />
      <h5>שוב סיסמה חדשה:</h5>
      <input
        className="input-field"
        type="password"
        placeholder="סיסמה"
        required
        onChange={(e) => setPassword1(e.target.value)}
      />
      <button className="home-btn signin-custom-btn" type="submit">
        שליחה
      </button>
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


const styles = {
  breadcrumb: { alignSelf: "flex-end", direction: "ltr" },
  ltr: {direction: 'ltr'}
}