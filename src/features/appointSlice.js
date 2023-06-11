import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addAppointment,
  fetchAppointment,
  fetchAppointmentsByMonth,
  fetchAppointmentsByService,
  fetchAppointmentsByServiceProviders,
  getAppsStatistics,
  removeAppointment
} from "../API/AppointAPI";

const initialState = {
  appoint: null,
  totalMonth: null,
  totalToday: null
};

export const _fetchAppointment = createAsyncThunk(
  "appoint/fetchappointment",
  async (id, thunkAPI) => {
    try {
      const response = await fetchAppointment(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

export const _getAppsStatistics = createAsyncThunk(
  "appoint/getAppsStatistics",
  async (businessId, thunkAPI) => {
    try {
      let day = new Date().toISOString().slice(0, 10)
      const response = await getAppsStatistics(day, businessId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

export const _fetchAppointmentsByMonth = createAsyncThunk(
  "appoint/fetchMonthAppointments",
  async (businessId, thunkAPI) => {
    try {
      let day = new Date().toISOString().slice(0, 10)
      const response = await fetchAppointmentsByMonth(day, businessId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

export const _fetchAppointmentsByServices = createAsyncThunk(
  "appoint/fetchServicesAppointments",
  async (businessId, thunkAPI) => {
    try {
      let day = new Date().toISOString().slice(0, 10)
      const response = await fetchAppointmentsByService(day, businessId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

export const _fetchAppointmentsByServiceProviders = createAsyncThunk(
  "appoint/fetchServiceProvidersAppointments",
  async (businessId, thunkAPI) => {
    try {
      let day = new Date().toISOString().slice(0, 10)
      const response = await fetchAppointmentsByServiceProviders(day, businessId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

export const _addAppointment = createAsyncThunk(
  "appoint/addappointment",
  async (appointment, thunkAPI) => {
    try {
      const response = await addAppointment(appointment);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

export const _removeAppointment = createAsyncThunk(
  "appoint/removeappointment",
  async (appointmentId, thunkAPI) => {
    try {
      const response = await removeAppointment(appointmentId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

export const appointSlice = createSlice({
  name: "appoint",
  initialState,
  reducers: {
    initappoint: (state, action) => {
      state.appoint = action.payload;
    },
  },
  extraReducers: {
    [_fetchAppointment.fulfilled]: (state, action) => {
      state.appoint = action.payload;
    },
    [_fetchAppointment.rejected]: (state, action) => {
      state.appoint = null;
    },
    [_getAppsStatistics.fulfilled]: (state, action) => {
      state.totalToday = action.payload['appsByDay'];
      state.totalMonth = action.payload['appsByMonthAndYear'];
      state.servicesCount = action.payload['appsByServicesAndMonth'];
      state.serviceProvidersCounts = action.payload['appsByServiceProviders'];
      state.totalMonthlyIncome = action.payload['appsTotalIncome'];
    },
    [_getAppsStatistics.rejected]: (state, action) => {
      state.totalToday = null;
      state.totalMonth = null
      state.servicesCount = null
      state.serviceProvidersCounts = null
      state.totalMonthlyIncome = 0;
    },
    [_fetchAppointmentsByMonth.fulfilled]: (state, action) => {
      state.totalMonth = action.payload;
    },
    [_fetchAppointmentsByMonth.rejected]: (state, action) => {
      state.totalMonth = null;
    },
    [_fetchAppointmentsByServices.fulfilled]: (state, action) => {
      state.servicesCount = action.payload;
    },
    [_fetchAppointmentsByServices.rejected]: (state, action) => {
      state.servicesCount = null;
    },
    [_fetchAppointmentsByServiceProviders.fulfilled]: (state, action) => {
      state.serviceProvidersCounts = action.payload;
    },
    [_fetchAppointmentsByServiceProviders.rejected]: (state, action) => {
      state.serviceProvidersCounts = null;
    },
  },
});

export const { initappoint } = appointSlice.actions;

export default appointSlice.reducer;
