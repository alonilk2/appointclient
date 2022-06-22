import { useState } from "react";
import { ACCESS_TOKEN } from "../constants";

export default function useAuth() {
  const [userToken, setUserToken] = useState(localStorage.getItem(ACCESS_TOKEN));

  const Logout = () => {
    if (userToken) {
      localStorage.removeItem(ACCESS_TOKEN);
    }
  };

  return {
    loggedIn: userToken ? true : false,
    logout: () => Logout(),
  };
}
