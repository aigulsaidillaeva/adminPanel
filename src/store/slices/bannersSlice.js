import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const initialState = {
  banners: [],
  isLoading: false,
  error: null,
};

export const fetchBanners = createAsyncThunk(
  "banners/getBanners",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/banner`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteBannerThunk = createAsyncThunk(
  "banners/deleteBanner",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/banner/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const fetchBannerById = createAsyncThunk(
  "banners/getBannerById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/banner/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addBannerThunk = createAsyncThunk(
  "banners/addBanner",
  async (newBanner, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/banner`, newBanner);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const bannersSlice = createSlice({
  name: "banners",
  initialState,
  reducers: {
    addBanner: (state, action) => {
      state.banners.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanners.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.isLoading = false;
        state.banners = action.payload;
      })
      .addCase(fetchBanners.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteBannerThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBannerThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.banners = state.banners.filter(
          (banner) => banner.id !== action.payload
        );
      })
      .addCase(deleteBannerThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder.addCase(addBannerThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addBannerThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.banners.push(action.payload);
    });
    builder
      .addCase(addBannerThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchBannerById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBannerById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedBanner = action.payload;
      })
      .addCase(fetchBannerById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { addBanner } = bannersSlice.actions;
export default bannersSlice.reducer;
