import { useState } from "react";
import { useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { Star, User, UserRound } from "lucide-react";
import toast from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";

import ReviewSkeleton from "../../layout/ShimmerSkeltons/ReviewSkelton";
import { cld } from "../../../utlis/CloudinaryImageSizeReducer/cloudinary";
import { useProductReviews, useSubmitReview } from "../../../queries/reviews";

/* ===================== Rating Stars ===================== */
const RatingStars = ({ rating = 0 }) => (
  <div className="flex items-center gap-[2px]">
    {[...Array(5)].map((_, i) =>
      i < rating ? (
        <Star key={i} size={16} fill="yellow" className="text-yellow-500" />
      ) : (
        <Star key={i} size={16} className="text-gray-300" />
      )
    )}
  </div>
);

/* ===================== Reviews Section ===================== */
const ReviewsSection = () => {
  const { id } = useParams();

  const { data: reviews = [], isLoading } = useProductReviews(id);

  const submitReview = useSubmitReview(id);

  const [openReplies, setOpenReplies] = useState({});
  const [reviewForm, setReviewForm] = useState({
    title: "",
    comment: "",
    rating: 0,
  });

  /* ------------------ Submit Review ------------------ */
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

  const toggleReplyBox = (index) => {
    setOpenReplies((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  /* ------------------ Loading ------------------ */
  if (isLoading) {
    return (
      <div className="py-4">
        <h2 className="text-md md:text-xl font-bold mb-2">Customer Reviews</h2>

        <div className="space-y-3 md:space-y-5">
          {[...Array(3)].map((_, i) => (
            <ReviewSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="py-4">
      <h2 className="text-md md:text-xl font-bold mb-2">Customer Reviews</h2>

      {/* ------------------ Reviews List ------------------ */}
      {reviews.length === 0 ? (
        <p>No reviews yet. Be the first to review!</p>
      ) : (
        <div className="space-y-2 md:space-y-5 max-h-[400px] overflow-y-auto pr-2">
          {reviews.map((review, i) => (
            <ReviewCard
              key={review._id}
              review={review}
              index={i}
              openReplies={openReplies}
              toggleReplyBox={toggleReplyBox}
            />
          ))}
        </div>
      )}

      {/* ------------------ Review Form ------------------ */}
      <div className="mt-8">
        <h3 className="text-md md:text-lg font-bold mb-2">Leave a Review</h3>

        <form onSubmit={handleReviewSubmit} className="space-y-3 max-w-xl">
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
            className="w-full border p-2 border-gray-200  rounded-md resize-none text-sm"
          />

          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setReviewForm({ ...reviewForm, rating: star })}
              >
                {star <= reviewForm.rating ? (
                  <Star fill="yellow" className="text-yellow-500" />
                ) : (
                  <Star className="text-gray-300" />
                )}
              </button>
            ))}
          </div>

          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded-md"
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
  );
};

/* ===================== Review Card ===================== */
const ReviewCard = ({ review, index, openReplies, toggleReplyBox }) => {
  const [replyText, setReplyText] = useState("");
  const [helpfulClicked, setHelpfulClicked] = useState(false);
  const [helpfulCount, setHelpfulCount] = useState(review.helpfulCount || 0);

  return (
    <div className="bg-white p-3 md:p-4 border border-gray-200 rounded-md shadow-sm">
      <div className="flex items-center gap-3 mb-1">
        {review?.userInfo?.avatar?.url ? (
          <img
            src={cld(
              review?.userInfo?.avatar?.url,
              "f_auto,q_auto,w_80,h_80,c_fill"
            )}
            loading="lazy"
            decoding="async"
            width="40"
            height="40"
            className="w-10 h-10 rounded-full object-cover"
            alt="Avatar"
          />
        ) : (
          <div className="w-10 h-10 bg-white rounded-full border-2 border-gray-200 flex items-center justify-center">
            <UserRound size={28} className=" text-gray-700 " />
          </div>
        )}

        <div>
          <h4 className="font-semibold text-sm">
            {review.userInfo?.name || "User"}
          </h4>
          <span className="text-gray-500 text-xs">
            {formatDistanceToNow(new Date(review.createdAt), {
              addSuffix: true,
            })}
          </span>
        </div>
      </div>

      <RatingStars rating={review.rating} />

      <h5 className="font-medium mt-2 text-sm">{review.title}</h5>
      <p className="text-gray-700 text-sm">{review.comment}</p>

      <div className="mt-2 flex items-center gap-3">
        <button
          onClick={() => {
            if (!helpfulClicked) {
              setHelpfulCount((c) => c + 1);
              setHelpfulClicked(true);
            }
          }}
          disabled={helpfulClicked}
          className={`text-xs font-semibold ${
            helpfulClicked ? "text-gray-400" : "text-primary hover:underline"
          }`}
        >
          👍 Was this helpful?
        </button>

        <span className="text-xs text-gray-500">({helpfulCount})</span>
      </div>

      <button
        onClick={() => toggleReplyBox(index)}
        className="mt-2 text-primary text-xs font-semibold hover:underline"
      >
        {openReplies[index] ? "Hide Reply" : "Reply"}
      </button>

      {openReplies[index] && (
        <form className="mt-2">
          <textarea
            rows="2"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write a reply..."
            className="w-full border p-2 rounded-md resize-none text-sm"
          />
          <button
            type="button"
            className="mt-1 bg-primary text-white px-3 py-1 rounded-md text-sm"
          >
            Submit Reply
          </button>
        </form>
      )}
    </div>
  );
};

export default ReviewsSection;
