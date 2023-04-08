import Axios from "axios";
import { API_BASE_URL } from "../constants";
import { ACCESS_TOKEN } from "../constants";

export async function fetchServiceProvidersList() {
  let response = await Axios.get("/serviceproviders");
  return response?.data;
}

export async function addServiceProvider(serviceProvider) {
  let response = await Axios.post("/serviceproviders", serviceProvider);
  return response?.data;
}

export async function updateServiceProvider(serviceProvider) {
  let response = await Axios.put(
    "/serviceproviders/" + serviceProvider?.id,
    serviceProvider
  );
  return response?.data;
}

export async function removeServiceProvider(id) {
  let response = await Axios.delete("/serviceproviders/" + id);
  return response?.data;
}

export async function addServices(service) {
  let response = await Axios.post("/services", service);
  return response?.data;
}

export async function removeServices(id) {
  let response = await Axios.delete("/services/" + id);
  return response?.data;
}

export async function updateServices(service) {
  let response = await Axios.put("/services", service);
  return response?.data;
}
