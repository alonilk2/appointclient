import { ACCESS_TOKEN } from "../constants";

export default function useAuth () {
    const userToken = localStorage.getItem(ACCESS_TOKEN);
    console.log(userToken)
    return userToken ? true : false;
}