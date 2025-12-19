import axiosClient from "./axiosClient";

export const addressApi = {
  create: (data) => axiosClient.post("/address/create", data),
  getAddressesByUser: ({ id }) => axiosClient.get(`/address/${id}/addresses`),
  getAddress: ({ id }) => axiosClient.get(`/address/${id}/address`),
  update: ({ data, id }) => axiosClient.put(`/address/${id}`, data),
  setDefault: (id) => axiosClient.put(`/address/${id}/setDefault`),
  delete: (id) => {
    axiosClient.delete(`/address/${id}`);
  },
};
