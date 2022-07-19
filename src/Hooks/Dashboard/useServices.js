import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { _fetchServices, _addServices, _removeServices, _updateServices } from "../../features/dashboardSlice";

export default function useServices(user) {
  const services = useSelector((state) => user?.business?.services);
  const servicesCustomer = useSelector((state) => state?.business?.services);

  const dispatch = useDispatch();

  const addServices = async (service) => {
    try {
      let response = await dispatch(_addServices(service));
      return response;
    } catch (e) {
      console.log(e);
    }
  };

  const updateServices = async (service) => {
    try {
      let response = await dispatch(_updateServices(service));
      return response;
    } catch (e) {
      console.log(e);
    }
  };

  const removeServices = async (id) => {
    let response = await dispatch(_removeServices(id));
    return response;
  };

  // const initialize = async () => {
  //   user?.refresh()
  // };

  // useEffect(() => {
  //   initialize();
  // }, []);
  console.log(services)
  return {
    list: services || servicesCustomer,
    add: addServices,
    remove: removeServices,
    // refresh: initialize,
    update: updateServices
  };
}
