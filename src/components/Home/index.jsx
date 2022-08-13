import NavigationBar from "../NavigationBar";
import { AboutUsSection } from "./AboutUsSection";
import "./index.css";
import LoginBox from "./LoginBox";
import img1 from "../../images/1.png";
import img2 from "../../images/2.png";
import img3 from "../../images/3.png";
import img4 from "../../images/4.png";

import sidebg from "../../images/home-side-bg.png";

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
      <div className="info-row">
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
      <div className="info-row">
        <div
          className="side-bg-right"
          style={{ flexDirection: "row-reverse", backgroundPosition: "right" }}
        >
          <div className="col info">
            <h1>התאמה אישית - ללא מאמץ</h1>
            <p>
              עם ממשק אינטראקטיבי נוח ומינימליסטי, כל אחד יכול לעצב את דף הנחיתה
              ולהתאימו לעסק
            </p>
          </div>
          <img src={img2} alt="" className="side-img" />
        </div>
      </div>

      <AboutUsSection />
      <div className="getademo-section">
        <div className="getademo-container"></div>
        <img src={img2} alt="" />
      </div>
      <div className="footer">abc</div>
    </div>
  );
}
