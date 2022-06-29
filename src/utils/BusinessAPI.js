import Axios from "axios";
import { API_BASE_URL } from "../constants";
import { ACCESS_TOKEN } from "../constants";

export async function fetchBusinessDetails(id) {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }
  let response = await Axios.get(API_BASE_URL + "/business/" + id, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN),
    },
  });
  return response?.data;
}
