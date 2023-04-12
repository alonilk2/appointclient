import { Typography } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext } from "..";
import headerbg from "../../../images/home-header-background.webp";
import NoImage from "../../../images/noimage.png";
import { OpeningHours } from "../../OpeningHours";
import UserContext from "../UserContext";
import { darkModeBox } from "../Util";
import ImageUploadDialog from "./ImageUploadDialog";
import "./index.css";
import { LandingHuePicker } from "./LandingHuePicker";
import {
  APPOINT_TEXT,
  CHANGE_IMAGE_TEXT,
} from "../../../constants/LandingPageConstants";

export default function LandingPageManagement() {
  const user = useContext(UserContext);
  const colorMode = useContext(ColorModeContext);
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState(
    user.user?.business?.pageColor || "#f25f5c"
  );
  const [success, setSuccess] = useState(false);
  const [element, setElement] = useState();
  
  const handleHeaderClick = () => {
    setElement(null);
    setOpen(!open);
  };

  const handleChangeColor = (_color, event) => {
    setColor(_color?.hex);
  };

  const handleSubmit = async () => {
    let tempUser = { ...user?.user };
    console.log(tempUser);
    tempUser.business = {
      ...tempUser.business,
      pageColor: color,
    };
    let response = await user?.update(tempUser);
    if (response?.type === "user/update/fulfilled") {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 4000);
    }
  };

  const handleImageChange = (id) => {
    setElement(id);
    setOpen(true);
  };

  return (
    <div className="landing-page-container">
      <ImageUploadDialog open={open} toggle={setOpen} element={element} />

      <div
        className="header-bar"
        style={colorMode.mode === "dark" ? darkModeBox : null}
      >
        <Typography variant="h5">עיצוב דף נחיתה</Typography>
      </div>
      <div className="first-row">
        <div
          className="landing-page-main"
          style={colorMode.mode === "dark" ? darkModeBox : null}
        >
          {LandingHuePicker(color, handleChangeColor, handleSubmit, success)}
        </div>
      </div>
      <div className="landing-page-main">
        <div
          className="header-background"
          onClick={handleHeaderClick}
          style={{
            backgroundImage: `url(${
              user?.business?.headerImg ? user.business.headerImg : headerbg
            })`,
            backgroundSize: "cover",
            width: "100%",
            height: "60%",
          }}
        >
          <h1>{user?.business?.name}</h1>
          <h5>{user?.business?.subtitle}</h5>
          <img
            src={user?.business?.img ? user.business.img : NoImage}
            alt="logo"
            className="business-logo"
          />
          <button
            className="appoint-btn-demo"
            style={{ backgroundColor: color }}
          >
            {APPOINT_TEXT}
          </button>
          <div className="cover">
            <lottie-player
              src="https://assets7.lottiefiles.com/packages/lf20_asjtsvwm.json"
              background="transparent"
              speed="1"
              style={{ width: "50%", height: "50%" }}
              loop
              autoplay
            ></lottie-player>
            <p>{CHANGE_IMAGE_TEXT}</p>
          </div>
          <div></div>
        </div>
        <div className="second-row">
          <div className="form-container">
            {OpeningHours(user?.business?.workdays, color)}
            <div className="gallery">
              {user?.business?.gallery?.map((image, idx) => (
                <div
                  style={{
                    backgroundImage: `url(${image ? image : NoImage})`,
                    ...styles.galleryImage,
                  }}
                  onClick={() => handleImageChange(idx)}
                >
                  <div className="cover">
                    <lottie-player
                      src="https://assets7.lottiefiles.com/packages/lf20_asjtsvwm.json"
                      background="transparent"
                      speed="1"
                      style={{ width: "50%", height: "50%" }}
                      loop
                      autoplay
                    ></lottie-player>
                    <p>{CHANGE_IMAGE_TEXT}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  galleryImage: {
    minHeight: "150px",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    backgroundPosition: "center",
    width: "100%",
    border: "1px dashed grey",
    borderRadius: "5px",
  },
};
