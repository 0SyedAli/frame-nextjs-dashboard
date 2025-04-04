import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authslice';
import servicesReducer from "./slices/servicesSlice";
// Initialize preloadedState based on the environment (only on client-side)
const preloadedState = {
  auth: {
    user: null,
    token: null,
    loading: false,
    error: null,
  },
};

// This will run only on the client-side to check localStorage
if (typeof window !== 'undefined') {
  preloadedState.auth.user = JSON.parse(localStorage.getItem('user')) ?? null;
  preloadedState.auth.token = localStorage.getItem('token') ?? null;
}

export const store = configureStore({
  reducer: {
    auth: authReducer,
    services: servicesReducer,
  },
  preloadedState,
});
