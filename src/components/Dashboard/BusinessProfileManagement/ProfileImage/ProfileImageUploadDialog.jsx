import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useCallback, useContext, useState } from "react";
import { useDropzone } from "react-dropzone";
import Spinner from "../../../../images/spinner.svg";
import UserContext from "../../UserContext";

export default function ProfileImageUploadDialog(props) {
  const [file, setFile] = useState([]);
  const [error, setError] = useState(false);
  const { user, update, refresh } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles);
  }, []);

  const toggleDialog = () => props.toggle(!props.open);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleClose = () => {
    toggleDialog();
  };

  const Dropzone = (
    <div
      className="dropzone-container"
      {...getRootProps()}
      style={
        error && file?.length === 0
          ? { borderColor: "red", borderWidth: "3px", color: "red" }
          : null
      }
    >
      <input {...getInputProps()} />
      <p>גרור ושחרר קובץ, או לחץ לבחירה</p>
      <CloudUploadIcon sx={styles.CloudUploadIcon} />
    </div>
  );

  const handleSubmit = async () => {
    if (file.length === 0) return setError(true);
    let tempUser = { ...user };
    tempUser.business = {
      ...tempUser.business,
      img: file,
    };
    setLoading(true);
    let response = await update(tempUser);
    if (response?.type === "user/update/fulfilled") {
      refresh();
      toggleDialog();
      setLoading(false);
    }
  };

  return (
    <Dialog open={props.open} onClose={handleClose} sx={styles.container}>
      <DialogTitle>העלאת תמונת פרופיל</DialogTitle>
      <DialogContent>
        <DialogContentText>
          ניתן לגרור קובץ תמונה ולהניח בתוך המסגרת, או לחילופין ללחוץ במסגרת
          לבחירת התמונה:
        </DialogContentText>
        {Dropzone}
        {file && <p>קובץ נבחר: {file[0]?.name}</p>}
      </DialogContent>
      <DialogActions>
        {loading && <img src={Spinner} width={50} alt=""></img>}
        <Button onClick={handleClose}>ביטול</Button>
        <Button onClick={handleSubmit}>העלאה</Button>
      </DialogActions>
    </Dialog>
  );
}

const styles = {
  container: {
    direction: "rtl",
  },
  CloudUploadIcon: {
    margin: "0 2% ",
  },
};
