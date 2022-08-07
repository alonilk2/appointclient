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
} from "../utils/AuthAPI";

const sortWorkdaysArray = (arr) => {
  if(!arr) return;
  let sortedArr = []
  for(let i=0; i<7; i++){
      for(let j=0; j<arr.length; j++){
          if(arr[j].day === i){
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
    console.log(confirmRequest);
    try {
      const response = await confirmEmail(confirmRequest);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue();
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
      return thunkAPI.rejectWithValue();
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
      console.log(error);
      return thunkAPI.rejectWithValue();
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
      return thunkAPI.rejectWithValue();
    }
  }
);


export const _updateUser = createAsyncThunk(
  "user/update",
  async (user, thunkAPI) => {
    try {
      let tempBus = {...user.business}
      tempBus.gallery = user.business?.gallery && JSON.stringify(user.business?.gallery);
      user.business = tempBus
      const response = await updateUser(user);
      return response;
    } catch (error) {
      console.log(error)
      if(error !== "SyntaxError: Unexpected end of JSON input") return thunkAPI.rejectWithValue();
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
      if(error !== "SyntaxError: Unexpected end of JSON input") return thunkAPI.rejectWithValue();
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
      if(error !== "SyntaxError: Unexpected end of JSON input") return thunkAPI.rejectWithValue();
    }
  }
);


export const _getCurrentUser = createAsyncThunk(
  "user/getcurrentuser",
  async (thunkAPI) => {
    try {
      let response = await getCurrentUser();
      if(response?.business?.workdays){
        response.business.workdays = sortWorkdaysArray(response.business.workdays)
      }
      if(response?.business?.gallery) response.business.gallery = JSON.parse(response?.business?.gallery)
      return response;
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue();
    }
  }
);

//   const logout = createAsyncThunk("user/logout", async (logoutRequest, thunkAPI) => {
//     try {
//       const response = await APIUtils.logout(signupRequest);
//       return response.data;
//     } catch (error) {
//       console.log(error);
//       return thunkAPI.rejectWithValue();
//     }
//   });
export const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: {
    [_login.fulfilled]: (state, action) => {
      state.loggedIn = true;
      state.user = action.payload;
    },
    [_login.rejected]: (state, action) => {
      state.loggedIn = false;
      state.user = null;
    },
    [_signup.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
    },
    [_signup.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
    [_getCurrentUser.fulfilled]: (state, action) => {
      state.loggedIn = true;
      state.user = action.payload;
    },
    [_getCurrentUser.rejected]: (state, action) => {
      state.user = null;
    },

    // [logout.fulfilled]: (state, action) => {
    //     state.isLoggedIn = false;
    //     state.user = null;
    //   },
  },
});

export default userSlice.reducer;
