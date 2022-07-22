import { useSelector, useDispatch } from "react-redux";

import { _removeUser, _updateUser, _findUserByEmail } from "../../features/userSlice";
import { uploadFile } from "../../utils/FilesAPI";
import { _getCurrentUser } from "../../features/userSlice";
import { useEffect } from "react";

export default function useUser() {
  const user = useSelector((state) => state.user?.user);
  const dispatch = useDispatch();

  const updateUser = async (user) => {
    if (typeof user?.business?.img == "object") {
      let fileName = await uploadFile({ file: user?.business?.img });
      user.business.img = fileName?.message;
    }
    if (typeof user?.business?.headerImg == "object") {
      console.log(user?.business);
      let fileName = await uploadFile({ file: user?.business?.headerImg });
      user.business.headerImg = fileName?.message;
    }
    let response = await dispatch(_updateUser(user));
    return response;
  };

  const remove = async (user) => {
    console.log(user)
    let response = await dispatch(_removeUser(user));
    return response;
  };

  const findUserByEmail = async (email) => {
    let response = await dispatch(_findUserByEmail(email));
    return response;
  }

  const getUserInstance = async () => {
    dispatch(_getCurrentUser());
  };

  useEffect(()=> {
    getUserInstance()
  }, [])

  return {
    user: user,
    business: user?.business,
    update: updateUser,
    refresh: getUserInstance,
    remove: remove,
    findUserByEmail: findUserByEmail
  };
}
