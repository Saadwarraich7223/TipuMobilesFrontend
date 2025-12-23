import axiosClient from "./axiosClient";

const orderApi = {
  fetchCheckoutPreview: () => axiosClient.get("/orders/checkout"),
  placeOrder: (data) => axiosClient.post("/orders/create", data),
  getUserOrders: () => axiosClient.get("/orders"),
};

export default orderApi;
