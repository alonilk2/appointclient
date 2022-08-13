import { daysArray } from "./Dashboard/util";

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
  let sortedArr = sortWorkdaysArray(arr)
  return (
    <div className="open-times">
      <div className="day-column" style={{ justifyContent: "flex-end" }}>
        <br />
        <p>שעת פתיחה</p>
        <p>שעת סגירה</p>
      </div>
      {sortedArr?.map((wd) => {
        return (
          <div className="day-column">
            <h5 style={{ color: color }}>{daysArray[wd.day]}</h5>
            <p>{wd.starttime}</p>
            <p>{wd.endtime}</p>
          </div>
        );
      })}
    </div>
  );
}
