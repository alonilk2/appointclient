import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addServiceProvider,
  fetchServiceProvidersList,
  removeServiceProvider,
  addServices,
  removeServices,
  updateServices,
  updateServiceProvider
} from "../utils/DashboardAPI";

const initialState = {
  selectedTabIndex: 2,
  serviceProviders: null,
  services: null,
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
      console.log(error)
      return thunkAPI.rejectWithValue();
    }
  }
);

export const _updateServiceProvider = createAsyncThunk(
  "dashboard/updateServiceProvider",
  async (provider, thunkAPI) => {
    try {
      let tempBus = {...provider.business}
      let tempUser = {...provider.user}
      tempBus.gallery = provider.business?.gallery && JSON.stringify(provider.business?.gallery);
      tempUser.business = tempBus;
      provider.business = tempBus;
      provider.user = tempUser
      const response = await updateServiceProvider(provider);
      return response;
    } catch (error) {
      console.log(error)
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

export const _addServices = createAsyncThunk(
  "dashboard/addServices",
  async (service, thunkAPI) => {
    try {
      const response = await addServices(service);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

export const _removeServices = createAsyncThunk(
  "dashboard/removeServices",
  async (id, thunkAPI) => {
    try {
      const response = await removeServices(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

export const _updateServices = createAsyncThunk(
  "dashboard/updateServices",
  async (service, thunkAPI) => {
    try {
      const response = await updateServices(service);
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
      state.serviceProviders = action.payload;
    },
    [_fetchServiceProviders.rejected]: (state, action) => {
      state.serviceProviders = null;
    },
    [_addServiceProvider.fulfilled]: (state, action) => {},
    [_addServiceProvider.rejected]: (state, action) => {},
    [_removeServiceProvider.fulfilled]: (state, action) => {},
    [_removeServiceProvider.rejected]: (state, action) => {},
    [_addServices.fulfilled]: (state, action) => {},
    [_addServices.rejected]: (state, action) => {},
    [_removeServices.fulfilled]: (state, action) => {},
    [_removeServices.rejected]: (state, action) => {},
  },
});

export const { selectTab } = dashboardSlice.actions;

export default dashboardSlice.reducer;
