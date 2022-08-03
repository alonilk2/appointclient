import "./index.css";
import img1 from "../../images/img2.jpg";
import img2 from "../../images/img2.jpg";
import img3 from "../../images/img3.jpg";
import useBusiness from "../../hooks/useBusiness";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { API_BASE_URL, API_UPLOADS_URL } from "../../constants";
import { OpeningHours } from "../OpeningHours";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import PhoneIcon from "@mui/icons-material/Phone";
import LanguageIcon from "@mui/icons-material/Language";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function Appointment(props) {
  const { businessId } = useParams();
  const { business } = useBusiness(businessId);
  let businessImg = business?.img;
  let navigate = useNavigate();
  let phone1 = business?.phone1 || "";
  let phone2 = business?.phone2 || "";
  let address = business?.address || "";
  let email = business?.email || "";
  let website = business?.website || "";

  const handleClickAppoint = () => {
    navigate("../authorization");
  };

  const ImageContainer = () => {
    return (
      <div
        className="image-container"
        style={{
          backgroundImage: `url(${business?.headerImg})`,
          backgroundSize: "cover",
          backgroundPositionY: "50%",
        }}
      >
        <h1>{business?.name}</h1>
        <h3>המרכז לבריאות האישה</h3>
        <img src={businessImg} className="business-logo" alt="business logo" />
        <button
          className="appoint-btn"
          style={{ backgroundColor: business?.pageColor }}
          onClick={handleClickAppoint}
        >
          קביעת תור
        </button>
        <div className="details-box">
          <div className="details-row">
            <PhoneIcon /> {phone1}
          </div>
          <div className="details-row">
            <PhoneIcon /> {phone2}
          </div>
          <div className="details-row">
            <LocationOnIcon /> {address}
          </div>
          <div className="details-row">
            <AlternateEmailIcon /> {email}
          </div>
          <div className="details-row">
            <LanguageIcon /> {website}
          </div>
        </div>
      </div>
    );
  };

  const DetailsContainer = () => {
    let galleryArray = business?.gallery && JSON.parse(business?.gallery).images;
    console.log(galleryArray)
    return (
      <div className="form-container">
        {OpeningHours(business?.workdays, business?.pageColor)}
        <div className="gallery">
          {galleryArray?.map(img => {
            return (
              <img src={img} alt="profile"/>
            )
          })}
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
