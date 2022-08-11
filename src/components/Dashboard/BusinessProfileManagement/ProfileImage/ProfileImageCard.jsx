import AddIcon from "@mui/icons-material/Add";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider
} from "@mui/material";
import { useContext } from "react";
import { API_UPLOADS_URL } from "../../../../constants";
import UserContext from "../../UserContext";
import NoImage from '../../../../images/noimage.png'

export default function ProfileImageCard(props) {
  const user = useContext(UserContext)
  let openDialog = props?.openDialog;
  let setOpenDialog = props?.setOpenDialog;

  const handleUploadImage = () => {
    setOpenDialog(!openDialog);
  };

  return (
    <Card elevation={0} sx={styles.cardContainer}>
      <CardHeader title="תמונת פרופיל" />
      <Divider />
      <CardContent sx={styles.content}>
        <img
          src={user?.business?.img ? user?.business?.img : NoImage}
          className="profile-logo"
          alt="פרופיל עסק"
        />
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
  );
}

const styles = {
  cardContainer: {
    borderRadius: "10px",
  },
  content: {
    margin: '10% 0'
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
