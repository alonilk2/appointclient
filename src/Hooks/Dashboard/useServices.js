import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { _fetchServices, _addServices, _removeServices, _updateServices } from "../../features/dashboardSlice";

export default function useServices() {
  const services = useSelector((state) => state.dashboard.services);
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

  const initialize = async () => {
    await dispatch(_fetchServices());
  };

  useEffect(() => {
    initialize();
  }, []);

  return {
    list: services,
    add: addServices,
    remove: removeServices,
    refresh: initialize,
    update: updateServices
  };
}
