import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
} from "@mui/material";
import { useContext, useState } from "react";
import UserContext from "../../UserContext";

export default function BusinessDetailsCard() {
  const { user, update, refresh } = useContext(UserContext)
  const [name, setName] = useState(user?.business?.name || "");
  const [address, setAddress] = useState(user?.business?.address || "");
  const [phone1, setPhone1] = useState(user?.business?.phone1 || "");
  const [phone2, setPhone2] = useState(user?.business?.phone2 || "");

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
      refresh();
    }
  };

  return (
    <Card elevation={0} sx={styles.cardContainer}>
      <CardHeader title="פרטי העסק" />
      <Divider />
      <CardContent>
        <TextField
          fieldWidth
          id="outlined-basic"
          label="שם העסק"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          fieldWidth
          id="outlined-basic"
          label="כתובת"
          variant="outlined"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <TextField
          fieldWidth
          id="outlined-basic"
          label="מס' טלאפון"
          variant="outlined"
          value={phone1}
          onChange={(e) => setPhone1(e.target.value)}
        />
        <TextField
          fieldWidth
          id="outlined-basic"
          label=" מס' טלאפון נוסף"
          variant="outlined"
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
  );
}

const styles = {
  cardContainer: {
    border: "1px solid #dae0e7",
    borderRadius: "10px",
  },
  AddButton: {
    margin: "auto",
    direction: "ltr",
  },
  submitButton: {
    margin: "1%",
    direction: "ltr",
  },
  addWorkdays: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    padding: "2% 0",
    color: "rgba(0, 0, 0, 0.6)",
  },
};
