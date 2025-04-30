import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state
const initialState = {
  servicesData: {
    hair: [],
    nails: [],
    skin: [],
    others: [],
  },
  serviceIds: {},
  loading: false,
  error: null,
};

// Async thunk to fetch all services
export const fetchAllServices = createAsyncThunk(
  "services/fetchAllServices",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/getAllServices`,
        {
          headers: {
            Authorization: `Bearer ${token}`,

          },
        }

      );
      console.log(token);
      return response.data.data; // Returns the array of services
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching services");
    }
  }
);

// Async thunk to fetch sub-services by service ID
export const fetchSubServices = createAsyncThunk(
  "services/fetchSubServices",
  async ({ category, serviceId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/getSubServicesByServiceId`,
        { params: { serviceId } }
      );
      return { category, subServices: response.data.data || [] };
    } catch (error) {
      return rejectWithValue(error.response?.data || `Error fetching ${category} sub-services`);
    }
  }
);

const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    resetServicesState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchAllServices
      .addCase(fetchAllServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllServices.fulfilled, (state, action) => {
        state.loading = false;
        const ids = {};
        action.payload.forEach((service) => {
          const category = service.Title.toLowerCase().replace(" ", "");
          ids[category] = service._id;
        });
        state.serviceIds = ids;
      })
      .addCase(fetchAllServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle fetchSubServices
      .addCase(fetchSubServices.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSubServices.fulfilled, (state, action) => {
        state.loading = false;
        const { category, subServices } = action.payload;
        state.servicesData[category] = subServices;
      })
      .addCase(fetchSubServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetServicesState } = servicesSlice.actions;
export default servicesSlice.reducer;
