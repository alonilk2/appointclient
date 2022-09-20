import Logo from "../../images/logo.png";
import { Fade } from 'react-reveal'
export default function Footer() {
  return <div className="footer">
    <div className="footer-col">
      <h4>המוצר שלנו</h4>
      <a href="#"> מערכת לניהול תורים</a>
      <a href="#">עלות השירות</a>
      <a href="#">הרשמה לשירות</a>
      <a href="#">כניסה לפאנל ניהול</a>
    </div>
    <div className="footer-col">
      <h4>החברה</h4>
      <a href="#"> מי אנחנו</a>
      <a href="#"> יצירת קשר</a>
      <a href="#">תנאי שירות ותקנון פרטיות</a>
    </div>
    <div className="footer-col">
      <h4>רשתות חברתיות</h4>
    </div>
    <Fade left>
    <div className="footer-col" style={{ justifyContent: "center" }}>
      <img src={Logo} width={200} alt="logo" style={{ margin: "0 auto" }} />
      <p>כל הזכויות שמורות © Torgate 2022</p>
    </div>
    </Fade>

  </div>;
}
