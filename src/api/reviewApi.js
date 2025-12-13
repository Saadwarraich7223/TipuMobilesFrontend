import axiosClient from "./axiosClient";

const reviewApi = {
  getProductReviews: (id) => axiosClient.get(`/product/${id}/reviews`),
  createReview: (id, data) =>
    axiosClient.post(`/product/${id}/review/add`, data),
  getTopReviews: () => axiosClient.get("topReviews"),
};

export default reviewApi;
