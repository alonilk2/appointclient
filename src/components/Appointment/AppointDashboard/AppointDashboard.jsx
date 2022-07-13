import useCustomer from "../../../hooks/useCustomer";
import useBusiness from "../../../hooks/useBusiness";
import "./AppointDashboard.css";
import { Divider } from "@mui/material";
import { Avatar } from "@mui/material";
import { API_UPLOADS_URL } from "../../../constants";
import PageviewIcon from "@mui/icons-material/Pageview";
import AssignmentIcon from "@mui/icons-material/Assignment";
import randomColor from "random-material-color";
import img1 from "../../../images/female1022804150971.jpg";
import img2 from "../../../images/female1022983696228.jpg";
import img3 from "../../../images/male20171086063338989.jpg";
import { ImageSearch } from "@mui/icons-material";
import Slide from "react-reveal/Slide";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function AppointDashboard(props) {
  const { customer } = useCustomer();
  const [showProviders, setShowProviders] = useState(false);
  const [clickedService, setClickedService] = useState();
  const { businessId } = useParams();
  const { business } = useBusiness(businessId);

  const handleClick = (serviceId) => {
    setClickedService(serviceId / clickedService === 1 ? null : serviceId);
    setShowProviders(false);
    setTimeout(() => {
      setShowProviders(serviceId / clickedService !== 1);
    }, [500]);
  };

  const Services = business?.services?.map((service, idx) => {
    return (
      <Slide big left>
        <div className="service-col">
          <Avatar
            sx={
              clickedService === idx + 1
                ? {
                    bgcolor: randomColor.getColor(),
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    border: "4px solid #ff5707",
                  }
                : { bgcolor: randomColor.getColor(), width: 80, height: 80 }
            }
            onClick={() => handleClick(idx + 1)}
          >
            <PageviewIcon
              sx={
                clickedService === idx + 1
                  ? { fontSize: "50px" }
                  : { fontSize: "50px" }
              }
            />
          </Avatar>
          <p className="service-name">{service?.name}</p>
        </div>
      </Slide>
    );
  });

  const ServiceProviders = business?.services[clickedService]?.serviceProviderSet?.map(provider => {
    return (
      <Slide left big delay={0} when={showProviders}>
      <Avatar alt="" sx={{ width: 80, height: 80 }} src={img1}></Avatar>
    </Slide>
    )
  })

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

          <div className="services-row">{Services}</div>
          <Divider />
          <h4> בחר נותן שירות:</h4>

          <div className="providers-row">

            {ServiceProviders}
          </div>
        </div>
      </div>
    </div>
  );
}
