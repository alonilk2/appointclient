import { useState } from "react";
import useBusiness from "../../../hooks/useBusiness";
import { useNavigate, useParams } from "react-router-dom";
import { API_UPLOADS_URL } from "../../../constants";
import { useDispatch } from "react-redux";
import { initCustomer, _addCustomer } from "../../../features/customerSlice";
import { Alert, AlertTitle, Divider } from "@mui/material";
import { useLocation } from "react-router-dom";
import { TextField } from "@mui/material";

export default function CustomerRegistration() {
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(location?.state);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [error, setError] = useState();
  const { businessId } = useParams();
  const { business } = useBusiness(businessId);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    if (email.length === 0 || firstname.length === 0 || lastname.length === 0) {
      return setError(true);
    }

    let obj = {
      email: email,
      phone: phone,
      firstname: firstname,
      lastname: lastname,
      business: [business],
    };

    let response = await dispatch(_addCustomer(obj));

    if (response.type == "customer/addCustomer/fulfilled") {
      dispatch(initCustomer(response.payload));
      navigate("/appoint/" + businessId + "/dashboard", {
        state: { response },
      });
    } else if (response.type == "customer/addCustomer/rejected") {
      setError(response.error.message);
    }
  };

  // if (!phone) return navigate("/");
  return (
    <div className="customer-registration-container" dir="rtl">
      <div className="form-container">
        {typeof error == String && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            An error occured while trying to register —{" "}
            <strong>check credentials and try again</strong>
          </Alert>
        )}
        <img src={API_UPLOADS_URL + business?.img} alt="" width={100} />

        <h1>פעם ראשונה שלך אצלנו?</h1>

        <p className="registration-intro">
          חכה\י שתראה\י מה יש לנו להציע!
          <br />
          רק בואו נכיר לפני כן, כדי שנדע למי לצפות :)
        </p>
        <TextField
          id="outlined-basic"
          fullWidth
          label="שם פרטי"
          error={firstname.length === 0 && error === true}
          variant="outlined"
          type="text"
          required
          onChange={(e) => setFirstname(e.target.value)}
        ></TextField>
        <TextField
          id="outlined-basic"
          fullWidth
          error={lastname.length === 0 && error === true}
          variant="outlined"
          type="text"
          label="שם משפחה"
          required
          onChange={(e) => setLastname(e.target.value)}
        ></TextField>
        <TextField
          id="outlined-basic"
          fullWidth
          variant="outlined"
          type="text"
          value={phone}
          label="מספר פלאפון"
          required
          disabled
          onChange={(e) => setPhone(e.target.value)}
        ></TextField>
        <TextField
          id="outlined-basic"
          fullWidth
          variant="outlined"
          error={email.length === 0 && error === true}
          type="email"
          label="דואר אלקטרוני"
          required
          onChange={(e) => setEmail(e.target.value)}
        ></TextField>

        <button
          className="home-btn signin-custom-btn"
          type="submit"
          onClick={handleSubmit}
        >
          הרשמה
        </button>
      </div>
    </div>
  );
}
