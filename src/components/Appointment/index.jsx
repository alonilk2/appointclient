import "./index.css";
import BackgroundImg from "../../images/appointment.jpg";
import img1 from "./img1.jpg";
import img2 from "./img2.jpg";
import img3 from "./img3.jpg";
import img4 from "./img4.jpg";

export default function Appointment() {
  const ImageContainer = () => {
    return (
      <div className="image-container" style={styles.imageContainer}>
        <h1>מרכז רפואי מרפ"ם</h1>
        <h3>המרכז לבריאות האישה</h3>
        <button className="appoint-btn">קביעת תור</button>
      </div>
    );
  };

  const OpeningHours = <div className="open-times">
    <div className="day-column" style={{ justifyContent: "flex-end" }}>
      <p>שעת פתיחה</p>
      <p>שעת סגירה</p>
    </div>
    <div className="day-column">
      <h5>ראשון</h5>
      <p>10:00</p>
      <p>18:00</p>
    </div>
    <div className="day-column">
      <h5>שני</h5>
      <p>10:00</p>
      <p>18:00</p>
    </div>
    <div className="day-column">
      <h5>שלישי</h5>
      <p>10:00</p>
      <p>18:00</p>
    </div>
    <div className="day-column">
      <h5>רביעי</h5>
      <p>10:00</p>
      <p>18:00</p>
    </div>
    <div className="day-column">
      <h5>חמישי</h5>
      <p>10:00</p>
      <p>18:00</p>
    </div>
    <div className="day-column">
      <h5>שישי</h5>
      <p>10:00</p>
      <p>18:00</p>
    </div>
    <div className="day-column">
      <h5>שבת</h5>
      <p>-</p>
    </div>
  </div>;

  const DetailsContainer = () => {
    return (
      <div className="form-container">
        {OpeningHours}
        <div className="gallery">
          <img src={img1} ></img>
          <img src={img2} ></img>
          <img src={img3} ></img>

        </div>
      </div>
    );
  };

  return (
    <div className="appointment-container">
      {ImageContainer()}
      {DetailsContainer()}
    </div>
  );
}

const styles = {
  imageContainer: {
    backgroundImage: `url(${BackgroundImg})`,
    backgroundSize: "cover",
    backgroundPositionY: "50%",
  },
};
