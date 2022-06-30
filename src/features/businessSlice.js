import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchBusinessDetails } from "../utils/BusinessAPI";

const initialState = {
  business: null,
};

export const _fetchBusinessDetails = createAsyncThunk(
    "business/getbusiness",
    async (businessId, thunkAPI) => {
      try {
        const response = await fetchBusinessDetails(businessId);
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
      }
    },
  });
  
  export default businessSlice.reducer;
  