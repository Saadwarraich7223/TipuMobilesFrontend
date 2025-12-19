import axiosClient from "./axiosClient";

const orderApi = {
  fetchCheckoutPreview: () => axiosClient.get("/orders/checkout"),
  placeOrder: (data) => axiosClient.post("/orders/create", data),
};

export default orderApi;
