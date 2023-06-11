import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  login,
  signup,
  getCurrentUser,
  confirmEmail,
  updateUser,
  removeUser,
  findUserByEmail,
  createProviderUser,
  recovery,
  findRecoveryToken,
  changePassword,
  validatePassword,
} from "../API/AuthAPI";


const sortWorkdaysArray = (arr) => {
  if (!arr) return;
  let sortedArr = []
  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (arr[j].day === i) {
        sortedArr.push(arr[j])
      }
    }
  }
  return sortedArr;
}

const initialState = {
  loggedIn: false,
  user: null,
};

export const _confirmEmail = createAsyncThunk(
  "user/confirmemail",
  async (confirmRequest, thunkAPI) => {
    try {
      const response = await confirmEmail(confirmRequest);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const _login = createAsyncThunk(
  "user/login",
  async (loginRequest, thunkAPI) => {
    try {
      const response = await login(loginRequest);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const _recovery = createAsyncThunk(
  "user/recovery",
  async (recoveryRequest, thunkAPI) => {
    try {
      const response = await recovery(recoveryRequest);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const _changePassword = createAsyncThunk(
  "user/recovery/changePassword",
  async (recoveryRequest, thunkAPI) => {
    try {
      const response = await changePassword(recoveryRequest);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const _signup = createAsyncThunk(
  "user/signup",
  async (signupRequest, thunkAPI) => {
    try {
      const response = await signup(signupRequest);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const _createProviderUser = createAsyncThunk(
  "user/signupprovider",
  async (signupRequest, thunkAPI) => {
    try {
      const response = await createProviderUser(signupRequest);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const _updateUser = createAsyncThunk(
  "user/update",
  async (user, { rejectWithValue }) => {
    try {
      let updatedUser = { ...user, business: {...user.business} };
      
      if (updatedUser.business?.gallery) {
        updatedUser.business.gallery = JSON.stringify(updatedUser.business.gallery);
      }
      const response = await updateUser(updatedUser);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const _removeUser = createAsyncThunk(
  "user/remove",
  async (user, thunkAPI) => {
    try {
      const response = await removeUser(user);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const _blockUser = createAsyncThunk(
  "user/block",
  async (phone, thunkAPI) => {
    try {
      const response = await _blockUser(phone);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const _findUserByEmail = createAsyncThunk(
  "user/findbymail",
  async (user, thunkAPI) => {
    try {
      const response = await findUserByEmail(user);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const _validatePassword = createAsyncThunk(
  "user/validatePass",
  async (user, thunkAPI) => {
    try {
      let tempBus = { ...user.business }
      tempBus.gallery = user.business?.gallery && JSON.stringify(user.business?.gallery);
      user.business = tempBus
      const response = await validatePassword(user);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const _findRecoveryToken = createAsyncThunk(
  "user/findRecoveryToken",
  async (token, thunkAPI) => {
    try {
      const response = await findRecoveryToken(token);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
)

export const _getCurrentUser = createAsyncThunk(
  "user/getcurrentuser",
  async (thunkAPI) => {
    try {
      let response = await getCurrentUser();
      let data = response?.data;
      if (data?.business?.workdays) {
        data.business.workdays = sortWorkdaysArray(data.business.workdays)
      }
      if (data?.business?.gallery) data.business.gallery = JSON.parse(data.business.gallery)
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: {
    [_login.fulfilled]: (state, action) => {
      state.loggedIn = true;
      state.user = action.payload.data;
    },
    [_login.rejected]: (state, action) => {
      state.loggedIn = false;
      state.user = null;
    },
    [_findRecoveryToken.fulfilled]: (state, action) => {
      state.recovery = action.payload;
    },
    [_findRecoveryToken.rejected]: (state, action) => {
      state.recovery = false;
    },
    [_getCurrentUser.fulfilled]: (state, action) => {
      state.loggedIn = true;
      state.user = action.payload;
    },
    [_getCurrentUser.rejected]: (state, action) => {
      state.user = false;
    },
  },
});

export default userSlice.reducer;
