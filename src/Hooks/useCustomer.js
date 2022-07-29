import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { _fetchCustomer } from "../features/customerSlice";

export default function useCustomer(phone) {
  const dispatch = useDispatch();
  const customer = useSelector((state) => state.customer?.customer);
  const navigate = useNavigate();
  // const update = async (customerObj) => {
  //     let response = await dispatch(_updateCustomer(customerObj))
  //     return response
  // }

  const initialize = async () => {
    let response = await dispatch(_fetchCustomer(phone));
    if (response?.type.endsWith("rejected")) {
      return navigate("/");
    }
  };

  useEffect(() => {
    if (!customer) initialize();
  }, []);

  return {
    customer: customer,
    refresh: initialize
  };
}
