import Axios from "axios";
import { API_BASE_URL } from "../constants";
import { ACCESS_TOKEN } from "../constants";

export async function uploadFile(request) {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }
  let formData = new FormData();
  console.log(request)
  formData.append("file", request?.file[0]);
  let response = await Axios.post(API_BASE_URL + "/api/files/upload", formData, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN),
      "Content-Type": "multipart/form-data",
    },
  });
  console.log(response)
  return response?.data;
}

export async function getFile(id) {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }
  let response = await Axios.get(API_BASE_URL + "/files/" + id, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN),
    },
  });
  return response?.data;
}
