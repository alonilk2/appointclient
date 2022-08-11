import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {
  Alert, Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider
} from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import { useContext, useEffect, useState } from "react";
import AddWorkdaysDialog from "../../AddWorkdayDialog/AddWorkdaysDialog";
import UserContext from "../../UserContext";
import WorkdaysTable from "../../WorkdaysTable";

export default function WorkdaysCard(props) {
  const [workdaysDialog, setWorkdaysDialog] = useState(false);
  const [workdaysArr, setWorkdaysArr] = useState(props?.business?.workdays);
  const [firstDayAvailable, setFirstDayAvailable] = useState(0);
  const [success, setSuccess] = useState(false);
  const user = useContext(UserContext);

  useEffect(() => {
    setWorkdaysArr(props?.business?.workdays);
  }, [props?.business?.workdays]);

  const handleSubmitForm = async () => {
    const workdays = workdaysArr.map((wd) => {
      if (wd.startTimeFormatted)
        return {
          starttime: wd.startTimeFormatted,
          endtime: wd.endTimeFormatted,
          day: wd.day,
        };
      return wd;
    });

    let tempUser = { ...user.user };
    let businessObj = {
      ...props?.business,
      workdays: workdays,
    };
    tempUser.business = businessObj;
    let response = await user.update(tempUser);
    if (response?.type?.endsWith("fulfilled")) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 6000);
    }
  };

  const findFirstDayAvailable = () => {
    for (let idx = 0; idx < 7; idx++) {
      let found = false;
      workdaysArr?.forEach((e) => {
        if (e.day === idx) {
          found = true;
          return;
        }
      });
      if (found === false) {
        setFirstDayAvailable(idx);
        idx = 7;
      }
    }
  };

  useEffect(() => {
    findFirstDayAvailable();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workdaysArr, setFirstDayAvailable]);

  return (
    <Card elevation={0} sx={styles.cardContainer}>
      {workdaysDialog && (
        <AddWorkdaysDialog
          open={workdaysDialog}
          toggle={setWorkdaysDialog}
          addWorkdays={setWorkdaysArr}
          workdaysArr={workdaysArr}
          firstDayAvailable={firstDayAvailable}
        />
      )}
      <Snackbar open={success}>
        <Alert severity="success" sx={{ width: '100%' }}>
          This is a success message!
        </Alert>
      </Snackbar>
      <CardHeader title="שעות פתיחה" />
      <Divider />
      <CardContent>
        <WorkdaysTable
          workdaysArr={workdaysArr}
          setWorkdaysArr={setWorkdaysArr}
          openDialog={workdaysDialog}
          setOpenDialog={setWorkdaysDialog}
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
