import "../index.css";
import { useState, useRef, useEffect } from "react";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import useBusiness from "../../../hooks/useBusiness";
import { useNavigate, useParams } from "react-router-dom";
import loginImg from '../../../images/password.png'

export default function PhoneRegistration() {
  const [code, setCode] = useState(null);
  const [codeVerify, setCodeVerify] = useState(false);
  const appVerifier = useRef();
  const phoneNumber = useRef();
  const auth = getAuth();
  const { businessId } = useParams();
  const { object: business } = useBusiness(businessId);
  const navigate = useNavigate();

  useEffect(() => {
    appVerifier.current = new RecaptchaVerifier(
      "submit",
      {
        size: "invisible",
        callback: (response) => {
          onSignInSubmit();
        },
      },
      auth
    );
  }, []);

  const onCodeSubmit = async () => {
    try {
      window.confirmationResult
        .confirm(code)
        .then((result) => {
          const user = result.user;
          navigate("/appoint/"+businessId+"/registration", {state: user})
          console.log(result)
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {}
  };

  const onSignInSubmit = async () => {
    try {
      let result = await signInWithPhoneNumber(
        auth,
        "+972" + phoneNumber.current,
        appVerifier.current
      );
      window.confirmationResult = result;
      setCodeVerify(true);
    } catch (error) {
      console.log(error);
    }
  };

  const CodeVerifyComponent = (
    <>
      <div className="input-row">
        <span className="phone-ttl" id="phone-ttl">
          הכנס\י את הקוד שקיבלת בSMS:
        </span>
        <input
          type="phone"
          className="auth-input"
          placeholder="Phone Number"
          aria-label="Phone Number"
          aria-describedby="phone-ttl"
          onChange={(e) => setCode(e.target.value)}
        />
      </div>
      <button
        className="auth-button"
        id="submit"
        onClick={() => onCodeSubmit()}
        style={{ backgroundColor: business?.pageColor }}
      >
        שלח קוד
      </button>
    </>
  );

  const PhoneNumberInputComponent = (
    <>
      <div className="input-row">
        <span>
          הכנס מספר פלאפון למשלוח SMS לאימות:
        </span>
        <input
          type="phone"
          className="auth-input"
          placeholder="Phone Number"
          aria-label="Phone Number"
          aria-describedby="phone-ttl"
          onChange={(e) => (phoneNumber.current = e.target.value)}
        />
      </div>
      <button
        className="auth-button"
        id="submit"
        onClick={() => onSignInSubmit()}
        style={{ backgroundColor: business?.pageColor }}
      >
        שלח SMS
      </button>
    </>
  );

  return (
    <div id="auth-container" className="auth-container">
      <div className="col appoint-form-container">
        <img src={loginImg} className="auth-icon" alt="login icon"/>
        <h1 className="auth-title">אימות פלאפון </h1>
        {!codeVerify ? PhoneNumberInputComponent : CodeVerifyComponent}
      </div>
      <div className="col-7 image-background"></div>
    </div>
  );
}

const styles = {
  authBtn: {},
};
