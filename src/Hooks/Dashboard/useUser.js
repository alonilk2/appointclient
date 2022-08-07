import { useSelector, useDispatch } from "react-redux";

import {
  _removeUser,
  _updateUser,
  _findUserByEmail,
} from "../../features/userSlice";
import { uploadFile } from "../../utils/FilesAPI";
import { _getCurrentUser } from "../../features/userSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useUser() {
  const user = useSelector((state) => state.user?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateUser = async (_user) => {
    try {
      let newUser = _user
      if (
        newUser?.business?.newfile &&
        typeof newUser?.business?.newfile === "object"
      ) {
        let gallery = _user.business?.gallery ? [..._user.business?.gallery] : [null, null, null];
        let fileName = await uploadFile({ file: newUser?.business?.newfile });
        gallery[newUser?.business?.element] =
          fileName[0]?.fileUrl;
        newUser.business.gallery = gallery;
      } else if (
        newUser?.business?.img &&
        typeof newUser?.business?.img === "object"
      ) {
        let fileName = await uploadFile({ file: newUser?.business?.img });
        newUser.business.img = fileName[0]?.fileUrl;
      } else if (
        newUser?.business?.headerImg &&
        typeof newUser?.business?.headerImg === "object"
      ) {
        let fileName = await uploadFile({ file: newUser?.business?.headerImg });
        newUser.business.headerImg = fileName[0]?.fileUrl;
      }

      let response = await dispatch(_updateUser(newUser));
      return response;
    } catch (e) {
      console.log(e);
    }
  };

  const remove = async (user) => {
    let response = await dispatch(_removeUser(user));
    return response;
  };

  const findUserByEmail = async (email) => {
    let response = await dispatch(_findUserByEmail(email));
    return response.payload;
  };

  const fetchUserInstance = async () => {
    let response = await dispatch(_getCurrentUser());
  };

  useEffect(() => {
    fetchUserInstance();
  }, []);

  return {
    user: user,
    business: user?.business,
    update: updateUser,
    refresh: fetchUserInstance,
    remove: remove,
    findUserByEmail: findUserByEmail,
  };
}
