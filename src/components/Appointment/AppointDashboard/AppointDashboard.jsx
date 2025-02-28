/* eslint-disable react-hooks/exhaustive-deps */
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DeleteIcon from "@mui/icons-material/EventBusy";
import { Avatar, Divider } from "@mui/material";
import Button from "@mui/material/Button";
import { useEffect, useMemo } from "react";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import Slide from "react-reveal/Slide";
import { useNavigate, useParams } from "react-router-dom";
import { _removeAppointment } from "../../../features/appointSlice";
import useBusiness from "../../../hooks/useBusiness";
import useCustomer from "../../../hooks/useCustomer";
import Breadcrumb from "../../Breadcrumb";
import "./AppointDashboard.css";
import randomColor from "random-material-color";
import {
  BUSINESS_PAGE_TEXT,
  LOBBY_TEXT,
  WELCOME_TEXT,
  INTRO_TEXT,
  UPCOMING_MEETINGS_TEXT,
  CHOOSE_SERVICE_TEXT,
  CHOOSE_PROVIDER_TEXT,
  NEAR_APPOINTMENTS_NOT_FOUND,
  NO_SERVICE_PROVIDERS_FOUND,
} from "../../../constants/AppointConstants";

export default function AppointDashboard() {
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
        if (service.id === business?.services[clickedService - 1]?.id)
          filteredProviders.push(provider);
      });
    });
    return filteredProviders;
  };

  const handleCancelAppointment = async (appointment) => {
    let response = await dispatch(_removeAppointment(appointment.id));
    if (response?.type.endsWith("fulfilled")) {
      refresh();
    }
  };

  const Services = useMemo(
    () =>
      business?.services?.map((service, idx) => {
        return (
          <Button
            fullWidth
            variant="outlined"
            color="primary"
            size="large"
            onClick={() => handleClick(idx + 1)}
          >
            {service?.name}
          </Button>
        );
      }),
    [business?.services]
  );

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
    const providers = filteredProviders.map((provider) => {
      return (
        <Button fullWidth variant="outlined" onClick={() => handleProviderClick(provider)} sx={styles.buttons}>
          <Avatar alt="" sx={styles.avatar} src={provider?.filename} />
            {provider.firstname + " " + provider.lastname}
        </Button>
      );
    });
    if (providers?.length > 0) return providers;
    return <p>{NO_SERVICE_PROVIDERS_FOUND}</p>;
  }, [FilterProvidersByService]);

  useEffect(() => {
    refresh();
  }, [businessId]);

  const upcomingAppointments = useCallback(() => {
    let delay = 0;
    let filteredAppointments = customer?.appointments?.filter(
      (appointment) => appointment?.business?.id == businessId
    );
    const appointments = filteredAppointments?.map((appointment, idx) => {
      delay += 200;
      let endHour = appointment.end_hour.split(" ")[0].split(":");
      let startHour = appointment.start_hour.split(" ")[0].split(":");
      let provider = appointment?.serviceProvider;
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
            <p className="appointment-text">ל:{appointment.service.name}</p>
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
    if (appointments?.length > 0) return appointments;
    return <p>{NEAR_APPOINTMENTS_NOT_FOUND}</p>;
  }, [customer?.appointments]);

  return (
    <div className="appoint-dashboard-container">
      <div className="form-container" style={{ width: "100%" }}>
        <Breadcrumb
          pageArr={[
            {
              name: business?.name + BUSINESS_PAGE_TEXT,
              url: "/appoint/" + business?.id,
            },
            {
              name: LOBBY_TEXT,
            },
          ]}
          sx={{ position: "absolute", top: "3%", left: "3%" }}
        />
        <div className="col introduction">
          <img src={business?.img} alt="company logo" width={100} />
          <h5>{business?.name}</h5>
          <h2>
            {" "}
            {WELCOME_TEXT} {customer?.firstname}
          </h2>
          <p>{INTRO_TEXT}</p>
          <div className="upcoming-meetings">
            <h4>{UPCOMING_MEETINGS_TEXT}</h4>
            <div className="upcoming-row">{upcomingAppointments()}</div>
          </div>
        </div>
        <Divider orientation="vertical" flexItem sx={{ height: "100%" }} />
        <div className="col service-providers-container">
          <h4>{CHOOSE_SERVICE_TEXT}</h4>
          <div className="services-row">{Services}</div>
          <h4>{CHOOSE_PROVIDER_TEXT}</h4>
          <div className="providers-row">{ServiceProviders()}</div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  avatar: { width: 40, height: 40 },
  buttons: { gap: "0.5rem"}
};
