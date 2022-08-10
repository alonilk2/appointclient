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
  TableRow,
} from "@mui/material";
import { useMemo } from "react";
import { daysArray } from "../util";

export default function WorkdaysTable(props) {
  const handleAddWorkdays = () => {
    props?.setOpenDialog(!props?.workdaysDialog);
  };

  const handleRemove = (dayId) => {
    let tempArr = [...props?.workdaysArr];
    props?.workdaysArr.forEach((e, idx) => {
      if (e.day === dayId) {
        tempArr.splice(idx, 1);
      }
    });
    props?.setWorkdaysArr(tempArr);
  };

  let table = useMemo(
    () => (
      <Table size="small" aria-label="a dense table" sx={{ direction: "ltr" }}>
        <TableHead>
          <TableRow>
            <TableCell align="right">יום</TableCell>
            <TableCell align="right">שעת התחלה</TableCell>
            <TableCell align="right">שעת סיום</TableCell>
            <TableCell align="right">מחיקה</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props?.workdaysArr?.map((row, idx) => {
            return (
              <TableRow
                key={idx}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right" component="th" scope="row">
                  {daysArray[row.day]}
                </TableCell>
                <TableCell align="right">
                  {row?.startTimeFormatted || row?.starttime}
                </TableCell>
                <TableCell align="right">
                  {row?.endTimeFormatted || row?.endtime}
                </TableCell>
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
    ),
    [props?.workdaysArr]
  );

  return (
    <>
      {props?.workdaysArr?.length > 0 && table}
      {props?.workdaysArr?.length !== 7 && (
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
