import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

axiosClient.interceptors.request.use((config) => {
  const cartToken = localStorage.getItem("cartToken");
  const accessToken = localStorage.getItem("access_token");

  if (cartToken) {
    config.headers["x-cart-token"] = cartToken;
  }
  if (accessToken) {
    config.headers["authorization"] = accessToken;
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response.status === 401) {
      console.warn("Unauthorized");
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
