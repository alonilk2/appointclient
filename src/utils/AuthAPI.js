import { ErrorOutlined } from "@mui/icons-material";
import { API_BASE_URL, ACCESS_TOKEN } from "../constants";

const request = (options) => {
  const headers = new Headers({
    "Content-Type": "application/json",
  });

  if (localStorage.getItem(ACCESS_TOKEN)) {
    headers.append(
      "Authorization",
      "Bearer " + localStorage.getItem(ACCESS_TOKEN)
    );
  }

  const defaults = { headers: headers };
  options = Object.assign({}, defaults, options);

  return fetch(options.url, options).then((response) =>
    response.json().then((json) => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return json;
    })
  );
};

export function getCurrentUser() {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }

  return request({
    url: API_BASE_URL + "/users/me",
    method: "GET",
  });
}

export function login(loginRequest) {
  return request({
    url: API_BASE_URL + "/auth/login",
    method: "POST",
    body: JSON.stringify(loginRequest),
  });
}

export function signup(signupRequest) {
  return request({
    url: API_BASE_URL + "/auth/signup",
    method: "POST",
    body: JSON.stringify(signupRequest),
  });
}

export function createProviderUser(signupRequest) {
  return request({
    url: API_BASE_URL + "/auth/createProviderUser",
    method: "POST",
    body: JSON.stringify(signupRequest),
  });
}


export function confirmEmail(confirmRequest) {
  return request({
    url: API_BASE_URL + "/auth/confirmemail",
    method: "POST",
    body: JSON.stringify(confirmRequest),
  });
}

export function updateUser(user) {
  try {
    let str = JSON.stringify(user);
    return request({
      url: API_BASE_URL + "/users/" + user.id,
      method: "PUT",
      body: str,
    });
  } catch (err) {
    console.log(ErrorOutlined);
  }
}

export function removeUser(user) {
  try {
    let str = JSON.stringify(user);
    return request({
      url: API_BASE_URL + "/users/" + user.id,
      method: "DELETE",
      body: str,
    });
  } catch (err) {
    console.log(ErrorOutlined);
  }
}

export function findUserByEmail(email) {
  try {
    return request({
      url: API_BASE_URL + "/users/" + email,
      method: "GET",
    });
  } catch (err) {
    console.log(ErrorOutlined);
  }
}

