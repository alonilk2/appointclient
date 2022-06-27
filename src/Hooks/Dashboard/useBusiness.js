import {useSelector } from "react-redux";
import { _fetchServices, _addServices, _removeServices, _updateServices } from "../../features/dashboardSlice";

export default function useBusiness() {
  const user = useSelector((state) => state.dashboard?.user);
  
  return user.business
}
