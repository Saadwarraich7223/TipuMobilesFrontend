import { useQuery } from "@tanstack/react-query";
import categoriesApi from "../api/categoriesApi";
import productsApi from "../api/productsApi";

export const useCategoryProducts = (slug, filters = {}) => {
  const filterKey = JSON.stringify(filters || {});

  return useQuery({
    queryKey: ["category-products", slug || "allProducts", filterKey],
    queryFn: async () => {
      const res = await categoriesApi.getProductsByCategory(
        slug || "",
        filters,
      );
      return res?.data ?? res; // Handle both wrapped and unwrapped for safety
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

export const useProductDetails = (id) => {
  return useQuery({
    queryKey: ["product-details", id],
    queryFn: async () => {
      const res = await productsApi.getProduct(id);
      const { product } = res.data;
      return { ...product };
    },
    enabled: Boolean(id),
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  });
};
