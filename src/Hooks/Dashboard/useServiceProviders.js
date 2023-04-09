import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  _addServiceProvider,
  _fetchServiceProviders,
  _removeServiceProvider,
  _updateServiceProvider,
} from "../../features/dashboardSlice";
import { uploadFile } from "../../API/FilesAPI";

export default function useServiceProviders() {
  const serviceProvidersList = useSelector(
    (state) => state.user.user?.business?.serviceProviders
  );
  const dispatch = useDispatch();

  const initialize = async () => {
    dispatch(_fetchServiceProviders());
  };

  const addServiceProvider = async (provider) => {
    // Upload the file and set the image URL
    const [fileName] = await uploadFile({ file: provider.file });
    provider.filename = fileName?.fileUrl || "";

    // Stringify the business gallery if it exists
    if (provider.business.gallery) {
      provider.business.gallery = JSON.stringify(provider.business.gallery);
    }

    // Create copies of the business and user objects
    const tempBus = { ...provider.business };
    const tempUser = { ...provider.user };

    // Update the provider, business, and user objects with the copied business object
    provider.business = tempBus;
    tempUser.business = tempBus;
    provider.user = tempUser;

    // Dispatch the action and return the response
    const response = dispatch(_addServiceProvider(provider));
    return response;
  };

  const updateServiceProvider = async (provider) => {
    // Upload the file and set the image URL if a file exists
    if (provider.file?.length > 0) {
      const [fileName] = await uploadFile({ file: provider.file });
      provider.filename = fileName?.fileUrl || "";
    }

    // Stringify the business gallery if it exists
    if (provider.business.gallery) {
      provider.business.gallery = JSON.stringify(provider.business.gallery);
    }

    // Create copies of the business and user objects
    const tempBus = { ...provider.business };
    const tempUser = { ...provider.user };

    // Update the provider, business, and user objects with the copied business object
    provider.business = tempBus;
    tempUser.business = tempBus;
    provider.user = tempUser;

    // Dispatch the action and return the response
    const response = dispatch(_updateServiceProvider(provider));
    return response;
  };

  const removeServiceProvider = (id) => {
    let response = dispatch(_removeServiceProvider(id));
    return response;
  };

  useEffect(() => {
    initialize();
  }, []);

  return {
    list: serviceProvidersList,
    add: addServiceProvider,
    remove: removeServiceProvider,
    refresh: initialize,
    update: updateServiceProvider,
  };
}
