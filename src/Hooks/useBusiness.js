import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { _fetchBusinessDetails, _updateBusiness } from "../features/businessSlice"

export default function useBusiness(businessId) {
    const dispatch = useDispatch()
    const business = useSelector(state => state.user?.user?.business)
    const secBusiness = useSelector(state => state?.business?.business)
    
    const update = async (businessObj) => {
        let response = await dispatch(_updateBusiness(businessObj))
        return response
    }

    const initialize = () => {
        dispatch(_fetchBusinessDetails(businessId))
    }

    useEffect(()=> {
        initialize()
    },[])

    return {
        business: business || secBusiness,
        update: update,
        refresh: initialize
    }
}