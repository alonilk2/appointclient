import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { API_UPLOADS_URL } from "../../../constants";
import useUser from "../../../hooks/Dashboard/useUser";
import ImageUploadDialog from "./ImageUploadDialog";
import "./index.css";
import { SliderPicker } from "react-color";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useEffect } from "react";

export default function LandingPageManagement() {
  const { user, update } = useUser();
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState("#f25f5c");
  const [success, setSuccess] = useState(false);

  const handleHeaderClick = () => {
    setOpen(!open);
  };

  const handleChangeColor = (color, event) => {
    setColor(color.hex);
  };

  const handleSubmit = async () => {
    let tempUser = { ...user };
    tempUser.business = {
      ...tempUser.business,
      pageColor: color,
    };
    let response = await update(tempUser);
    if (response?.type === "user/update/fulfilled") {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 4000);
    }
  };

  const OpeningHours = (
    <div className="open-times">
      <div className="day-column" style={{ justifyContent: "center" }}>
        <p>שעת פתיחה</p>
        <p>שעת סגירה</p>
      </div>
      <div className="day-column">
        <h5 style={{color: color}}>ראשון</h5>
        <p>10:00</p>
        <p>18:00</p>
      </div>
      <div className="day-column">
        <h5 style={{color: color}}>שני</h5>
        <p>10:00</p>
        <p>18:00</p>
      </div>
      <div className="day-column">
        <h5 style={{color: color}}>שלישי</h5>
        <p>10:00</p>
        <p>18:00</p>
      </div>
      <div className="day-column">
        <h5 style={{color: color}}>רביעי</h5>
        <p>10:00</p>
        <p>18:00</p>
      </div>
      <div className="day-column">
        <h5 style={{color: color}}>חמישי</h5>
        <p>10:00</p>
        <p>18:00</p>
      </div>
      <div className="day-column">
        <h5 style={{color: color}}>שישי</h5>
        <p>10:00</p>
        <p>18:00</p>
      </div>
      <div className="day-column">
        <h5 style={{color: color}}>שבת</h5>
        <p>-</p>
      </div>
    </div>
  );

  useEffect(() => {
    if (user) {
      setColor(user?.business?.pageColor);
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
              <SliderPicker color={color} onChange={handleChangeColor} />
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
            src={API_UPLOADS_URL + user?.business.headerImg}
          />
        </div>
        <div className="second-row">
          {OpeningHours}
          <div className="gallery-column">abc</div>
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
