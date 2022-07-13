import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import useUser from "../../../hooks/Dashboard/useUser";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function ServicesDialog(props) {
  const [name, setName] = useState("");
  const [cost, setCost] = useState(0);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const user = useUser();
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
    } else {
      setName("");
      setCost(0);
    }
  }, [props?.serviceForEdit]);

  const handleAdd = async () => {
    if (name === "" || cost === "") return setError(true);

    let newService = {
      id: props?.serviceForEdit?.id || null,
      name: name,
      cost: cost,
      business: user?.business,
    };

    let response;
    if (props.serviceForEdit) response = await props.update(newService);
    else response = await props?.add(newService);

    if (
      response?.type == "dashboard/addServices/fulfilled" ||
      response?.type == "dashboard/updateServices/fulfilled"
    ) {
      toggleDialog();
      props?.refresh();
    }
  };

  return (
    <Dialog open={props.open} sx={styles.dialogContainer}>
      <DialogTitle>הוסף שירות</DialogTitle>
      <DialogContent>
        {error && <Alert severity="error">יש למלא את כל השדות!</Alert>}
        <TextField
          required
          error={error && name.length === 0 && true}
          id="outlined-required"
          variant="filled"
          label="שם השירות"
          value={name}
          sx={styles.textField}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />
        <TextField
          required
          id="outlined-required"
          variant="filled"
          value={cost}
          label="מחיר השירות"
          sx={styles.textField}
          onChange={(e) => setCost(e.target.value)}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
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
    direction: "rtl",
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
