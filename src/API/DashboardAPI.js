import api from "../API/Client";

export async function fetchServiceProvidersList() {
  let response = await api.get("/serviceproviders");
  return response?.data;
}

export async function addServiceProvider(serviceProvider) {
  let response = await api.post("/serviceproviders", serviceProvider);
  return response?.data;
}

export async function updateServiceProvider(serviceProvider) {
  console.log(serviceProvider)
  let response = await api.put(
    "/serviceproviders/" + serviceProvider?.id,
    serviceProvider
  );
  return response?.data;
}

export async function removeServiceProvider(id) {
  let response = await api.delete("/serviceproviders/" + id);
  return response?.data;
}

export async function addServices(service) {
  let response = await api.post("/services", service);
  return response?.data;
}

export async function removeServices(id) {
  let response = await api.delete("/services/" + id);
  return response?.data;
}

export async function updateServices(service) {
  let response = await api.put("/services", service);
  return response?.data;
}
