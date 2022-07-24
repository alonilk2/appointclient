import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { API_UPLOADS_URL } from "../../../constants";
import ImageUploadDialog from "./ImageUploadDialog";
import "./index.css";
import { HuePicker } from "react-color";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useEffect } from "react";
import { OpeningHours } from "../../OpeningHours";
import img1 from "../../../images/img1.jpg";
import img2 from "../../../images/img2.jpg";
import img3 from "../../../images/img3.jpg";
import UserContext from "../UserContext";

export default function LandingPageManagement() {
  const user = useContext(UserContext)
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState("#f25f5c");
  const [success, setSuccess] = useState(false);

  const handleHeaderClick = () => {
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

  useEffect(() => {
    if (user.user?.business?.pageColor) {
      setColor(user.user?.business?.pageColor);
    }
  }, [user]);

  return (
    <div className="landing-page-container">
      <ImageUploadDialog open={open} toggle={setOpen} />

      <div className="header-bar">
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
        <div className="landing-page-main">
          <Typography variant="h5">עיצוב דף נחיתה</Typography>
        </div>
      </div>
      <div className="landing-page-main">
        <div className="header-background" onClick={handleHeaderClick}>
          <div className="cover">
            <h1>{user?.business?.name}</h1>
            <h5>{user?.business?.subtitle}</h5>
            <img
              src={API_UPLOADS_URL + user?.business?.img}
              alt="logo"
              className="business-logo"
            />
            <button
              className="appoint-btn-demo"
              style={{ backgroundColor: color }}
            >
              קביעת תור
            </button>
          </div>
          <img
            alt="header background"
            src={API_UPLOADS_URL + user?.business?.headerImg}
          />
        </div>
        <div className="second-row">
          <div className="form-container">
            {OpeningHours(user?.business?.workdays, user?.business?.pageColor)}
            <div className="gallery">
              <img src={img1}></img>
              <img src={img2}></img>
              <img src={img3}></img>
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
