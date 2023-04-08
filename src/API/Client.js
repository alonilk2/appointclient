import axios from "axios";
import { ACCESS_TOKEN, API_BASE_URL } from "../constants";
const instance = axios.create({
    baseURL: API_BASE_URL
  });
instance.defaults.headers.post['Content-Type'] = "application/json";
instance.defaults.headers.put['Content-Type'] = "application/json";
let token = localStorage.getItem(ACCESS_TOKEN);
if(token) {
  instance.defaults.headers.common['Authorization'] = "Bearer " + token;
} 
export default instance;