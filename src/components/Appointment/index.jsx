import "./index.css";
import BackgroundImg from "../../images/appointment.jpg";

export default function Appointment() {
    
    const ImageContainer = () => {
        return <div className="image-container" style={styles.imageContainer}>
            <h1>מרכז רפואי מרפ"ם</h1>
            <h3>המרכז לבריאות האישה</h3>
            <button className="appoint-btn">קביעת תור</button>
        </div>;
    };

    const FormContainer = () => {
        return <div className="form-container">abc</div>;
    };

    return (
      <div className="appointment-container">
        {ImageContainer()}
        {FormContainer()}
      </div>
    );
}

const styles = {
  imageContainer: {
    backgroundImage: `url(${BackgroundImg})`,
    backgroundSize: "cover",
    backgroundPositionY: '50%'
  },
};
