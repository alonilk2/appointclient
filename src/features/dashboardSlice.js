import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addServiceProvider, fetchServiceProvidersList, removeServiceProvider } from "../utils/DashboardAPI";
const initialState = {
  selectedTabIndex: 0,
  serviceProviders: null,
  services: null
};

export const _fetchServiceProviders = createAsyncThunk(
  "dashboard/fetchServiceProviders",
  async (thunkAPI) => {
    try {
      const response = await fetchServiceProvidersList();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

export const _addServiceProvider = createAsyncThunk(
  "dashboard/addServiceProvider",
  async (provider, thunkAPI) => {
    try {
      const response = await addServiceProvider(provider);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

export const _removeServiceProvider = createAsyncThunk(
  "dashboard/removeServiceProvider",
  async (id, thunkAPI) => {
    try {
      const response = await removeServiceProvider(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    selectTab: (state, action) => {
      state.selectedTabIndex = action.payload;
    },
  },
  extraReducers: {
    [_fetchServiceProviders.fulfilled]: (state, action) => {
      state.serviceProviders = action.payload
    },
    [_fetchServiceProviders.rejected]: (state, action) => {
      state.serviceProviders = null
    },
    [_addServiceProvider.fulfilled]: (state, action) => {
    },
    [_addServiceProvider.rejected]: (state, action) => {
    },
    [_removeServiceProvider.fulfilled]: (state, action) => {
    },
    [_removeServiceProvider.rejected]: (state, action) => {
    }
  }
});

export const { selectTab } = dashboardSlice.actions;

export default dashboardSlice.reducer;
