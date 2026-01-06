import axiosClient from "./axiosClient";

const categoriesApi = {
  getCategoriesTree: async () => axiosClient.get("/categories/nested"),
  getProductsByCategory: async (slug, filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    return axiosClient.get(`/categories/${slug}/products?${params}`);
  },
};

export default categoriesApi;
