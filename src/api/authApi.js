import axiosClient from "./axiosClient";

export const authApi = {
  register: (data) => axiosClient.post("/auth/register", data),
  login: (data) => axiosClient.post("/auth/login", data),
  getProfile: () => axiosClient.get("/auth/profile"),
  updateProfile: (data) => axiosClient.patch("/auth/update", data),
  updateAvatar: (formData) => axiosClient.patch("/auth/avatar", formData),
  logout: () => axiosClient.post("/auth/logout"),
  addOrRemoveProductToWishList: (id) =>
    axiosClient.post(`/auth/wishlist/${id}`),
  getWishList: () => axiosClient.get("/auth/wishlist"),
  ChangePassword: (data) => axiosClient.post("/auth/update-password", data),
};
