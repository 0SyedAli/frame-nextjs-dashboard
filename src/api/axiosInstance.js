import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Replace with your API URL
});

// Add Axios response interceptor
api.interceptors.response.use(
  (response) => response, // Pass through successful responses
  (error) => {
    // Check if the response contains the "Invalid Token" message
    if (error.response?.data?.msg === "Invalid Token") {
      // Clear token from local storage
      localStorage.removeItem('userAccessToken');

      // Use window.location to redirect to login (since useNavigate cannot be used here)
      router.push("/user/auth/signin")
    }

    return Promise.reject(error); // Reject other errors for further handling
  }
);

export default api;
