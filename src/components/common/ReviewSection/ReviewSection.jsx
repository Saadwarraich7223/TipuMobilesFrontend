import React, { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { FaStar, FaRegStar } from "react-icons/fa";
import reviewApi from "../../../api/reviewApi";
import { useParams } from "react-router-dom";
import ReviewSkeleton from "../../layout/ShimmerSkeltons/ReviewSkelton";
import { toast } from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";

const RatingStars = ({ rating = 0 }) => (
  <div className="flex items-center gap-[2px]">
    {[...Array(5)].map((_, i) =>
      i < rating ? (
        <FaStar key={i} size={16} className="text-yellow-400" />
      ) : (
        <FaRegStar key={i} size={16} className="text-gray-300" />
      )
    )}
  </div>
);

const ReviewsSection = () => {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [openReplies, setOpenReplies] = useState({});
  const [loading, setLoading] = useState(false);
  const [reviewSubmitLoading, setReviewSubmitLoading] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    title: "",
    comment: "",
    rating: 0,
  });

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!reviewForm.title && !reviewForm.comment && !reviewForm.rating) {
        return toast.error("All fields are required.");
      }
      if (!reviewForm.title) {
        return toast.error("Review title is required.");
      }
      if (!reviewForm.comment) {
        return toast.error("Review comment is required.");
      }
      if (!reviewForm.rating) {
        return toast.error("Review rating is required.");
      }
      setReviewSubmitLoading(true);
      const res = await reviewApi.createReview(id, reviewForm);
      toast.success(res.message);
      if (res.success) fetchProductReviews();

      setReviewForm({ title: "", comment: "", rating: 0 });
    } catch (error) {
      if (error.response) {
        // Backend responded with error
        if (error.response.status === 401) {
          toast.error("You must be logged in to add a review.");
          // Optionally redirect to login
          // navigate("/login");
        } else {
          toast.error(error.response.data.message || "Something went wrong");
        }
      } else {
        toast.error("Network error. Please try again.");
      }
    } finally {
      setReviewSubmitLoading(false);
    }
  };
  const fetchProductReviews = async () => {
    try {
      setLoading(true);
      const res = await reviewApi.getProductReviews(id);
      console.log(res);
      setReviews(res.reviews);
      console.log(reviews);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProductReviews();
  }, [id]);

  const toggleReplyBox = (index) => {
    setOpenReplies((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleReplySubmit = (reviewId, replyText, index) => {
    if (!replyText) return;
    setReviews((prev) =>
      prev.map((r) =>
        r.id === reviewId
          ? {
              ...r,
              adminReply: {
                reply: replyText,
                repliedAt: new Date().toISOString(),
                repliedBy: { name: "Admin" },
              },
            }
          : r
      )
    );
    toggleReplyBox(index);
  };

  if (loading)
    return (
      <div className="py-4">
        <h2 className="text-md md:text-xl font-bold md:mb-4 mb-2">
          Customer Reviews
        </h2>

        <div className="space-y-3 md:space-y-5">
          {[...Array(3)].map((_, i) => (
            <ReviewSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  return (
    <div className="py-4">
      <h2 className="text-md md:text-xl font-bold md:mb-4 mb-2">
        Customer Reviews
      </h2>

      {/* Reviews List */}
      {reviews?.length === 0 ? (
        <p>No reviews yet. Be the first to review!</p>
      ) : (
        <div className="space-y-2 md:space-y-5 max-h-[400px] overflow-y-auto pr-1 sm:pr-3">
          {reviews.map((review, i) => (
            <ReviewCard
              key={review._id}
              review={review}
              index={i}
              openReplies={openReplies}
              toggleReplyBox={toggleReplyBox}
              onReplySubmit={handleReplySubmit}
            />
          ))}
        </div>
      )}

      {/* Review Form */}
      <div className="mt-8">
        <h3 className=" text-md md:text-lg font-bold mb-2">Leave a Review</h3>
        <form
          onSubmit={handleReviewSubmit}
          className="space-y-2  md:space-y-4 max-w-xl"
        >
          <input
            type="text"
            placeholder="Title"
            value={reviewForm.title}
            onChange={(e) =>
              setReviewForm({ ...reviewForm, title: e.target.value })
            }
            className="w-full text-xs md:text-base border border-gray-300 p-2 rounded-md"
          />
          <textarea
            rows="4"
            placeholder="Comment"
            value={reviewForm.comment}
            onChange={(e) =>
              setReviewForm({ ...reviewForm, comment: e.target.value })
            }
            className="w-full text-xs md:text-base border border-gray-300 p-2 rounded-md resize-none"
          />
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setReviewForm({ ...reviewForm, rating: star })}
              >
                {star <= reviewForm.rating ? (
                  <FaStar className="text-yellow-400" />
                ) : (
                  <FaRegStar className="text-gray-300" />
                )}
              </button>
            ))}
          </div>
          <button
            type="submit"
            className="bg-primary text-xs min-w-30 md:text-base cursor-pointer text-white px-4 py-2 rounded-md"
          >
            {reviewSubmitLoading ? (
              <ClipLoader size={14} color="#ffffff" />
            ) : (
              "Submit Review"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewsSection;

const ReviewCard = ({
  review,
  index,
  openReplies,
  toggleReplyBox,
  onReplySubmit,
}) => {
  const [replyText, setReplyText] = useState("");
  const [helpfulClicked, setHelpfulClicked] = useState(false);
  const [helpfulCount, setHelpfulCount] = useState(review.helpfulCount || 0);
  const RelativeTime = () => {
    return (
      <span className="text-gray-500 text-xs md:text-sm">
        {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}
      </span>
    );
  };
  const handleReply = (e) => {
    e.preventDefault();
    onReplySubmit(review.id, replyText, index);
    setReplyText("");
  };

  const handleHelpfulClick = () => {
    if (!helpfulClicked) {
      setHelpfulCount(helpfulCount + 1);
      setHelpfulClicked(true);
    }
  };

  return (
    <div className="bg-white p-2 md:p-4 border border-gray-300 rounded-md shadow-sm">
      <div className="flex mb-1 items-center gap-3">
        <img
          src={review?.userInfo?.avatar.url || "https://i.pravatar.cc/70"}
          alt="Avatar"
          className="w-10 h-10 object-cover rounded-full"
        />
        <div>
          <h4 className="font-semibold text-sm md:text-base ">
            {review.userInfo.name}
          </h4>
          <span className="text-gray-500 text-xs md:text-sm">
            {RelativeTime()}
            {review.edited && " (Edited)"}
          </span>
        </div>
      </div>

      <RatingStars rating={review.rating} />
      <h5 className="font-medium text-sm md:text-base mt-2">{review.title}</h5>
      <p className="text-gray-700 text-xs md:text-sm">{review.comment}</p>

      {review.adminReply && (
        <div className="mt-3 pl-4 border-l-2 border-gray-200 text-gray-700">
          <p className="text-xs md:text-sm">
            <span className="font-semibold text-sm md:text-base text-primary">
              {review.adminReply.repliedBy.name}:
            </span>{" "}
            {review.adminReply.reply}
          </p>
          <span className="text-xs text-gray-400">
            {new Date(review.adminReply.repliedAt).toLocaleDateString()}
          </span>
        </div>
      )}

      {/* Helpful votes */}
      <div className="mt-2 flex items-center gap-3">
        <button
          onClick={handleHelpfulClick}
          className={` text-xs md:text-sm font-semibold ${
            helpfulClicked ? "text-gray-400" : "text-primary hover:underline"
          }`}
          disabled={helpfulClicked}
        >
          👍 Was this review helpful?
        </button>
        <span className="md:text-sm text-xs text-gray-500">
          ({helpfulCount})
        </span>
      </div>

      <button
        onClick={() => toggleReplyBox(index)}
        className="mt-2 text-primary text-xs cursor-pointer md:text-sm font-semibold hover:underline"
      >
        {openReplies[index] ? "Hide Reply" : "Reply"}
      </button>

      {openReplies[index] && (
        <form onSubmit={handleReply} className="mt-2 pl-3">
          <textarea
            rows="2"
            placeholder="Write a reply..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            className="w-full border p-2 rounded-md resize-none"
          />
          <button
            type="submit"
            className="mt-1 bg-primary text-white px-3 py-1 rounded-md text-sm"
          >
            Submit Reply
          </button>
        </form>
      )}
    </div>
  );
};
