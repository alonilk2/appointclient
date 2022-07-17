import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { _fetchCustomer } from "../features/customerSlice"


export default function useCustomer(phone) {
    const dispatch = useDispatch()
    const customer = useSelector(state => state.customer?.customer)
    
    // const update = async (customerObj) => {
    //     let response = await dispatch(_updateCustomer(customerObj))
    //     return response
    // }

    const initialize = () => {
        dispatch(_fetchCustomer(phone))
    }

    useEffect(()=> {
        if(!customer) initialize()
    }, [])

    return {
        customer: customer,
    }
}