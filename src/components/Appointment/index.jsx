import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LanguageIcon from "@mui/icons-material/Language";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import { useNavigate, useParams } from "react-router-dom";
import useBusiness from "../../hooks/useBusiness";
import headerbg from "../../images/home-header-background.webp";
import NoImage from "../../images/noimage.png";
import { OpeningHours } from "../OpeningHours";
import "./index.css";
import { APPOINT_TEXT } from "../../constants/LandingPageConstants";
import { useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material";

export default function Appointment() {
  const { businessId } = useParams();
  const { business } = useBusiness(businessId);
  const navigate = useNavigate();
  const businessImg = business?.img;
  const phone1 = business?.phone1 || "";
  const phone2 = business?.phone2 || "";
  const address = business?.address || "";
  const email = business?.email || "";
  const website = business?.website || "";

  const handleClickAppoint = () => {
    navigate("../authorization");
  };

  const ImageContainer = () => {
    return (
      <div
        className="image-container"
        style={{
          backgroundImage: `url(${
            business?.headerImg ? business?.headerImg : headerbg
          })`,
          backgroundSize: "cover",
          backgroundPositionY: "50%",
          backgroundPositionX: "1px",
        }}
      >
        <div className="darken-home" />
        <h1>{business?.name ? business?.name : "שם העסק"}</h1>
        <img
          src={businessImg ? businessImg : NoImage}
          className="business-logo"
          alt="business logo"
        />
        <button
          className="appoint-btn"
          style={{ backgroundColor: business?.pageColor }}
          onClick={handleClickAppoint}
        >
          {APPOINT_TEXT}
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
    let galleryArray = business?.gallery ? JSON.parse(business?.gallery) : [];
    return (
      <div className="form-container">
        {OpeningHours(business?.workdays, business?.pageColor)}
        <div className="gallery">
          {galleryArray?.map((img) => {
            return <img src={img ? img : NoImage} alt="profile" />;
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
