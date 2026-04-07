import axiosClient from "../../../api/axiosClient";

const categoriesApi = {
  getCategoriesTree: async () => axiosClient.get("/categories/nested"),
  getProductsByCategory: async (slug, filters = {}) => {
    const endpoint = slug
      ? `/categories/${slug}/products`
      : "/categories/products";
    return axiosClient.get(endpoint, { params: filters });
  },
  getParentCategories: async () => axiosClient.get("/categories/parent"),
};

export default categoriesApi;
