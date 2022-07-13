import "./index.css";
import img1 from "../../images/img2.jpg";
import img2 from "../../images/img2.jpg";
import img3 from "../../images/img3.jpg";
import useBusiness from "../../hooks/useBusiness";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { API_BASE_URL, API_UPLOADS_URL } from "../../constants";
import { OpeningHours } from "../OpeningHours";
import { useNavigate } from 'react-router-dom';

export default function Appointment(props) {
  const { businessId } = useParams();
  const {business} = useBusiness(businessId);
  let businessImg = API_UPLOADS_URL + business?.img;
  let navigate = useNavigate();

  const handleClickAppoint = () => {
    navigate("../authorization")
  }

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
        <button className="appoint-btn" style={{backgroundColor: business?.pageColor}} onClick={handleClickAppoint}>קביעת תור</button>
      </div>
    );
  };

  const DetailsContainer = () => {
    return (
      <div className="form-container">
        {OpeningHours(business?.workdays, business?.pageColor)}
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
