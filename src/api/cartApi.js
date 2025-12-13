import axiosClient from "./axiosClient";

const cartApi = {
  createCart: () => axiosClient.post("/cart/create"),
  getCart: () => axiosClient.get("/cart"),
  addToCart: (data) => axiosClient.post("/cart/add", data),
  updateCart: (data) => axiosClient.put("/cart/update", data),
  removeItem: (data) => axiosClient.delete("/cart/remove", data),
  clearCart: () => axiosClient.delete("/cart/clear"),
};

export default cartApi;
