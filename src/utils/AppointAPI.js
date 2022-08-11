import Axios from "axios";
import { API_BASE_URL } from "../constants";
import { ACCESS_TOKEN } from "../constants";

export async function fetchAppointment(id) {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }
  let response = await Axios.get(API_BASE_URL + "/appoint/id/" + id, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN),
    },
  });
  return response?.data;
}

export async function fetchAppointmentsByDate(day, businessId) {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }
  let response = await Axios.get(API_BASE_URL + "/appoint/day/" + day + "/" + businessId, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN),
    },
  });
  return response?.data;
}

export async function fetchAppointmentsByMonth(day, businessId) {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }
  let response = await Axios.get(API_BASE_URL + "/appoint/month/" + day + "/" + businessId, {
  headers: {
      Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN),
    },
  });
  return response?.data;
}

export async function fetchAppointmentsByService(day, businessId) {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }
  let response = await Axios.get(API_BASE_URL + "/appoint/services/" + day + "/" + businessId, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN),
    },
  });
  return response?.data;
}

export async function fetchAppointmentsByServiceProviders(day, businessId) {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }
  let response = await Axios.get(API_BASE_URL + "/appoint/serviceProviders/" + day + "/" + businessId, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN),
    },
  });
  return response?.data;
}

export async function addAppointment(appointment) {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }
  let response = await Axios.post(
    API_BASE_URL + "/appoint",
    appointment,
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN),
      },
    }
  );
  return response?.data;
}

export async function removeAppointment(id) {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }
  let response = await Axios.delete(API_BASE_URL + "/appoint/" + id, {
    headers: { Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN) },
  });
  return response?.data;
}
