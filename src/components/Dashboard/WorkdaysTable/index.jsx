import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Fab,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { daysArray } from "../util";

export default function WorkdaysTable(props) {
  const [workdaysArr, setWorkdaysArr] = useState(props?.workdaysArr)
  const [workdaysDialog, setWorkdaysDialog] = useState(props?.workdaysDialog)

  useEffect(()=>{
    setWorkdaysArr(props?.workdaysArr)
    console.log(props?.workdaysArr)
  }, [props?.workdaysArr])

  const handleAddWorkdays = () => {
    props?.setOpenDialog(!workdaysDialog);
  };

  const handleRemove = (dayId) => {
    workdaysArr.forEach((e, idx) => {
      if (e.day === dayId) {
        let tempArr = [...workdaysArr];
        tempArr.splice(idx, 1);
        props?.setWorkdaysArr(tempArr);
      }
    });
  };

  let table = (
    <Table size="small" aria-label="a dense table">
      <TableHead>
        <TableRow>
          <TableCell align="right">יום</TableCell>
          <TableCell align="right">שעת התחלה</TableCell>
          <TableCell align="right">שעת סיום</TableCell>
          <TableCell align="right">מחיקה</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {workdaysArr?.map((row) => {
          return (
            <TableRow
              key={row.day}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="right" component="th" scope="row">
                {daysArray[row.day]}
              </TableCell>
              <TableCell align="right">{row?.startTimeFormatted || row?.starttime}</TableCell>
              <TableCell align="right">{row?.endTimeFormatted || row?.endtime}</TableCell>
              <TableCell align="right">
                <IconButton
                  aria-label="delete"
                  color="error"
                  size="small"
                  onClick={() => handleRemove(row.day)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );

  return (
    <>
      {workdaysArr?.length > 0 && table}
      {workdaysArr?.length != 7 && (
        <Stack direction="column" sx={styles.addWorkdays}>
          <Fab color="primary" aria-label="add" onClick={handleAddWorkdays}>
            <AddIcon />
          </Fab>
          <p>הוספת ימי ושעות עבודה</p>
        </Stack>
      )}
    </>
  );
}

const styles = {
  addWorkdays: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    padding: "2% 0",
    color: "rgba(0, 0, 0, 0.6)",
  },
};
