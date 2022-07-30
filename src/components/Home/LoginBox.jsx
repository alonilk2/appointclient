import { useState } from "react";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

export default function LoginBox() {
  const [email, setEmail] = useState("")
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/authorization/signup', {state: email})
  }

  return (
    <div className="login-box-container">
      <h4 className="login-box-title">הרשם\י עכשיו בחינם!</h4>
      <div className="input-row">
        <Form.Control size="lg" type="text" placeholder="כתובת אימייל" onChange={(e)=>setEmail(e.target.value)}/>
        <button className="login-box-btn" onClick={handleRegister}>הרשמה</button>
      </div>
      <p className="login-link">כבר רשום\ה? <a href="/authorization/login">להתחברות</a></p>
    </div>
  );
}
