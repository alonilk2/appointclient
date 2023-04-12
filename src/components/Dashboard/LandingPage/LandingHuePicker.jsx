import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider
} from "@mui/material";
import { HuePicker } from "react-color";

export function LandingHuePicker(color, handleChangeColor, handleSubmit, success) {
  return <Card elevation={0}>
    <CardHeader title="צבעים" />
    <Divider />
    <CardContent>
      <HuePicker
        color={color}
        onChange={handleChangeColor}
        width={"100%"} />
    </CardContent>
    <CardActions>
      <Button variant="contained" onClick={handleSubmit}>
        שמירה
      </Button>
      {success && (
        <>
          <CheckCircleOutlineIcon
            sx={{ color: "green", marginRight: "5px" }} />
          נשמר
        </>
      )}
    </CardActions>
  </Card>;
}
