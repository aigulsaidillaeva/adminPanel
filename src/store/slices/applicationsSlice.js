import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const initialState = {
  applications: [],
  isLoading: false,
  error: null,
};

export const fetchApplication = createAsyncThunk(
  "applications/getApplications",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/applications`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteApplicationThunk = createAsyncThunk(
  "applications/deleteApplication",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/applications/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addApplicationThunk = createAsyncThunk(
  "applications/addApplication",
  async (newApplication, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/applications`,
        newApplication
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const applicationsSlice = createSlice({
  name: "applications",
  initialState,
  reducers: {
    addApplication: (state, action) => {
      state.applications.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApplication.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchApplication.fulfilled, (state, action) => {
        state.isLoading = false;
        state.applications = action.payload;
      })
      .addCase(fetchApplication.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteApplicationThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.applications = state.applications.filter(
          (app) => app.id !== action.payload
        );
      })
      .addCase(deleteApplicationThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addApplicationThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addApplicationThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.applications.push(action.payload);
      })
      .addCase(addApplicationThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { addApplication } = applicationsSlice.actions;
export default applicationsSlice.reducer;
