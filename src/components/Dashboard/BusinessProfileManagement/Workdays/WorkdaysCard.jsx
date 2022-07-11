import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
} from "@mui/material";
import { useState, useEffect } from "react";
import AddWorkdaysDialog from "../../AddWorkdayDialog/AddWorkdaysDialog";
import WorkdaysTable from "../../WorkdaysTable";

export default function WorkdaysCard(props) {
  const [workdaysDialog, setWorkdaysDialog] = useState(false);
  const [workdaysArr, setWorkdaysArr] = useState(props?.business?.workdays);
  const [firstDayAvailable, setFirstDayAvailable] = useState(0);

  useEffect(()=>{
    setWorkdaysArr(props?.business?.workdays)
  }, [props?.business?.workdays])

  const handleSubmitForm =async () => {
    const workdays = workdaysArr.map((wd) => {
      console.log(wd)
      if(wd.startTimeFormatted) return {
        starttime: wd.startTimeFormatted,
        endtime: wd.endTimeFormatted,
        day: wd.day,
      };
    });
    let businessObj = {
      ...props?.business,
      workdays: workdays
    };
    let response = await props?.update(businessObj);
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
