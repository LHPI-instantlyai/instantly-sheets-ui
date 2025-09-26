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

export const startAgentEncoding = createAsyncThunk(
  "auth/startAgentEncoding",
  async ({ campaignId, opts, sheetName }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.post(`/agent/start-agent-encoding`, {
        campaignId,
        opts,
        sheetName,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);




export const instantlyAiReducer = createSlice({
  name: "instantlyAi",
  initialState: {
    instantlyloader: false,
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
      state.instantlyloader = true;
    });
    builder.addCase(getExistingCampaigns.rejected, (state, payload) => {
      state.instantlyloader = false;
      state.errorMessage = payload.payload.error;
    });
    builder.addCase(getExistingCampaigns.fulfilled, (state, payload) => {
      state.instantlyloader = false;
      state.successMessage = payload.payload.message;
      state.existingCampaigns = payload.payload.campaigns;
      state.totalExistingCampaigns = payload.payload.total;
    });
  },
});

export const { messageClear } = instantlyAiReducer.actions;
export default instantlyAiReducer.reducer;
