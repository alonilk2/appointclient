import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addAppointment,
  fetchAppointment,
  fetchAppointmentsByDate,
  fetchAppointmentsByMonth,
  fetchAppointmentsByService,
  fetchAppointmentsByServiceProviders,
  removeAppointment
} from "../utils/AppointAPI";

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

export const _fetchAppointmentsByDay = createAsyncThunk(
  "appoint/fetchDayAppointments",
  async (businessId, thunkAPI) => {
    try {
      let day = new Date().toISOString().slice(0, 10)
      const response = await fetchAppointmentsByDate(day, businessId);
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
  async (appointment, thunkAPI) => {
    try {
      const response = await removeAppointment(appointment);
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
    [_fetchAppointmentsByDay.fulfilled]: (state, action) => {
      state.totalToday = action.payload;
    },
    [_fetchAppointmentsByDay.rejected]: (state, action) => {
      state.totalToday = null;
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
