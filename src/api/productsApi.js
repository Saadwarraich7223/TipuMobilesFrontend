// src/api/products.js
import axiosClient from "./axiosClient";

const productsApi = {
  getProducts: (params) => axiosClient.get("/products", { params }),
  getProduct: (id) => axiosClient.get(`/products/${id}`),
};

export default productsApi;
