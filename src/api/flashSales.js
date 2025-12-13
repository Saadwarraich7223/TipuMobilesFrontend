import axiosClient from "./axiosClient";

const flashSalesApi = {
  getFlashSales: async () => axiosClient.get("/flashSales"),
};

export default flashSalesApi;
