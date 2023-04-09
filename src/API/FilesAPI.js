import api from "../API/Client";

export async function uploadFile(request) {
  try {
    let formData = new FormData();
    formData.append("file", request?.file[0]);
    let response = await api.post("/api/files/upload", formData);
    return response?.data;
  } catch (error) {
    
  }
}

export async function getFile(id) {
  let response = await api.get("/files/" + id);
  return response?.data;
}
