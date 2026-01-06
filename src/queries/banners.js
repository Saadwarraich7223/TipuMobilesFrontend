import { useQuery } from "@tanstack/react-query";
import bannersApi from "../api/bannersApi";

export const useBanners = (filters = {}) => {
  return useQuery({
    queryKey: ["banners"],
    queryFn: async () => {
      const res = await bannersApi.get("/", {
        params: { position: filters.position, isActive: filters.isActive },
      });

      return res.data;
    },
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  });
};
