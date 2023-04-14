import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserContext from "../../components/Dashboard/UserContext";
import {
  _addServices,
  _removeServices,
  _updateServices,
} from "../../features/dashboardSlice";
import { uploadFile } from "../../API/FilesAPI";
import { isNullOrEmpty } from "../../common";

export default function useServices() {
  const servicesCustomer = useSelector(
    (state) => state?.user?.user?.business.services
  );
  const user = useContext(UserContext);
  const services = user?.business?.services;
  const dispatch = useDispatch();

  const uploadServiceImageAndSetURL = async (service) => {
    if (!isNullOrEmpty(service?.file)) {
      const [uploadedFile] = await uploadFile({ file: service.file });
      service.img = uploadedFile?.fileUrl || null;
    }
  };

  const StringifyBusinessGalleryIfExist = (service) => {
    if (service.business.gallery) {
      let businessCopy = { ...service.business };
      businessCopy.gallery = JSON.stringify(businessCopy.gallery);
      service.business = businessCopy;
    }
  };

  const addServices = (service) => {
    uploadServiceImageAndSetURL(service);
    StringifyBusinessGalleryIfExist(service);
    return dispatch(_addServices(service));
  };

  const updateServices = (service) => {
    uploadServiceImageAndSetURL(service);
    StringifyBusinessGalleryIfExist(service);
    return dispatch(_updateServices(service));
  };

  const refreshServices = async () => {
    user?.refresh();
  };

  const removeServices = async (id) => {
    let response = dispatch(_removeServices(id));
    return response;
  };

  return {
    list: services || servicesCustomer,
    add: addServices,
    remove: removeServices,
    update: updateServices,
    refresh: refreshServices,
  };
}
