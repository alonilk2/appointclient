import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  _addServiceProvider,
  _fetchServiceProviders,
  _removeServiceProvider,
} from "../../features/dashboardSlice";
import { uploadFile } from "../../utils/FilesAPI";

export default function useServiceProviders() {
  const serviceProvidersList = useSelector(
    (state) => state.dashboard?.serviceProviders
  );
  const dispatch = useDispatch();

  const initialize = async () => {
    await dispatch(_fetchServiceProviders());
  };

  const addServiceProvider = async (provider) => {
    try{
        let fileName = await uploadFile({ file: provider.file });
        provider.filename = fileName?.message
        let response = await dispatch(_addServiceProvider(provider));
        return response;
    }catch(e){
        console.log(e)
    }

  };

  const removeServiceProvider = async (id) => {
    let response = await dispatch(_removeServiceProvider(id));
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
  };
}
