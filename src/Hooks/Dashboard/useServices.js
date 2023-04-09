import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserContext from "../../components/Dashboard/UserContext";
import {
  _addServices,
  _removeServices,
  _updateServices,
} from "../../features/dashboardSlice";
import { uploadFile } from "../../API/FilesAPI";
import { isNullOrEmpty } from "../../common"
export default function useServices() {
  const servicesCustomer = useSelector(
    (state) => state?.user?.user?.business.services
  );
  const user = useContext(UserContext);
  const services = user?.business?.services;
  const dispatch = useDispatch();

  const uploadFileAndSetURL = async (service) => {
    if (!isNullOrEmpty(service?.file)) {
      const [uploadedFile] = await uploadFile({ file: service.file });
      service.img = uploadedFile?.fileUrl || null;
    }
  }

  const addServices = async (service) => {
    // Upload the file and set the image URL if there is a file to upload
    uploadFileAndSetURL(service)

    // Stringify the business gallery if it exists
    if (service.business.gallery) {
      service.business.gallery = JSON.stringify(service.business.gallery);
    }

    // Create copies of the business and user objects
    const tempBus = { ...service.business };
    const tempUser = { ...service.user };

    // Update the service, business, and user objects with the copied business object
    service.business = tempBus;
    tempUser.business = tempBus;
    service.user = tempUser;

    // Dispatch the action and return the response
    const response = dispatch(_addServices(service));
    return response;
  };

  const updateServices = (service) => {
    // Upload the file and set the image URL if there is a file to upload
    uploadFileAndSetURL(service)
  
    // Stringify the business gallery if it exists
    if (service.business.gallery) {
      service.business.gallery = JSON.stringify(service.business.gallery);
    }
  
    // Create copies of the business and user objects
    const tempBus = { ...service.business };
    const tempUser = { ...service.user };
  
    // Update the service, business, and user objects with the copied business object
    service.business = tempBus;
    tempUser.business = tempBus;
    service.user = tempUser;
  
    // Dispatch the action and return the response
    const response = dispatch(_updateServices(service));
    return response;
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
