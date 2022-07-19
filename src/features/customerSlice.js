import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addCustomer,
  fetchCustomer,
  removeCustomer,
} from "../utils/CustomerAPI";

const initialState = {
  customer: null,
};

export const _fetchCustomer = createAsyncThunk(
  "customer/fetchCustomer",
  async (phone, thunkAPI) => {
    try {
      const response = await fetchCustomer(phone);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

export const _addCustomer = createAsyncThunk(
  "customer/addCustomer",
  async (provider, thunkAPI) => {
    try {
      const response = await addCustomer(provider);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

export const _removeCustomer = createAsyncThunk(
  "customer/removeCustomer",
  async (id, thunkAPI) => {
    try {
      const response = await removeCustomer(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    initCustomer: (state, action) => {
      state.customer = action.payload;
    },
  },
  extraReducers: {
    [_fetchCustomer.fulfilled]: (state, action) => {
      state.customer = action.payload;
    },
    [_fetchCustomer.rejected]: (state, action) => {
    },
    [_addCustomer.fulfilled]: (state, action) => {},
    [_addCustomer.rejected]: (state, action) => {},
    [_removeCustomer.fulfilled]: (state, action) => {},
    [_removeCustomer.rejected]: (state, action) => {},
  },
});

export const { initCustomer } = customerSlice.actions;

export default customerSlice.reducer;
