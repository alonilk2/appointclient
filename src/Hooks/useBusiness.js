import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { _fetchBusinessDetails } from "../features/businessSlice"


export default function useBusiness(businessId) {
    const dispatch = useDispatch()
    const business = useSelector(state => state.business?.business)
    
    const initialize = () => {
        console.log(businessId)
        dispatch(_fetchBusinessDetails(businessId))
    }

    useEffect(()=>{
        initialize()   
    }, [])

    return business
}