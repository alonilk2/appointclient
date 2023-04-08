import api from "../API/Client"

export async function fetchBusinessDetails(id) {
  let response = await api.get("/business/" + id);
  return response?.data;
}

export async function updateBusiness(obj) {
  let response = await api.put("/business/" + obj.id, obj);
  return response?.data;
}

export async function fetchTotalMonthlyIncome(id) {
  let response = await api.get("/business/totalincome/" + id);
  return response?.data;
}