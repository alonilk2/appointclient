import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DeleteIcon from "@mui/icons-material/EventBusy";
import { Avatar, Divider } from "@mui/material";
import Button from "@mui/material/Button";
import { useEffect } from "react";
import { useCallback, useState } from "react";
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
  const { customer, refresh } = useCustomer(localStorage.getItem("phone"));
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
        if (service?.id === business?.services[clickedService - 1]?.id)
          filteredProviders.push(provider);
      });
    });
    return filteredProviders;
  };
  
  const handleCancelAppointment = async(appointment) => {
    let response =await dispatch(_removeAppointment(appointment?.id));
    if(response?.type?.endsWith('fulfilled')){
      refresh()
    }
  };

  const Services = business?.services?.map((service, idx) => {
    return (
      <Slide big left>
        <div className="service-col" onClick={() => handleClick(idx + 1)}>
          <img
            className="service-img"
            src={service?.img}
            alt="service"
          ></img>
          <div className="darken"></div>
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

  const ServiceProviders = useCallback(() => {
    let filteredProviders = FilterProvidersByService();
    let delay = 0;
    const providers = filteredProviders.map((provider) => {
      delay += 200;
      return (
        <Slide bottom big delay={delay} duration={600} when={showProviders}>
          <div
            className="provider-col"
            onClick={() => handleProviderClick(provider)}
          >
            <Avatar
              alt=""
              sx={{ width: 80, height: 80 }}
              src={provider?.filename}
            ></Avatar>
            <p className="provider-name">
              {provider.firstname + " " + provider.lastname}
            </p>
          </div>
        </Slide>
      );
    });
    return providers;
  }, [FilterProvidersByService])

  useEffect(()=> {
    refresh()
  }, [businessId])

  const upcomingAppointments = useCallback(() => {
    let delay = 0;
    let filteredAppointments = customer?.appointments?.filter(app => app?.service?.business?.id == businessId)
    const appointments = filteredAppointments?.map((appointment, idx) => {
      delay += 200;
      let endHour = appointment.end_hour.split(" ")[0].split(":");
      let startHour = appointment.start_hour.split(" ")[0].split(":");
      let provider = appointment?.serviceProvider
      return (
        <Slide right big delay={delay} duration={900}>
          <div
            className="appointment-col"
            style={
              idx !== customer.appointments.length - 1 && {
                borderLeft: "1px solid lightgrey",
              }
            }
          >
            <Avatar
              alt=""
              sx={{ width: 80, height: 80 }}
              src={provider?.filename}
            ></Avatar>
            <p className="appointment-text">
              <b>{provider?.firstname + " " + provider?.lastname}</b>
            </p>
            <p className="appointment-text">{appointment.day}</p>
            <p className="appointment-text">
              שעות: {endHour[0] + ":" + endHour[1]}
              <ArrowForwardIcon sx={{ fontSize: "16px" }} />
              {startHour[0] + ":" + startHour[1]}
            </p>
            <p className="appointment-text">
              ל:{appointment.service.name}
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
  }, [customer?.appointments]);

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
          <h2> ברוך\ה הבא\ה {customer?.firstname}</h2>
          <p>
            ברוכים הבאים לפאנל ניהול התורים. כאן תוכלו לצפות בתורים שלכם, לבטל
            תורים במידת הצורך, ולהזמין תורים חדשים. על מנת לקבוע תור חדש, יש
            לבחור בשירות המבוקש בצד שמאל, ולאחר מכן בנותן השירות.
          </p>
          <div className="upcoming">
            <h4>תורים קרובים:</h4>
            <div className="upcoming-row">{upcomingAppointments()}</div>
          </div>
        </div>
        <Divider orientation="vertical" flexItem sx={{ height: "100%" }} />

        <div className="col service-providers-container">
          <h4> בחר שירות מבוקש:</h4>

          <div className="services-row">{Services}</div>
          <h4> בחר נותן שירות:</h4>

          <div className="providers-row">{ServiceProviders()}</div>
        </div>
      </div>
    </div>
  );
}
