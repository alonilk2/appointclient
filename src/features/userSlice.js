import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  login,
  signup,
  getCurrentUser,
  confirmEmail,
  updateUser,
} from "../utils/AuthAPI";

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
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue();
    }
  }
);

export const _updateUser = createAsyncThunk(
  "user/signup",
  async (user, thunkAPI) => {
    try {
      const response = await updateUser(user);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue();
    }
  }
);

export const _getCurrentUser = createAsyncThunk(
  "user/getcurrentuser",
  async (thunkAPI) => {
    try {
      const response = await getCurrentUser();
      return response;
    } catch (error) {
      console.log(error);
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
    [_updateUser.fulfilled]: (state, action) => {
      state.user = action.payload;
    },
    [_updateUser.rejected]: (state, action) => {
    },
    // [logout.fulfilled]: (state, action) => {
    //     state.isLoggedIn = false;
    //     state.user = null;
    //   },
  },
});

export default userSlice.reducer;
