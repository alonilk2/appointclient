import Axios from "axios";
import { API_BASE_URL } from "../constants";
import { ACCESS_TOKEN } from "../constants";

export async function fetchServiceProvidersList() {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }
  let response = await Axios.get(API_BASE_URL + "/serviceproviders", {
    headers: { Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN) },
  });
  return response?.data;
}

export async function addServiceProvider(serviceProvider) {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }
  let response = await Axios.post(
    API_BASE_URL + "/serviceproviders",
    serviceProvider,
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN),
      },
    }
  );
  return response?.data;
}

export async function updateServiceProvider(serviceProvider) {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }
  let response = await Axios.put(
    API_BASE_URL + "/serviceproviders/"+serviceProvider?.id,
    serviceProvider,
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN),
      },
    }
  );
  return response?.data;
}

export async function removeServiceProvider(id) {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }
  let response = await Axios.delete(API_BASE_URL + "/serviceproviders/" + id, {
    headers: { Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN) },
  });
  return response?.data;
}

export async function addServices(service) {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }
  let response = await Axios.post(
    API_BASE_URL + "/services",
    service,
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN),
      },
    }
  );
  return response?.data;
}

export async function removeServices(id) {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }
  let response = await Axios.delete(API_BASE_URL + "/services/" + id, {
    headers: { Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN) },
  });
  return response?.data;
}

export async function updateServices(service) {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }
  let response = await Axios.put(
    API_BASE_URL + "/services",
    service,
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN),
      },
    }
  );
  return response?.data;
}