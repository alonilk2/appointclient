import DeleteIcon from "@mui/icons-material/EventBusy";
import PageviewIcon from "@mui/icons-material/Pageview";
import { Avatar, Divider } from "@mui/material";
import Button from "@mui/material/Button";
import randomColor from "random-material-color";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Slide from "react-reveal/Slide";
import { useNavigate, useParams } from "react-router-dom";
import { API_UPLOADS_URL } from "../../../constants";
import { _removeAppointment } from "../../../features/appointSlice";
import useBusiness from "../../../hooks/useBusiness";
import useCustomer from "../../../hooks/useCustomer";
import Breadcrumb from "../../Breadcrumb";
import "./AppointDashboard.css";

export default function AppointDashboard(props) {
  const [showProviders, setShowProviders] = useState(false);
  const [clickedService, setClickedService] = useState(); // +1 added
  const { businessId } = useParams();
  const { business } = useBusiness(businessId);
  const { customer } = useCustomer(localStorage.getItem("phone"));
  const [colors, setColors] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const handleCancelAppointment = (appointment) => {
    dispatch(_removeAppointment(appointment?.id));
  };

  const Services = business?.services?.map((service, idx) => {
    colors.length < business.services.length &&
      setColors([...colors, randomColor.getColor()]);
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
                      bgcolor: colors[idx],
                      width: 80,
                      height: 80,
                    }
                  : { bgcolor: colors[idx], width: 80, height: 80 }
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
  const handleProviderClick = (provider) => {
    navigate("../schedule", {
      state: {
        provider: provider,
        business: business,
        clickedService: clickedService - 1,
        customer: customer,
      },
    });
  };

  const ServiceProviders = () => {
    let filteredProviders = FilterProvidersByService();
    let delay = 0;
    const providers = filteredProviders.map((provider) => {
      delay += 200;
      return (
        <Slide left big delay={delay} duration={900} when={showProviders}>
          <div
            className="service-col"
            onClick={() => handleProviderClick(provider)}
          >
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

  const futureAppointments = () => {
    let delay = 0;
    const appointments = customer?.appointments?.map((appointment) => {
      delay += 200;
      let provider;
      let endHour = appointment.end_hour.split(" ")[0].split(":");
      let startHour = appointment.start_hour.split(" ")[0].split(":");
      business?.serviceProviders?.forEach((_provider) => {
        _provider.appointments?.forEach((app) => {
          if (appointment.id === app.id) provider = _provider;
        });
      });
      return (
        <Slide right big delay={delay} duration={900}>
          <div className="service-col">
            <Avatar
              alt=""
              sx={{ width: 80, height: 80 }}
              src={API_UPLOADS_URL + provider?.filename}
            ></Avatar>
            <p className="service-name">
              <b>{provider?.firstname + " " + provider?.lastname}</b>
            </p>
            <p className="service-name">{appointment.day}</p>
            <p className="service-name">
              {endHour[0] +
                ":" +
                endHour[1] +
                " - " +
                startHour[0] +
                ":" +
                startHour[1]}
            </p>
            <Button
              size="small"
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => handleCancelAppointment(appointment)}
            >
              ביטול פגישה
            </Button>
          </div>
        </Slide>
      );
    });
    return appointments;
  };

  return (
    <div className="appoint-dashboard-container">
      <div className="form-container">
        <Breadcrumb
          pageArr={[
            {
              name: business?.name + " - עמוד העסק",
              url: "/appoint/" + business?.id,
            },
            {
              name: "לובי זימון תורים",
            },
          ]}
          sx={{ position: "absolute", top: "3%", left: "3%" }}
        />
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
          <div className="services-row">{futureAppointments()}</div>
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
