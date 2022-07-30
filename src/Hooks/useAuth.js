import { useEffect, useState } from "react";
import { ACCESS_TOKEN } from "../constants";
import { useSelector } from "react-redux";
export default function useAuth() {
  const [userToken, setUserToken] = useState();
  const user = useSelector(state=>state.user?.user);

  const Logout = () => {
    if (userToken) {
      localStorage.removeItem(ACCESS_TOKEN);
    }
  };

  useEffect(()=>{
    setUserToken(localStorage.getItem(ACCESS_TOKEN))
  },[])

  return {
    loggedIn: localStorage.getItem(ACCESS_TOKEN) ? true : false,
    logout: () => Logout(),
    // user: user
  };
}
