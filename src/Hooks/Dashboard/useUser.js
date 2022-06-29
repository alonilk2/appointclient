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
      if(user?.business?.img) {
        let fileName = await uploadFile({ file: user?.business?.img });
        user.business.img = fileName?.message
      }
      let response = await dispatch(_updateUser(user))
      return response
  }

  const getUserInstance = async () => {
    dispatch(_getCurrentUser());
  }

  useEffect(() => {
    console.log(user)

  }, [user])
  
  return {
    user: user,
    business: user?.business,
    update: updateUser,
    refresh: getUserInstance
  }
}
