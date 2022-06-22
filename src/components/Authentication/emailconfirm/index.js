import "./index.css";

import BackgroundImage from "../../../images/login.png";
import useWindowSize from "../../../hooks/useWindowSize";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { _confirmEmail, _login } from "../../../features/userSlice";
import { useEffect, useState } from "react";

function EmailConfirm(props) {
  const dispatch = useDispatch();
  const size = useWindowSize();
  const [success, setSuccess] = useState();
  const [error, setError] = useState();
  const [searchParams, setSearchParams] = useSearchParams();

  async function dispatchEmailConfirmation(confirmRequest) {
    let response;
    if (confirmRequest?.token) {
      response = await dispatch(_confirmEmail(confirmRequest));
    }

    if (response?.type == "user/confirmemail/fulfilled") {
      setSuccess(true);
    } else if (response?.type == "user/confirmemail/rejected") {
      setError(true);
    }
  }

  useEffect(() => {
    let token = searchParams.get("token");

    let confirmRequest = {
      token: token,
    };

    dispatchEmailConfirmation(confirmRequest);
  }, []);

  return (
    <div id="SignIncontainer">
      <div id="SignIn">
        {size.width > 768 && (
          <div className="col-7 login-background-container">
            <img src={BackgroundImage} className="login-background" alt="" />
          </div>
        )}
        <div className="col confirm-col">
          {success && (
            <>
              <h4 id="title">אימות דוא"ל התבצע בהצלחה!</h4>{" "}
              <p>נא התחבר לחשבונך</p>
            </>
          )}
          {error && <h4 id="title">אימות דוא"ל נכשל</h4>}
        </div>
      </div>
    </div>
  );
}

export default EmailConfirm;
