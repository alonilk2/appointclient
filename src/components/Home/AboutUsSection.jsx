import shield from "../../images/shield.png";
import point from "../../images/point.png";
import user from "../../images/user.png";

export const AboutUsSection = () => {
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
            פאנל ניהול מתקדם מאפשר גמישות יוצאת דופן ומגוון רחב של אפשרויות התאמה אישית, שליטה ובקרה
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
