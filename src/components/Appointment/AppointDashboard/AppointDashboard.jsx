import PageviewIcon from "@mui/icons-material/Pageview";
import { Avatar, Divider } from "@mui/material";
import randomColor from "random-material-color";
import { useCallback, useState } from "react";
import Slide from "react-reveal/Slide";
import { useParams } from "react-router-dom";
import { API_UPLOADS_URL } from "../../../constants";
import useBusiness from "../../../hooks/useBusiness";
import useCustomer from "../../../hooks/useCustomer";
import "./AppointDashboard.css";

export default function AppointDashboard(props) {
  const { customer } = useCustomer();
  const [showProviders, setShowProviders] = useState(false);
  const [clickedService, setClickedService] = useState(); // +1 added
  const { businessId } = useParams();
  const { business } = useBusiness(businessId);

  const handleClick = (serviceId) => {
    setClickedService(serviceId / clickedService === 1 ? null : serviceId);
    setShowProviders(false);
    setTimeout(() => {
      setShowProviders(serviceId / clickedService !== 1);
    }, [500]);
  };

  const FilterProvidersByService = () => {
    let filteredProviders = [];
    business?.serviceProviders?.forEach((provider) => {
      provider.services?.forEach((service) => {
        if (service.id === business?.services[clickedService - 1]?.id)
          filteredProviders.push(provider);
      });
    });
    return filteredProviders;
  };

  const Services = business?.services?.map((service, idx) => {
    return (
      <Slide big left>
        <div className="service-col">
          <div
            className="service-wrapper"
            style={
              clickedService === idx + 1
                ? { border: "4px solid rgba(158, 158, 158, 0.678)" }
                : null
            }
          >
            <Avatar
              sx={
                clickedService === idx + 1
                  ? {
                      bgcolor: randomColor.getColor(),
                      width: 80,
                      height: 80,
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
          </div>

          <p className="service-name">{service?.name}</p>
        </div>
      </Slide>
    );
  });

  const ServiceProviders = () => {
    let filteredProviders = FilterProvidersByService();
    let delay = 0;
    const providers = filteredProviders.map((provider) => {
      delay += 100;
      return (
        <Slide left big delay={delay} duration={700} when={showProviders}>
          <div className="service-col">
            <Avatar
              alt=""
              sx={{ width: 80, height: 80 }}
              src={API_UPLOADS_URL + provider?.filename}
            ></Avatar>
            <p className="service-name">
              {provider.firstname + " " + provider.lastname}
            </p>
          </div>
        </Slide>
      );
    });
    return providers;
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

          <h4>תורים קרובים:</h4>
          <div className="services-row">{ServiceProviders()}</div>


        </div>
        <Divider orientation="vertical" flexItem sx={{ height: "100%" }} />

        <div className="col service-providers-container">
          <h4> בחר שירות מבוקש:</h4>

          <div className="services-row">{Services}</div>
          <Divider />
          <h4> בחר נותן שירות:</h4>

          <div className="providers-row">{ServiceProviders()}</div>
        </div>
      </div>
    </div>
  );
}
