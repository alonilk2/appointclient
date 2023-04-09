import { useSelector, useDispatch } from "react-redux";
import {
  _removeUser,
  _updateUser,
  _findUserByEmail,
} from "../../features/userSlice";
import { uploadFile } from "../../API/FilesAPI";
import { _getCurrentUser } from "../../features/userSlice";
import { useEffect } from "react";
import { ACCESS_TOKEN } from "../../constants";
import api from "../../API/Client";
import { isNullOrEmpty } from "../../common";

export default function useUser() {
  const user = useSelector((state) => state.user?.user);
  const dispatch = useDispatch();

  const updateUser = async (user) => {
    const { business } = user;
    // If new image added for landing page
    if (!isNullOrEmpty(business?.newfile)) {
      const gallery = business?.gallery || Array(3);
      const [fileName] = await uploadFile({ file: business.newfile });
      gallery[business?.element] = fileName?.fileUrl;
      business.gallery = gallery;
      
      // If logo is changed
    } else if (!isNullOrEmpty(business?.img)) {
      const [fileName] = await uploadFile({ file: business.img });
      business.img = fileName?.fileUrl;

      // If landing page header is changed
    } else if (!isNullOrEmpty(business?.headerImg)) {
      const [fileName] = await uploadFile({ file: business.headerImg });
      business.headerImg = fileName?.fileUrl;
    }

    user.business = business;
    const response = dispatch(_updateUser(user));
    return response;
  };

  const remove = async (user) => {
    let response = await dispatch(_removeUser(user));
    return response;
  };

  const findUserByEmail = async (email) => {
    let response = await dispatch(_findUserByEmail(email));
    return response.payload;
  };

  const fetchUserInstance = () => {
    let token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      api.defaults.headers.common["Authorization"] = "Bearer " + token;
      dispatch(_getCurrentUser());
    }
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
