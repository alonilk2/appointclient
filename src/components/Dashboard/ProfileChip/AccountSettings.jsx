import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { Alert, Typography } from "@mui/material";
import { Divider } from "@mui/material";
import { useState } from "react";
import { useContext } from "react";
import UserContext from "../UserContext";
import { useDispatch } from "react-redux";
import { _validatePassword } from "../../../features/userSlice";

export default function AccountSettings(props) {
  const { user, update, refresh } = useContext(UserContext);
  const [oldpass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [newPass1, setNewPass1] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  const handleToggleSettings = () => {
    props.setOpen(!props.open);
  };

  const ValidateOldPassword = () => {
    if (user) {
      let tempUser = { ...user };
      tempUser.password = oldpass;
      return dispatch(_validatePassword(tempUser));
    }
  };

  const handleChangePassword = async () => {
    if (
      oldpass.length === 0 ||
      newPass.length === 0 ||
      newPass1.length === 0 ||
      newPass1 !== newPass
    ) {
      return setError(true);
    }
    if (user) {
      let response = await ValidateOldPassword();
      if (response.type.endsWith("fulfilled")) {
        let tempUser = { ...user };
        tempUser.password = newPass;
        let response = await update(tempUser);
        if (response?.type?.endsWith("fulfilled")) {
          setError(false);
          handleToggleSettings();
        }
      } else setError(true)
    }
  };

  return (
    <Dialog
      open={props.open}
      onClose={handleToggleSettings}
      sx={{ direction: "ltr" }}
    >
      <DialogTitle>הגדרות חשבון</DialogTitle>
      <DialogContent>
        {error && (
          <Alert severity="error">יש לוודא תקינות הפרטים שהוזנו!</Alert>
        )}

        <Typography variant="subtitle1" gutterBottom component="div">
          שינוי סיסמה
        </Typography>
        <TextField
          autoFocus
          id="oldpass"
          label="סיסמה ישנה"
          type="password"
          variant="outlined"
          fullWidth
          value={oldpass}
          onChange={(e) => setOldPass(e.target.value)}
        />
        <TextField
          id="newpass"
          label="סיסמה חדשה"
          type="password"
          variant="outlined"
          fullWidth
          value={newPass}
          onChange={(e) => setNewPass(e.target.value)}
        />
        <TextField
          id="newpass1"
          label="אימות סיסמה חדשה"
          type="password"
          variant="outlined"
          fullWidth
          value={newPass1}
          onChange={(e) => setNewPass1(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleToggleSettings}>ביטול</Button>
        <Button onClick={handleChangePassword}>שינוי סיסמה</Button>
      </DialogActions>
    </Dialog>
  );
}
