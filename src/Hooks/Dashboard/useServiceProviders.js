import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { _addServiceProvider, _fetchServiceProviders, _removeServiceProvider } from "../../features/dashboardSlice";

export default function useServiceProviders() {
    const serviceProvidersList = useSelector(state => state.dashboard?.serviceProviders)
    const dispatch = useDispatch()

    const initialize = async () => {
        await dispatch(_fetchServiceProviders())
    }

    const addServiceProvider = async (provider) => {
        let response = await dispatch(_addServiceProvider(provider))
        return response;
    }

    const removeServiceProvider = async (id) => {
        let response = await dispatch(_removeServiceProvider(id))
        return response;
    }

    useEffect(()=>{
        initialize()
    },[])

    return {
        list: serviceProvidersList,
        add: addServiceProvider,
        remove: removeServiceProvider,
        refresh: initialize
    }
}