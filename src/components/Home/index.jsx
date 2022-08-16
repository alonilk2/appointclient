import NavigationBar from "../NavigationBar";
import "./index.scss";
import LoginBox from "./LoginBox";
import img1 from "../../images/1.png";
import img2 from "../../images/2.png";
import img3 from "../../images/3.png";
import img4 from "../../images/4.png";
import contactbg from "../../images/contact-bg.jpg";
import shield from "../../images/shield.png";
import point from "../../images/point.png";
import user from "../../images/user.png";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import Logo from '../../images/logo.png'
const AboutUsSection = () => {
  return (
    <section className="about-us-container">
      <div className="description">
        <h2 className="title">מי אנחנו</h2>
        <p>
          Torgate היא מערכת לניהול תורים עבור עסקים קטנים ובינוניים. <br />
          המערכת שלנו הינה המתקדמת מסוגה בישראל, ומאפשרת ניהול תורים אוטומטי,
          ללא רישומים ומעקבים ידניים, <br />
          למספר רב של עובדים בנוחות ובקלות, ומציעה לבעלי העסקים דף נחיתה מותאם
          אישית דרכו לקוחות העסק יוכלו לזמן את התורים שלהם.
        </p>
      </div>
      <div className="icons-row">
        <div className="description-card">
          <img alt="icon" src={shield}></img>
          <p>
            עם 99.9% זמינות, את\ה יכול לסמוך עלינו לניהול רציף של התורים - ללא
            שיבושים
          </p>
        </div>
        <div className="description-card">
          <img alt="icon" src={point}></img>
          <p>
            פאנל ניהול מתקדם מאפשר גמישות יוצאת דופן ומגוון רחב של אפשרויות
            התאמה אישית, שליטה ובקרה
          </p>
        </div>
        <div className="description-card">
          <img alt="icon" src={user}></img>
          <p>
            שירות לקוחות אנושי הדואג להבטיח שלקוחותיכם תמיד יוכלו למצוא אתכם
          </p>
        </div>
      </div>
    </section>
  );
};

const HeaderTitle = () => {
  return (
    <div className="right-section-container">
      <h2>אנחנו ניצור לך</h2>
      <h1>דף זימון תורים</h1>
      <h1>מותאם אישית לעסק שלך</h1>
    </div>
  );
};

export default function Home(props) {
  return (
    <div className="home-container">
      <header className="home-header">
        <NavigationBar />
        <div className="header-row">
          <HeaderTitle />
          <LoginBox />
        </div>
      </header>
      <div className="home-first-row">
        <h1 className="home-main-title">מערכת ניהול התורים המתקדמת בישראל</h1>
        <p>
          התחל\י לנהל את התורים של לקוחותייך באופן אוטומטי, ללא רישומים ידניים
          וללא דאגות <br />
        </p>
        <div className="screenshot-container">
          <img src={img1} alt="" className="sample-screenshot" />
        </div>
      </div>
      <div className="info-row home-section-bg-r">
        <div
          className="side-bg-right"
          style={{ flexDirection: "row-reverse", backgroundPosition: "right" }}
        >
          <div className="col info">
            <h1>נהל\י תורים לכל העובדים בעסק</h1>
            <p>
              לקוחותייך יוכלו לבחור בשירות אותו הם רוצים - ובמי שיספק להם אותו.
            </p>
          </div>
          <img src={img4} alt="" className="side-img" />
        </div>
      </div>
      <div className="info-row">
        <div className="side-bg">
          <div className="col info">
            <h1>דף נחיתה מודרני ומעוצב</h1>
            <p>כניסה מזמינה ללקוחותייך, עם מידע חיוני וממשק קל להתמצאות</p>
          </div>
          <img src={img3} alt="" className="side-img" />
        </div>
      </div>
      <div className="info-row home-section-bg">
        <div
          className="side-bg-right"
          style={{ flexDirection: "row-reverse", backgroundPosition: "right" }}
        >
          <div className="col info">
            <h1>התאמה אישית - ללא מאמץ</h1>
            <p>
              עם ממשק אינטראקטיבי נוח ומינימליסטי, כל אחד יכול לעצב את דף הנחיתה
              בקלות ולהתאימו לעסק
            </p>
          </div>
          
          <img src={img2} alt="" className="side-img" />
        </div>
      </div>

      <AboutUsSection />
      <div className="contact-section">
        <div className="contact-container">
          <h1>צרו קשר לקבלת ליווי בהתנסות</h1>
          <TextField
            fullWidth
            id="outlined-basic"
            label="שם מלא"
            variant="outlined"
          />
          <TextField
            fullWidth
            id="outlined-basic"
            label="שם חברה (אופציונלי)"
            variant="outlined"
          />
          <TextField
            fullWidth
            id="outlined-basic"
            label="דואר אלקטרוני"
            variant="outlined"
          />
          <TextField
            fullWidth
            id="outlined-basic"
            label="פלאפון"
            variant="outlined"
          />
          <TextField
            fullWidth
            id="outlined-basic"
            multiline
            rows={4}
            label="תוכן ההודעה"
            variant="outlined"
          />
          <Button variant="outlined">שליחה</Button>
        </div>
        <img src={contactbg} alt="" />
      </div>
      <div className="footer">
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
        <div className="footer-col" style={{justifyContent: 'center'}}>
          <img src={Logo} width={200} alt="logo" style={{margin: '0 auto'}} />
          <p>כל הזכויות שמורות © Torgate 2022</p>
        </div>
      </div>
    </div>
  );
}
