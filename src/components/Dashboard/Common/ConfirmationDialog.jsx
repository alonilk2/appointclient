import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Alert } from "@mui/material";
import { red } from "@mui/material/colors";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmationDialog({
  title,
  text,
  error,
  name,
  open,
  handleClose,
  handleConfirm,
}) {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      {error && <Alert severity="error">שגיאה</Alert>}

      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {text + name}? <br />
        </DialogContentText>
        <Alert severity="warning" style={styles.alert}>שים/י לב, זוהי פעולה בלתי הפיכה!</Alert>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>ביטול</Button>
        <Button onClick={handleConfirm}>אישור</Button>
      </DialogActions>
    </Dialog>
  );
}

const styles = {
  alert: {
    marginTop: '7px'
  }
}
