import AddIcon from "@mui/icons-material/Add";
import { Button, CardActions, Divider, TextField } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { _updateUser } from "../../../features/userSlice";
import useUser from "../../../hooks/Dashboard/useUser";
import "./index.css";
import Logo from "./logo.jpg";
import UploadImageDialog from "./UploadImageDialog";
import { API_UPLOADS_URL
 } from "../../../constants";
export default function BusinessDetailsManagement() {
  const { user, update } = useUser();
  const [name, setName] = useState(user?.business?.name || "");
  const [address, setAddress] = useState(user?.business?.address || "");
  const [phone1, setPhone1] = useState(user?.business?.phone1 || "");
  const [phone2, setPhone2] = useState(user?.business?.phone2 || "");
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleUploadImage = () => {
    setOpen(!open)
  };

  const handleSubmitForm = () => {
    if (user) {
      let tempUser = { ...user };
      tempUser.business = {
        ...tempUser.business,
        name: name,
        address: address,
        phone1: phone1,
        phone2: phone2,
      };
      update(tempUser);
    }
  };

  return (
    <div className="business-details-container">
      <UploadImageDialog open={open} toggle={setOpen} />
      <div className="header-bar">
        <Typography variant="h5">ניהול פרטי העסק</Typography>
      </div>
      <div className="formcontainer">
        <Card elevation={0} sx={styles.cardContainer}>
          <CardHeader title="פרטי העסק" />
          <Divider />
          <CardContent>
            <TextField
              fieldWidth
              id="filled-basic"
              label="שם העסק"
              variant="filled"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              fieldWidth
              id="filled-basic"
              label="כתובת"
              variant="filled"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <TextField
              fieldWidth
              id="filled-basic"
              label="מס' טלאפון"
              variant="filled"
              value={phone1}
              onChange={(e) => setPhone1(e.target.value)}
            />
            <TextField
              fieldWidth
              id="filled-basic"
              label=" מס' טלאפון נוסף"
              variant="filled"
              value={phone2}
              onChange={(e) => setPhone2(e.target.value)}
            />
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              sx={styles.submitButton}
              onClick={handleSubmitForm}
            >
              עדכון פרטים
            </Button>
          </CardActions>
        </Card>
        <Card elevation={0} sx={styles.cardContainer}>
          <CardHeader title="תמונת פרופיל" />
          <Divider />
          <CardContent>
            <img src={API_UPLOADS_URL + user?.business?.img} className="profile-logo" alt="פרופיל עסק" />
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              endIcon={<AddIcon />}
              sx={styles.AddButton}
              onClick={handleUploadImage}
            >
              העלה תמונה
            </Button>
          </CardActions>
        </Card>
      </div>
    </div>
  );
}

const styles = {
  cardContainer: {
    border: "1px solid #dae0e7",
    borderRadius: "10px",
    maxWidth: "50%",
  },
  AddButton: {
    margin: "auto",
    direction: "ltr",
  },
  submitButton: {
    margin: "1%",
    direction: "ltr",
  },
};
