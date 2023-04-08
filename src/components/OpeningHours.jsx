import { daysArray } from "./Dashboard/Util";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const sortWorkdaysArray = (arr) => {
  let sortedArr = [];
  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < arr?.length; j++) {
      if (arr[j].day === i) {
        sortedArr.push(arr[j]);
        j = arr.length;
      }
    }
  }
  return sortedArr;
};

export function OpeningHours(arr, color) {
  let sortedArr = sortWorkdaysArray(arr);
  let hours = sortedArr?.map((wd) => {
    return (
      <div className="day-column" key={wd.id}>
        <h5 style={{ color: color }}>{daysArray[wd.day]}</h5>
        <p>{wd.starttime}</p>
        <p>{wd.endtime}</p>
      </div>
    );
  });
  return (
    <div className="open-times">
      <div className="day-column" style={{ justifyContent: "flex-end" }}>
        <br />
        <p>שעת פתיחה</p>
        <p>שעת סגירה</p>
      </div>
      {hours.length > 0 ? (
        hours
      ) : (
        <Alert severity="info">
        <AlertTitle>שים\י לב</AlertTitle>
        יש להגדיר שעות פתיחה <br /> תחת הלשונית <b>"ניהול פרטי העסק"</b>
      </Alert>

      )}
    </div>
  );
}

const styles={
  alert
}