import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addAppointment,
  fetchAppointment,
  fetchAppointmentsByDate,
  removeAppointment
} from "../utils/AppointAPI";

const initialState = {
  appoint: null,
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
  "appoint/fetchappointments",
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
      state.appoint = action.payload;
    },
    [_fetchAppointmentsByDay.rejected]: (state, action) => {
      state.appoint = null;
    },
    [_addAppointment.fulfilled]: (state, action) => {
    },
    [_addAppointment.rejected]: (state, action) => {
    },
  },
});

export const { initappoint } = appointSlice.actions;

export default appointSlice.reducer;
