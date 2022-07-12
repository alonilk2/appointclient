import { useState } from "react";
import useBusiness from "../../../hooks/useBusiness";
import { useNavigate, useParams } from "react-router-dom";
import { API_UPLOADS_URL } from "../../../constants";
import { useDispatch } from "react-redux";
import { initCustomer, _addCustomer } from "../../../features/customerSlice";
import { Alert, AlertTitle, Divider } from "@mui/material";

export default function CustomerRegistration(props) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [error, setError] = useState("");
  const { businessId } = useParams();
  const { object: business } = useBusiness(businessId);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    let obj = {
      email: email,
      phone: phone,
      firstname: firstname,
      lastname: lastname,
      business: business
    };

    let response = await dispatch(_addCustomer(obj));

    if (response.type == "customer/addCustomer/fulfilled") {
      dispatch(initCustomer(response.payload));
      navigate("/appoint/"+businessId+"/dashboard", { state: response });
    } else if (response.type == "customer/addCustomer/rejected") {
      setError(response.error.message);
    }
  };

  return (
    <div className="customer-registration-container">
      <div className="form-container">
        {error && (
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
        <p>שם פרטי</p>
        <input
          className="input-field"
          type="text"
          placeholder="שם פרטי"
          required
          onChange={(e) => setFirstname(e.target.value)}
        ></input>
        <p>שם משפחה</p>
        <input
          className="input-field"
          type="text"
          placeholder="שם משפחה"
          required
          onChange={(e) => setLastname(e.target.value)}
        ></input>
        <p>מספר פלאפון</p>
        <input
          className="input-field"
          type="number"
          placeholder="מספר פלאפון"
          required
          onChange={(e) => setPhone(e.target.value)}
        ></input>
        <p>דואר אלקטרוני</p>
        <input
          className="input-field"
          type="email"
          placeholder="דואר אלקטרוני"
          required
          onChange={(e) => setEmail(e.target.value)}
        ></input>

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
