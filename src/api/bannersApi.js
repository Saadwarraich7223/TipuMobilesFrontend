import axiosClient from "./axiosClient";

const bannersApi = {
  get: () => axiosClient.get("/banners"),
};

export default bannersApi;
