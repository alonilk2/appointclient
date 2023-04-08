import api from "../API/Client";

export async function fetchCustomer(phone) {
  let response = await api.get("/customers/phone/" + phone);
  return response?.data;
}

export async function addCustomer(Customer) {
  let response = await api.post("/customers", Customer);
  return response?.data;
}

export async function removeCustomer(id) {
  let response = await api.delete("/customers/" + id);
  return response?.data;
}
