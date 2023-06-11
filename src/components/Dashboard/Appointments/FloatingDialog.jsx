import { Divider, Modal } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import SmsIcon from "@mui/icons-material/Sms";
import BlockIcon from "@mui/icons-material/Block";
import { useContext } from "react";
import { ColorModeContext } from "..";
import { _removeAppointment } from "../../../features/appointSlice";
import { useDispatch } from "react-redux";
import UserContext from "../UserContext";
import { _blockUser } from "../../../features/userSlice";

export default function FloatingDialog({ appointment, setEventAppointment }) {
  const colorMode = useContext(ColorModeContext);
  const dispatch = useDispatch();
  const user = useContext(UserContext);
  const startHourArray = appointment.start_hour.split(" ")[0].split(":");
  const endHourArray = appointment.end_hour.split(" ")[0].split(":");

  const handleCancleAppointment = async () => {
    let response = await dispatch(_removeAppointment(appointment.id));
    setEventAppointment(null);
    if (response?.type?.endsWith("fulfilled")) {
      user.refresh();
    }
  };

  const handleBlockCustomer = async () => {
    console.log(appointment?.customer)
    let response = await dispatch(_blockUser(appointment?.customer.phone));
    response = await dispatch(_removeAppointment(appointment.id));
    setEventAppointment(null);
    if (response?.type?.endsWith("fulfilled")) {
      user.refresh();
    }
  };

  const handleCloseDialog = async () => {
    setEventAppointment(null);
  };

  return (
    <Modal
      open={appointment}
      onClose={handleCloseDialog}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
    <div className={colorMode.mode === "dark" ? "floatingDialog-container dark" : "floatingDialog-container"} >

      <button
        className={
          colorMode.mode === "dark" ? "exit-button dark" : "exit-button"
        }
        onClick={handleCloseDialog}
      >
        <ClearIcon style={{ fontSize: "1.4rem" }} />
      </button>
      <h5>
        שם הלקוח:{" "}
        {appointment.customer
          ? appointment.customer?.firstname +
            " " +
            appointment.customer?.lastname
          : appointment?.title}{" "}
      </h5>
      {appointment.details && "תיאור: " + appointment.details}
      <p>
        שעות התור:{" "}
        {startHourArray[0] +
          ":" +
          startHourArray[1] +
          "-" +
          endHourArray[0] +
          ":" +
          endHourArray[1]}
      </p>
      <Divider variant="middle" style={{ width: "80%" }} />
      <div className="actions-row">
        <button
          className={
            colorMode.mode === "dark" ? "action-button dark" : "action-button"
          }
          style={{ color: "#f44336" }}
          onClick={handleCancleAppointment}
        >
          <ClearIcon className="action-icon" />
          <p>ביטול תור</p>
        </button>
        <button
          className={
            colorMode.mode === "dark" ? "action-button dark" : "action-button"
          }
          style={{ color: "#4caf50" }}
        >
          <SmsIcon className="action-icon" />
          <p>שליחת הודעה</p>
        </button>
        <button
          className={
            colorMode.mode === "dark" ? "action-button dark" : "action-button"
          }
          style={{ color: colorMode.mode === "dark" ? "#b9b9b9" : "#000000" }}
          onClick={handleBlockCustomer}

        >
          <BlockIcon className="action-icon" />
          <p>חסימת לקוח</p>
        </button>
      </div>
      </div>
    </Modal>
  );
}
