import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true, // This ensures that cookies (accessToken, refreshToken) are sent with every request
});

// Set Authorization token for requests if available in cookies (automatic via withCredentials)
axiosClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("access_token"); // Use localStorage for initial login; or cookies
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`; // Send JWT in header if not in cookies
  }
  return config;
});

// Response interceptor to handle errors
axiosClient.interceptors.response.use(
  (response) => response.data, // Automatically return the data
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized error, like clearing cookies or navigating to login
      localStorage.removeItem("access_token");
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
