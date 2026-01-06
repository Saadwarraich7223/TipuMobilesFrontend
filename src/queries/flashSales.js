import { useQuery } from "@tanstack/react-query";
import flashSalesApi from "../api/flashSales";

export const useFlashSales = () => {
  return useQuery({
    queryKey: ["flashSales"],
    queryFn: () => flashSalesApi.getFlashSales(),
  });
};
