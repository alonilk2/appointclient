import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { _fetchCustomer } from "../../../features/customerSlice";
import useBusiness from "../../../hooks/useBusiness";
import loginImg from "../../../images/password.png";
import "../index.css";

export default function PhoneRegistration() {
  const [code, setCode] = useState("");
  const [codeVerify, setCodeVerify] = useState(false);
  const appVerifier = useRef();
  const phoneNumber = useRef();
  const auth = getAuth();
  const { businessId } = useParams();
  const { business } = useBusiness(businessId);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const customer = useSelector((state) => state.customer?.customer);

  useEffect(() => {
    if (customer) {
      return navigate("/appoint/" + businessId + "/dashboard", {
        state: customer,
      });
    }
  }, [customer]);

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
    window.confirmationResult
      .confirm(code)
      .then(async (result) => {
        const user = result.user;
        localStorage.setItem("phone", user?.phoneNumber);
        let response = await dispatch(_fetchCustomer(user?.phoneNumber));
        if (!response?.payload?.phone)
          return navigate("/appoint/" + businessId + "/registration", {
            state: user.phoneNumber,
          });
      })
      .catch((error) => {
        console.log(error);
      });
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
        <span className="phone-title" id="code-title">
          הכנס\י את הקוד שקיבלת בSMS:
        </span>
        <input
          type="text"
          className="auth-input"
          placeholder="Code"
          aria-label="Code"
          aria-describedby="code-title"
          value={code}
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
        <span>הכנס מספר פלאפון למשלוח SMS לאימות:</span>
        <input
          type="phone"
          className="auth-input"
          placeholder="Phone Number"
          aria-label="Phone Number"
          aria-describedby="phone-ttl"
          value={phoneNumber.current}
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
        <img src={loginImg} className="auth-icon" alt="login icon" />
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
