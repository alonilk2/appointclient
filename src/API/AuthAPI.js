import { ErrorOutlined } from "@mui/icons-material";
import { ACCESS_TOKEN } from "../constants";
import api from "./Client";

export function getCurrentUser() {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }
  return api.get("/users/me")
}

export function login(loginRequest) {
  let response = api.post("/auth/login", JSON.stringify(loginRequest))  
  return response
}

export function recovery(recoveryRequest) {
  return api.post("/auth/recovery/", JSON.stringify(recoveryRequest))
}

export function changePassword(recoveryRequest) {
  return api.put("/auth/recovery/", JSON.stringify(recoveryRequest))
}

export function signup(signupRequest) {
  return api.post("/auth/signup", JSON.stringify(signupRequest))
}

export function createProviderUser(signupRequest) {
  return api.post("/auth/createProviderUser", JSON.stringify(signupRequest))
}

export function confirmEmail(confirmRequest) {
  return api.post("/auth/confirmemail", JSON.stringify(confirmRequest))
}

export function updateUser(user) {
  try {
    return api.put("/users/" + user.id, JSON.stringify(user))
  } catch (err) {
    console.log(ErrorOutlined);
  }
}

export function removeUser(user) {
  try {
    let str = JSON.stringify(user);
    return api.delete("/users/" + user.id, str)
  } catch (err) {
    console.log(ErrorOutlined);
  }
}

export function findUserByEmail(email) {
  try {
    return api.get("/users/" +email)
  } catch (err) {
    console.log(ErrorOutlined);
  }
}

export function validatePassword(user) {
  try {
    let str = JSON.stringify(user);
    return api.post("/users/validatepass", str)
  } catch (err) {
    console.log(ErrorOutlined);
  }
}

export function findRecoveryToken(token) {
  try {
    return api.get("/auth/recovery/" + token)
  } catch (err) {
    console.log(ErrorOutlined);
  }
}
