import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    admin: null,
    token: null,
    services: typeof window !== "undefined" ? JSON.parse(localStorage.getItem("services")) || {} : {},
    business: typeof window !== "undefined" ? JSON.parse(localStorage.getItem("businessDetails")) || {} : {}, // Added business state
    loading: false,
    error: null,
};

// Async Thunk for Admin Login
export const adminLogin = createAsyncThunk(
    'auth/adminLogin',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/admin/login`,
                credentials,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            // Save necessary data from the response to localStorage
            const { data, aceessToken } = response.data;
            const userData = {
                id: data.id,
                email: data.email,
                name: data.name,
                profileImage: data.profileImage,
            };

            localStorage.setItem('user', JSON.stringify(userData)); // Save user info
            localStorage.setItem('token', aceessToken); // Save token

            return { user: userData, token: aceessToken }; // Return structured data
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


export const clearAuthState = () => (dispatch) => {
    dispatch(authSlice.actions.resetState());
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.error = null;
            state.business = {};
            // Clear localStorage on logout
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            localStorage.removeItem('businessDetails');
        },
        resetState: () => initialState,

        // Reducer to store user data after signup
        setUser: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },

        setServiceData(state, action) {
            const { category, serviceId, title, text, image } = action.payload;
            if (!state.services) state.services = {};
            state.services[category] = { serviceId, title, text, image };

            // Persist to localStorage
            localStorage.setItem("services", JSON.stringify(state.services));
        },
        setBusinessData(state, action) {
            const { businessImage, ...rest } = action.payload;
        
            state.business = { ...state.business, ...rest };
        
            // Store preview URL instead of the File object
            if (businessImage instanceof File) {
                state.business.businessImagePreview = URL.createObjectURL(businessImage);
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(adminLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(adminLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user; // Save user details in Redux
                state.token = action.payload.token; // Save token in Redux
            })
            .addCase(adminLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.msg || 'Login failed';
            });
    },
});

export const { logout, setUser, setServiceData, setBusinessData } = authSlice.actions;
export default authSlice.reducer;