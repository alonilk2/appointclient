import useCustomer from "../../../hooks/useCustomer";
import "./AppointDashboard.css";
import { Divider } from "@mui/material";
import { API_UPLOADS_URL } from "../../../constants";

export default function AppointDashboard(props) {
  const { customer } = useCustomer();

  return (
    <div className="appoint-dashboard-container">
      <div className="form-container">
        <div className="col introduction">
          <img src={API_UPLOADS_URL + customer?.business?.img} alt="" width={100} />

          <h2> ברוך\ה הבא\ה {customer?.firstname}</h2>
          <p>
            Sed dapibus, massa non gravida vestibulum, ligula nisi sodales sem,
            sit amet interdum libero dolor ac enim. Praesent bibendum augue
            pharetra metus aliquet vulputate. 
          </p>
        </div>
        <Divider orientation="vertical" flexItem sx={{ height: "100%" }} />

        <div className="col">
          <h2> ברוך\ה הבא\ה {customer?.firstname}</h2>
        </div>
      </div>
    </div>
  );
}
