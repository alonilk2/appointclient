import Form from "react-bootstrap/Form";

export default function LoginBox() {
  return (
    <div className="login-box-container">
      <h4 className="login-box-title">הרשם\י עכשיו בחינם!</h4>
      <div className="input-row">
        <Form.Control size="lg" type="text" placeholder="כתובת אימייל" />
        <button className="login-box-btn">הרשמה</button>
      </div>
      <p className="login-link">כבר רשום\ה? <a href="#">להתחברות</a></p>
    </div>
  );
}
