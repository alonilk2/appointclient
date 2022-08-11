import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../UserContext";

export default function BusinessDetailsCard() {
  const { user, update, refresh } = useContext(UserContext);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [phone1, setPhone1] = useState("");
  const [phone2, setPhone2] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmitForm = async () => {
    if (
      name.length === 0 ||
      address.length === 0 ||
      email.length === 0 ||
      phone1.length === 0
    ) {
      return setError(true);
    }
    if (user) {
      let tempUser = { ...user };
      tempUser.business = {
        ...tempUser.business,
        name: name,
        address: address,
        phone1: phone1,
        phone2: phone2,
        email: email,
        website: website,
      };
      let response = await update(tempUser);
      if (response?.type?.endsWith("fulfilled")) {
        setSuccess(true);
        setError();
        setTimeout(() => {
          setSuccess(false);
        }, 6000);
        refresh();
      }
    }
  };

  useEffect(() => {
    setName(user?.business?.name || "");
    setAddress(user?.business?.address || "");
    setPhone1(user?.business?.phone1 || "");
    setPhone2(user?.business?.phone2 || "");
    setWebsite(user?.business?.website || "");
    setEmail(user?.business?.email || "");
  }, [user]);

  return (
    <Card elevation={0} sx={styles.cardContainer}>
      <Snackbar open={success}>
        <Alert severity="success" sx={{ width: "100%" }}>
          This is a success message!
        </Alert>
      </Snackbar>
      <CardHeader title="פרטי העסק" />
      <Divider />
      <CardContent>
        {error && <Alert severity="error">יש למלא את כל שדות החובה!</Alert>}

        <TextField
          fieldWidth
          required
          error={error && name.length === 0 && true}
          id="outlined-basic"
          label="שם העסק"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          fieldWidth
          required
          error={error && address.length === 0 && true}
          id="outlined-basic"
          label="כתובת"
          variant="outlined"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <TextField
          fieldWidth
          required
          error={error && phone1.length === 0 && true}
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
        <TextField
          fieldWidth
          id="outlined-basic"
          required
          error={error && email.length === 0 && true}
          label='דוא"ל'
          variant="outlined"
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fieldWidth
          id="outlined-basic"
          label="אתר אינטרנט"
          variant="outlined"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
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
  );
}

const styles = {
  cardContainer: {
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
