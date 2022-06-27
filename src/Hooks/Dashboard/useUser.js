import {useSelector, useDispatch } from "react-redux";
import { _fetchServices, _addServices, _removeServices, _updateServices } from "../../features/dashboardSlice";
import { _updateUser } from "../../features/userSlice";
import { uploadFile } from "../../utils/FilesAPI";

export default function useUser() {
  const user = useSelector((state) => state.user?.user);
  const dispatch = useDispatch();

  const updateUser = async (user) => {
      if(user?.business?.img) {
        let fileName = await uploadFile({ file: user?.business?.img });
        user.business.img = fileName?.message
      }
      console.log(user)
      let response = await dispatch(_updateUser(user))
      return response
  }

  
  return {
    user: user,
    business: user?.business,
    update: updateUser
  }
}
