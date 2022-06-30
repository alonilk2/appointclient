import "./index.css";
import img1 from "./img1.jpg";
import img2 from "./img2.jpg";
import img3 from "./img3.jpg";
import img4 from "./img4.jpg";
import useBusiness from "../../hooks/useBusiness";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { API_BASE_URL, API_UPLOADS_URL } from "../../constants";

export default function Appointment(props) {
  const { businessId } = useParams();
  const business = useBusiness(businessId);
  let businessImg = API_UPLOADS_URL + business?.img;
  const ImageContainer = () => {
    return (
      <div
        className="image-container"
        style={{
          backgroundImage: `url(${API_UPLOADS_URL + business?.headerImg})`,
          backgroundSize: "cover",
          backgroundPositionY: "50%",
        }}
      >
        <h1>{business?.name}</h1>
        <h3>המרכז לבריאות האישה</h3>
        <img src={businessImg} className="business-logo" alt="business logo" />
        <button className="appoint-btn" style={{backgroundColor: business?.pageColor}}>קביעת תור</button>
      </div>
    );
  };
  
  const OpeningHours = (
    <div className="open-times">
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
    </div>
  );

  const DetailsContainer = () => {
    return (
      <div className="form-container">
        {OpeningHours}
        <div className="gallery">
          <img src={img1}></img>
          <img src={img2}></img>
          <img src={img3}></img>
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
  imageContainer: {},
};
