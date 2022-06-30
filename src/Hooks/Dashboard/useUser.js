import {useSelector, useDispatch } from "react-redux";
import { _fetchServices, _addServices, _removeServices, _updateServices } from "../../features/dashboardSlice";
import { _updateUser } from "../../features/userSlice";
import { uploadFile } from "../../utils/FilesAPI";
import { _getCurrentUser } from "../../features/userSlice";
import { useEffect } from "react";

export default function useUser() {
  const user = useSelector((state) => state.user?.user);
  const dispatch = useDispatch();

  const updateUser = async (user) => {

      if(typeof(user?.business?.img) == "object") {
        console.log(user)

        let fileName = await uploadFile({ file: user?.business?.img });
        user.business.img = fileName?.message
      }
      if (typeof(user?.business?.headerImg) == "object") {
        console.log(user?.business)
        let fileName = await uploadFile({ file: user?.business?.headerImg });
        user.business.headerImg = fileName?.message
      }
      let response = await dispatch(_updateUser(user))
      return response
  }

  const getUserInstance = async () => {
    dispatch(_getCurrentUser());
  }
  
  return {
    user: user,
    business: user?.business,
    update: updateUser,
    refresh: getUserInstance
  }
}
