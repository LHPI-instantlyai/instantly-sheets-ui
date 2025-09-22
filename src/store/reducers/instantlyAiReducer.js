import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const getExistingCampaigns = createAsyncThunk(
  "auth/getExistingCampaigns",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(`/campaign/get-all-campaigns`);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const AddNewSheet = createAsyncThunk(
  "auth/AddNewSheet",
  async (
    { sheetID, columns, sheetName },
    { fulfillWithValue, rejectWithValue }
  ) => {
    try {
      const { data } = await api.post(`/sheets/${sheetID}/addSheet`, {
        sheetName,
        columns,
      });
      console.log("data -------------------------------------------");
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const instantlyAiReducer = createSlice({
  name: "instantlyAi",
  initialState: {
    loader: false,
    errorMessage: "",
    successMessage: "",
    existingCampaigns: [],
    totalExistingCampaigns: 0,
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getExistingCampaigns.pending, (state, _) => {
      state.loader = true;
    });
    builder.addCase(getExistingCampaigns.rejected, (state, payload) => {
      state.loader = false;
      state.errorMessage = payload.payload.error;
    });
    builder.addCase(getExistingCampaigns.fulfilled, (state, payload) => {
      state.loader = false;
      state.successMessage = payload.payload.message;
      state.existingCampaigns = payload.payload.campaigns;
      state.totalExistingCampaigns = payload.payload.total;
    });

    //   AddNewSheet
    builder.addCase(AddNewSheet.pending, (state, _) => {
      state.loader = true;
    });
    builder.addCase(AddNewSheet.rejected, (state, payload) => {
      state.loader = false;
      console.log(payload.payload.error)
      console.log("payload.payload.error-------------------")
      state.errorMessage = payload.payload.error;
    });
    builder.addCase(AddNewSheet.fulfilled, (state, payload) => {
      state.loader = false;
      state.successMessage = payload.payload.message;
      state.existingSheets.push(payload.payload.sheetName);
    });
  },
});

export const { messageClear } = instantlyAiReducer.actions;
export default instantlyAiReducer.reducer;
