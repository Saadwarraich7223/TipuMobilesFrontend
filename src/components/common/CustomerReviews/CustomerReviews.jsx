import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { motion } from "framer-motion";

import reviewApi from "../../../api/reviewApi";
import { cld } from "../../../utlis/CloudinaryImageSizeReducer/cloudinary";
import { Star } from "lucide-react";

// Format date like "Nov 23, 2025"
const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

// Skeleton loader for smooth UI
const ReviewSkeleton = () => (
  <div className="bg-gray-50 animate-pulse p-6 rounded-2xl shadow-md">
    <div className="h-5 bg-gray-300 rounded w-24 mb-4"></div>
    <div className="h-3 bg-gray-300 rounded w-full mb-2"></div>
    <div className="h-3 bg-gray-300 rounded w-5/6 mb-6"></div>

    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
      <div className="flex-1">
        <div className="h-3 bg-gray-300 rounded w-28 mb-2"></div>
        <div className="h-3 bg-gray-300 rounded w-20"></div>
      </div>
    </div>
  </div>
);

const CustomerReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await reviewApi.getTopReviews();
      if (res?.reviews) setReviews(res.reviews);
    } catch (error) {
      console.log("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const topReviews = reviews.slice(0, 10);

  return (
    <section className="py-12 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
          Customer Reviews
        </h2>

        {/* Loading Skeletons */}
        {loading && <ReviewSkeleton />}

        {/* No Reviews */}
        {!loading && topReviews.length === 0 && (
          <p className="text-gray-500 text-center">No reviews available.</p>
        )}

        {/* Swiper Slider */}
        {!loading && topReviews.length > 0 && (
          <Swiper
            slidesPerView={1}
            spaceBetween={25}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3500 }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            modules={[Pagination, Autoplay]}
          >
            {topReviews.map((review, index) => (
              <SwiperSlide key={review._id || index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.15,
                  }}
                  className="bg-white border border-gray-200 p-6 rounded-2xl  transition-shadow duration-300 flex flex-col justify-between h-full"
                >
                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        fill="yellow"
                        className="text-yellow-500 drop-shadow-sm"
                      />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-gray-700 text-sm leading-relaxed mb-6 line-clamp-5">
                    {review.comment || review.title}
                  </p>

                  {/* User Info */}
                  <div className="flex items-center gap-4 mt-auto">
                    <img
                      src={cld(
                        review.user.avatar.url,
                        "f_auto,q_auto,w_96,h_96,c_fill"
                      )}
                      alt={review.user?.name || "User"}
                      className="w-12 h-12 rounded-full object-cover border border-gray-200"
                    />
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900">
                        {review.user?.name || "Unknown User"}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {formatDate(review.createdAt)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default CustomerReviews;
