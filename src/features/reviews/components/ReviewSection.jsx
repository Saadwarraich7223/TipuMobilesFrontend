import { useState } from "react";
import { useParams } from "react-router-dom";
import { Star, UserRound } from "lucide-react";
import toast from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";
import ReviewSkeleton from "../../../components/layout/ShimmerSkeletons/ReviewSkelton";
import { cld } from "../../../utils/CloudinaryImageSizeReducer/cloudinary";
import { useProductReviews, useSubmitReview } from "../queries/reviews";

const RatingStars = ({ rating = 0, size = 14 }) => (
  <div className="flex items-center gap-1">
    {[...Array(5)].map((_, i) =>
      i < rating ? (
        <Star key={i} size={size} fill="#facc15" className="text-yellow-400" />
      ) : (
        <Star key={i} size={size} className="text-gray-300" />
      ),
    )}
  </div>
);

const ReviewsSection = () => {
  const { id } = useParams();
  const { data: reviews = [], isLoading } = useProductReviews(id);
  const submitReview = useSubmitReview(id);

  const [showAll, setShowAll] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    title: "",
    comment: "",
    rating: 0,
  });

  const normalized = reviews.map((r) => ({
    ...r,
    rating: Number(r.rating || 0),
  }));
  const total = normalized.length;
  const avg = total
    ? normalized.reduce((sum, r) => sum + r.rating, 0) / total
    : 0;

  const counts = [5, 4, 3, 2, 1].map(
    (stars) => normalized.filter((r) => Math.round(r.rating) === stars).length,
  );

  const topReview = normalized
    .slice()
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))[0];

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!reviewForm.title || !reviewForm.comment || !reviewForm.rating) {
      return toast.error("All fields are required.");
    }

    try {
      await submitReview.mutateAsync(reviewForm);
      toast.success("Review submitted successfully");
      setReviewForm({ title: "", comment: "", rating: 0 });
    } catch (err) {
      if (err?.response?.status === 401) {
        toast.error("You must be logged in to add a review.");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <div className="h-12 w-20 bg-gray-100 rounded" />
          <div className="mt-3 h-4 w-28 bg-gray-100 rounded" />
          <div className="mt-6 space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-3 w-full bg-gray-100 rounded" />
            ))}
          </div>
        </div>
        <div className="lg:col-span-2">
          <ReviewSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <div className="flex items-end gap-2">
          <span className="text-5xl font-black text-gray-900">
            {avg.toFixed(1)}
          </span>
          <span className="text-sm text-gray-400 mb-1">/5</span>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <RatingStars rating={avg} size={16} />
          <span className="text-xs text-gray-500">({total} reviews)</span>
        </div>

        <div className="mt-6 space-y-3">
          {counts.map((count, index) => {
            const stars = 5 - index;
            const percent = total ? Math.round((count / total) * 100) : 0;
            return (
              <div key={stars} className="flex items-center gap-3">
                <div className="text-xs text-gray-600 w-4">{stars}</div>
                <div className="flex-1 h-2 rounded-full bg-gray-200 overflow-hidden">
                  <div
                    className="h-2 bg-gray-900 rounded-full"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="lg:col-span-2">
        {topReview ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-[0_16px_40px_rgba(0,0,0,0.06)]">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                {topReview?.userInfo?.avatar?.url ? (
                  <img
                    src={cld(
                      topReview.userInfo.avatar.url,
                      "f_auto,q_auto,w_80,h_80,c_fill",
                    )}
                    loading="lazy"
                    decoding="async"
                    width="40"
                    height="40"
                    className="w-10 h-10 rounded-full object-cover"
                    alt="Avatar"
                  />
                ) : (
                  <div className="w-10 h-10 bg-white rounded-full border border-gray-200 flex items-center justify-center">
                    <UserRound size={22} className="text-gray-700" />
                  </div>
                )}
                <div>
                  <div className="text-sm font-semibold text-gray-900">
                    {topReview.userInfo?.name || "User"}
                  </div>
                  <div className="text-xs text-gray-400">
                    {new Date(topReview.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3">
              <RatingStars rating={topReview.rating} size={14} />
            </div>

            {topReview.title && (
              <div className="mt-2 text-sm font-semibold text-gray-800">
                {topReview.title}
              </div>
            )}

            <p className="mt-2 text-sm text-gray-600 leading-relaxed">
              {topReview.comment}
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 text-sm text-gray-500">
            No reviews yet.
          </div>
        )}
      </div>

      <div className="lg:col-span-3">
        <div className="flex items-center justify-between mt-2">
          <h3 className="text-sm font-semibold text-gray-700">All Reviews</h3>
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="text-xs font-semibold text-gray-700 hover:text-gray-900"
          >
            {showAll ? "Hide all reviews" : "Show all reviews"}
          </button>
        </div>

        {showAll && (
          <div className="mt-4 space-y-3">
            {normalized.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-200 p-4 text-sm text-gray-500">
                No reviews yet.
              </div>
            ) : (
              normalized.map((review) => (
                <div
                  key={review._id}
                  className="bg-white rounded-2xl border border-gray-200 p-4"
                >
                  <div className="flex items-center gap-3">
                    {review?.userInfo?.avatar?.url ? (
                      <img
                        src={cld(
                          review.userInfo.avatar.url,
                          "f_auto,q_auto,w_80,h_80,c_fill",
                        )}
                        loading="lazy"
                        decoding="async"
                        width="32"
                        height="32"
                        className="w-8 h-8 rounded-full object-cover"
                        alt="Avatar"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-white rounded-full border border-gray-200 flex items-center justify-center">
                        <UserRound size={18} className="text-gray-700" />
                      </div>
                    )}
                    <div>
                      <div className="text-xs font-semibold text-gray-900">
                        {review.userInfo?.name || "User"}
                      </div>
                      <div className="text-[11px] text-gray-400">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="mt-2">
                    <RatingStars rating={review.rating} size={12} />
                  </div>
                  {review.title && (
                    <div className="mt-2 text-sm font-semibold text-gray-800">
                      {review.title}
                    </div>
                  )}
                  <p className="mt-1 text-sm text-gray-600">{review.comment}</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <div className="lg:col-span-3">
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            Add a Review
          </h3>
          <form onSubmit={handleReviewSubmit} className="space-y-3 max-w-2xl">
            <input
              type="text"
              placeholder="Title"
              value={reviewForm.title}
              onChange={(e) =>
                setReviewForm({ ...reviewForm, title: e.target.value })
              }
              className="w-full border border-gray-200 p-2 rounded-md text-sm"
            />
            <textarea
              rows="4"
              placeholder="Comment"
              value={reviewForm.comment}
              onChange={(e) =>
                setReviewForm({ ...reviewForm, comment: e.target.value })
              }
              className="w-full border p-2 border-gray-200 rounded-md resize-none text-sm"
            />
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                >
                  {star <= reviewForm.rating ? (
                    <Star fill="#facc15" className="text-yellow-400" />
                  ) : (
                    <Star className="text-gray-300" />
                  )}
                </button>
              ))}
            </div>
            <button
              type="submit"
              className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm"
              disabled={submitReview.isLoading}
            >
              {submitReview.isLoading ? (
                <ClipLoader size={14} color="#fff" />
              ) : (
                "Submit Review"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewsSection;
