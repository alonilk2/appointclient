import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { HuePicker } from "react-color";

import headerbg from "../../../images/home-header-background.png";
import NoImage from "../../../images/noimage.png";
import { OpeningHours } from "../../OpeningHours";
import ImageUploadDialog from "./ImageUploadDialog";
import "./index.css";

import { ColorModeContext } from "..";
import UserContext from "../UserContext";

export default function LandingPageManagement() {
  const user = useContext(UserContext);
  const colorMode = useContext(ColorModeContext);
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState("#f25f5c");
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

  useEffect(() => {
    if (user.user?.business?.pageColor) {
      setColor(user.user?.business?.pageColor);
    }
  }, [user]);

  return (
    <div className="landing-page-container">
      <ImageUploadDialog open={open} toggle={setOpen} element={element} />

      <div
        className="header-bar"
        style={
          colorMode.mode === "dark" ? { backgroundColor: "#121212" } : null
        }
      >
        <Typography variant="h5">עיצוב דף נחיתה</Typography>
      </div>
      <div className="first-row">
        <div className="landing-page-main">
          <Card elevation={0} sx={styles.cardContainer}>
            <CardHeader title="צבעים" />
            <Divider />
            <CardContent>
              <HuePicker
                color={color}
                onChange={handleChangeColor}
                width={"100%"}
              />
            </CardContent>
            <CardActions>
              <Button variant="contained" onClick={handleSubmit}>
                שמירה
              </Button>
              {success && (
                <>
                  <CheckCircleOutlineIcon
                    sx={{ color: "green", marginRight: "5px" }}
                  />
                  נשמר
                </>
              )}
            </CardActions>
          </Card>
        </div>
      </div>
      <div className="landing-page-main">
        <div
          className="header-background"
          onClick={handleHeaderClick}
          style={{
            backgroundImage: `url(${
              user?.business?.headerImg ? user?.business?.headerImg : headerbg
            })`,
            backgroundSize: "cover",
            width: "100%",
            height: "60%",
          }}
        >
          <h1>{user?.business?.name}</h1>
          <h5>{user?.business?.subtitle}</h5>
          <img
            src={user?.business?.img ? user?.business?.img : NoImage}
            alt="logo"
            className="business-logo"
          />
          <button
            className="appoint-btn-demo"
            style={{ backgroundColor: color }}
          >
            קביעת תור
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
            <p>לחץ לשינוי התמונה</p>
          </div>
          <div></div>
        </div>
        <div className="second-row">
          <div className="form-container">
            {OpeningHours(user?.business?.workdays, color)}
            <div className="gallery">
              <div
                style={{
                  backgroundImage: `url(${
                    user?.business?.gallery && user?.business?.gallery[0]
                      ? user?.business?.gallery[0]
                      : NoImage
                  })`,
                  minHeight: "200px",
                  minWidth: "200px",
                  backgroundSize: "cover",
                }}
                onClick={() => handleImageChange(0)}
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
                  <p>לחץ לשינוי התמונה</p>
                </div>
              </div>
              <div
                style={{
                  backgroundImage: `url(${
                    user?.business?.gallery && user?.business?.gallery[1]
                      ? user?.business?.gallery[1]
                      : NoImage
                  })`,
                  minHeight: "200px",
                  minWidth: "200px",
                  backgroundSize: "cover",
                }}
                onClick={() => handleImageChange(1)}
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
                  <p>לחץ לשינוי התמונה</p>
                </div>
              </div>
              <div
                style={{
                  backgroundImage: `url(${
                    user?.business?.gallery && user?.business?.gallery[2]
                      ? user?.business?.gallery[2]
                      : NoImage
                  })`,
                  minHeight: "200px",
                  minWidth: "200px",
                  backgroundSize: "cover",
                }}
                onClick={() => handleImageChange(2)}
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
                  <p>לחץ לשינוי התמונה</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  cardContainer: {
    border: "1px solid #dae0e7",
    borderRadius: "10px",
  },
};
