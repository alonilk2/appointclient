import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Alert,
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import Spinner from "../../../images/spinner.svg";
import { useCallback, useContext, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import UserContext from "../UserContext";

export default function ServicesDialog(props) {
  const [name, setName] = useState("");
  const [cost, setCost] = useState(0);
  const [error, setError] = useState(false);
  const [duration, setDuration] = useState(0);
  const [file, setFile] = useState(props?.serviceForEdit?.file);
  const [loading, setLoading] = useState(false);
  const user = useContext(UserContext);

  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleClose = () => {
    toggleDialog();
  };

  const toggleDialog = () => {
    props.toggle(!props.open);
  };

  useEffect(() => {
    if (props?.serviceForEdit) {
      setName(props?.serviceForEdit.name);
      setCost(props?.serviceForEdit.cost);
      setDuration(props?.serviceForEdit.duration);
    } else {
      setName("");
      setCost(0);
    }
  }, [props?.serviceForEdit]);

  const handleSubDuration = () => {
    setDuration((duration) => duration - 5);
  };

  const handleAddDuration = () => {
    setDuration((duration) => duration + 5);
  };

  const handleAdd = async () => {
    if (name === "" || cost === "") return setError(true);

    let newService = {
      id: props?.serviceForEdit?.id || null,
      name: name,
      cost: cost,
      file: file,
      img: "",
      business: user?.business,
      duration: duration,
    };
    setLoading(true);
    let response;
    if (props.serviceForEdit) response = await props.update(newService);
    else response = await props?.add(newService);

    if (
      response?.type === "dashboard/addServices/fulfilled" ||
      response?.type === "dashboard/updateServices/fulfilled"
    ) {
      toggleDialog();
      setLoading(false);
      props?.refresh();
    }
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

  return (
    <Dialog open={props.open} sx={styles.dialogContainer}>
      <DialogTitle>הוסף שירות</DialogTitle>
      <DialogContentText sx={{padding: '6px 24px'}}>
        על מנת להוסיף שירות חדש, יש להזין את שם השירות, מחיר השירות (בשקלים), אורך הפגישה (בדקות), ותמונה לבחירתך אשר מתארת את השירות.
      </DialogContentText>
      <DialogContent>
        {error && <Alert severity="error">יש למלא את כל השדות!</Alert>}
        <TextField
          required
          error={error && name.length === 0 && true}
          id="outlined-required"
          variant="outlined"
          label="שם השירות"
          value={name}
          sx={styles.textField}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />
        <TextField
          required
          id="outlined-required"
          variant="outlined"
          value={cost}
          label="מחיר השירות"
          sx={styles.textField}
          onChange={(e) => setCost(e.target.value)}
          fullWidth
        />
        <Typography variant="subtitle2" component="div" sx={{direction: 'rtl'}}>
          :אורך הפגישה (בדקות)
        </Typography>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <ButtonGroup
            size="large"
            aria-label="large button group"
            sx={{ direction: "ltr", gap: "0.5rem", justifySelf: "center", margin: "1rem" }}
          >
            <Button onClick={handleAddDuration} variant="contained">+</Button>
            <Button variant="contained">{duration}</Button>
            <Button onClick={handleSubDuration} variant="contained">-</Button>
          </ButtonGroup>
        </div>
        <Divider />
        <br />
        {Dropzone}
        {file && (
          <p>
            {file[0]?.name} - {file[0]?.size}
          </p>
        )}
      </DialogContent>
      <DialogActions>
        {loading && <img src={Spinner} width={50} alt=""></img>}
        <Button variant="text" onClick={handleClose}>
          ביטול
        </Button>
        <Button variant="contained" onClick={handleAdd}>
          הוספה
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const styles = {
  dialogContainer: {
    direction: "ltr",
  },
  textField: {
    margin: "2% 0",
    border: "0px",
    overflow: "hidden",
  },
  addButton: {
    bgcolor: "success",
  },
};
