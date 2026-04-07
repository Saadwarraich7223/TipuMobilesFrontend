import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import reviewApi from "../api/reviewApi";

export const useProductReviews = (productId) => {
  return useQuery({
    queryKey: ["product-reviews", productId],
    queryFn: async () => {
      const res = await reviewApi.getProductReviews(productId);
      return res.reviews;
    },
    enabled: !!productId,
    staleTime: 1000 * 60 * 5, // 5 min cache
  });
};

export const useSubmitReview = (productId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reviewData) => reviewApi.createReview(productId, reviewData),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["product-reviews", productId],
      });
    },
  });
};
