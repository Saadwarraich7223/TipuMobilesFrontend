import { useQuery } from "@tanstack/react-query";
import categoriesApi from "../api/categories";

/* ================= Categories Tree ================= */
export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await categoriesApi.getCategoriesTree();
      return res.data;
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
    cacheTime: 1000 * 60 * 30, // 30 minutes
  });
};
