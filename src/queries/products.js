import { useQuery } from "@tanstack/react-query";
import categoriesApi from "../api/categories";
import productsApi from "../api/productsApi";

export const useCategoryProducts = (slug, filters = {}) => {
  return useQuery({
    queryKey: ["category-products", slug, filters],
    queryFn: async () => {
      const res = await categoriesApi.getProductsByCategory(slug, filters);
      return res.products;
    },
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  });
};

export const useTopRatedProducts = (filters = {}) => {
  return useQuery({
    queryKey: ["top-rated-products", filters],
    queryFn: async () => {
      const res = await productsApi.getProducts({
        sort: "-averageRating",
        limit: 5,
      });
      return res.data.products;
    },
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  });
};
