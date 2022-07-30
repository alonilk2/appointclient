import { useSelector, useDispatch } from "react-redux";

import { _removeUser, _updateUser, _findUserByEmail } from "../../features/userSlice";
import { uploadFile } from "../../utils/FilesAPI";
import { _getCurrentUser } from "../../features/userSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useUser() {
  const user = useSelector((state) => state.user?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let gallery = user?.business?.gallery ? JSON.parse(user?.business?.gallery) : { images: [] };

  const updateUser = async (_user) => {
    console.log(_user)
    if (_user?.business?.gallery && typeof _user?.business?.gallery === 'object') {
      let fileName = await uploadFile({ file: _user?.business?.gallery });
      gallery.images[_user?.business?.element] = fileName?.message
      _user.business.gallery = JSON.stringify(gallery);
    }
    else if (_user?.business?.img && typeof _user?.business?.img === 'object') {
      let fileName = await uploadFile({ file: _user?.business?.img });
      _user.business.img = fileName?.message;
    }
    else if (_user?.business?.headerImg && typeof _user?.business?.headerImg === 'object') {
      let fileName = await uploadFile({ file: _user?.business?.headerImg });
      _user.business.headerImg = fileName?.message;
    }

    let response = await dispatch(_updateUser(_user));
    return response;
  };

  const remove = async (user) => {
    let response = await dispatch(_removeUser(user));
    return response;
  };

  const findUserByEmail = async (email) => {
    let response = await dispatch(_findUserByEmail(email));
    return response.payload
  }

  const fetchUserInstance = async () => {
    let response = await dispatch(_getCurrentUser());
    if(response.type.endsWith("rejected")){
      navigate('/')
    }
  };

  useEffect(() => {
    fetchUserInstance()
  }, [])

  return {
    user: user,
    business: user?.business,
    update: updateUser,
    refresh: fetchUserInstance,
    remove: remove,
    findUserByEmail: findUserByEmail
  };
}
