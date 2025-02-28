import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchBusinessDetails,
  updateBusiness,
} from "../API/BusinessAPI";

const initialState = {
  business: null,
  totalMonthlyIncome: 0,
};

export const _fetchBusinessDetails = createAsyncThunk(
  "business/getbusiness",
  async (businessId, thunkAPI) => {
    try {
      let response = await fetchBusinessDetails(businessId);
      return response;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue();
    }
  }
);

export const _updateBusiness = createAsyncThunk(
  "business/updatebusiness",
  async (businessObj, thunkAPI) => {
    try {
      const response = await updateBusiness(businessObj);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

export const businessSlice = createSlice({
  name: "business",
  initialState,
  extraReducers: {
    [_fetchBusinessDetails.fulfilled]: (state, action) => {
      state.business = action.payload;
    },
    [_fetchBusinessDetails.rejected]: (state, action) => {
      state.business = null;
    },
  },
});

export default businessSlice.reducer;
