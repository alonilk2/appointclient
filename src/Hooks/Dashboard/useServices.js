import { useDispatch, useSelector} from "react-redux";
import {
  _addServices,
  _removeServices,
  _updateServices,
} from "../../features/dashboardSlice";
import { uploadFile } from "../../utils/FilesAPI";
import UserContext from "../../components/Dashboard/UserContext";
import { useContext } from 'react'
export default function useServices() {
  const servicesCustomer = useSelector((state) => state?.business?.services);
  const user = useContext(UserContext)
  const services = user?.business?.services;
  const dispatch = useDispatch();

  const addServices = async (service) => {
    try {
      console.log(service);
      let fileName =
        service?.file && (await uploadFile({ file: service.file }));
      service.img = fileName?.message;
      let response = await dispatch(_addServices(service));
      return response;
    } catch (e) {
      console.log(e);
    }
  };

  const updateServices = async (service) => {
    try {
      let fileName =
        service?.file && (await uploadFile({ file: service.file }));
      service.img = fileName?.message;
      let response = await dispatch(_updateServices(service));
      return response;
    } catch (e) {
      console.log(e);
    }
  };

  const refreshServices = async () => {
    user?.refresh();
  }

  const removeServices = async (id) => {
    let response = await dispatch(_removeServices(id));
    return response;
  };

  return {
    list: services || servicesCustomer,
    add: addServices,
    remove: removeServices,
    update: updateServices,
    refresh: refreshServices
  };
}
