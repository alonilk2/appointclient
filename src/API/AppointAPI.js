import api from "../API/Client";

export async function fetchAppointment(id) {
  let response = await api.get("/appoint/id/" + id);
  return response?.data;
}

export async function fetchAppointmentsByDate(day, businessId) {
  let response = await api.get("/appoint/day/" + day + "/" + businessId);
  return response?.data;
}

export async function fetchAppointmentsByMonth(day, businessId) {
  let response = await api.get("/appoint/month/" + day + "/" + businessId);
  return response?.data;
}

export async function fetchAppointmentsByService(day, businessId) {
  let response = await api.get("/appoint/services/" + day + "/" + businessId);
  return response?.data;
}

export async function fetchAppointmentsByServiceProviders(day, businessId) {
  let response = await api.get("/appoint/serviceProviders/" + day + "/" + businessId);
  return response?.data;
}

export async function addAppointment(appointment) {
  let response = await api.post(
    "/appoint",
    appointment);
  return response?.data;
}

export async function removeAppointment(id) {
  let response = await api.delete("/appoint/" + id);
  return response?.data;
}
