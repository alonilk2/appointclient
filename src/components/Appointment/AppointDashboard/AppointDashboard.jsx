import useCustomer from "../../../hooks/useCustomer";
import "./AppointDashboard.css";
import { Divider } from "@mui/material";
import { Avatar } from "@mui/material";
import { API_UPLOADS_URL } from "../../../constants";
import PageviewIcon from "@mui/icons-material/Pageview";
import AssignmentIcon from "@mui/icons-material/Assignment";
import {
  amber,
  blue,
  blueGrey,
  brown,
  common,
  cyan,
  deepOrange,
  deepPurple,
  green,
  grey,
  indigo,
  lightBlue,
  lightGreen,
  lime,
  orange,
  pink,
  purple,
  red,
  teal,
  yellow,
} from "@mui/material/colors";
import img1 from "../../../images/female1022804150971.jpg";
import img2 from "../../../images/female1022983696228.jpg";
import img3 from "../../../images/male20171086063338989.jpg";
import { ImageSearch } from "@mui/icons-material";
import Slide from "react-reveal/Slide";
import { useState } from "react";

export default function AppointDashboard(props) {
  const { customer } = useCustomer();
  const [showProviders, setShowProviders] = useState(false);
  const [service, setService] = useState();

  const handleClick = (serviceId) => {
    setService(serviceId / service === 1 ? null : serviceId);
    setShowProviders(false);
    setTimeout(() => {
      setShowProviders(serviceId / service !== 1);
    }, [500]);
  };

  return (
    <div className="appoint-dashboard-container">
      <div className="form-container">
        <div className="col introduction">
          <img
            src={API_UPLOADS_URL + customer?.business?.img}
            alt=""
            width={100}
          />

          <h2> ברוך\ה הבא\ה {customer?.firstname}</h2>
          <p>
            Sed dapibus, massa non gravida vestibulum, ligula nisi sodales sem,
            sit amet interdum libero dolor ac enim. Praesent bibendum augue
            pharetra metus aliquet vulputate.
          </p>
        </div>
        <Divider orientation="vertical" flexItem sx={{ height: "100%" }} />

        <div className="col service-providers-container">
          <h4> בחר שירות מבוקש:</h4>

          <div className="services-row">
            <Slide big left>
              <Avatar
                sx={
                  service === 1
                    ? {
                        bgcolor: pink[500],
                        width: 80,
                        height: 80,
                        borderRadius: "50%",
                        border: "4px solid #ff5707",
                      }
                    : { bgcolor: pink[500], width: 80, height: 80 }
                }
                onClick={() => handleClick(1)}
              >
                <PageviewIcon
                  sx={
                    service === 0 ? { fontSize: "50px" } : { fontSize: "50px" }
                  }
                />
              </Avatar>
            </Slide>
            <Slide big left>
              <Avatar
                sx={
                  service === 2
                    ? {
                        bgcolor: green[500],
                        width: 80,
                        height: 80,
                        borderRadius: "50%",
                        border: "4px solid #ff5707",
                      }
                    : { bgcolor: green[500], width: 80, height: 80 }
                }
                onClick={() => handleClick(2)}
              >
                <AssignmentIcon sx={{ fontSize: "50px" }} />
              </Avatar>
            </Slide>
            <Slide big left>
              <Avatar
                sx={
                  service === 3
                    ? {
                        bgcolor: lime[500],
                        width: 80,
                        height: 80,
                        borderRadius: "50%",
                        border: "4px solid #ff5707",
                      }
                    : { bgcolor: lime[500], width: 80, height: 80 }
                }
                onClick={() => handleClick(3)}
              >
                <AssignmentIcon sx={{ fontSize: "50px" }} />
              </Avatar>
            </Slide>
          </div>
          <Divider />
          <h4> בחר נותן שירות:</h4>

          <div className="providers-row">
            <Slide left big delay={0} when={showProviders}>
              <Avatar alt="" sx={{ width: 80, height: 80 }} src={img1}></Avatar>
            </Slide>
            <Slide left big delay={100} when={showProviders}>
              <Avatar alt="" sx={{ width: 80, height: 80 }} src={img3}></Avatar>
            </Slide>
            <Slide left big delay={200} when={showProviders}>
              <Avatar alt="" sx={{ width: 80, height: 80 }} src={img2}></Avatar>
            </Slide>
            <Slide left big delay={300} when={showProviders}>
              <Avatar alt="" sx={{ width: 80, height: 80 }} src={img3}></Avatar>
            </Slide>
          </div>
        </div>
      </div>
    </div>
  );
}
