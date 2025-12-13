import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import reviewApi from "../../../api/reviewApi";

// Format date (Nov 23, 2025)
const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

// Skeleton loader for smooth UI
const ReviewSkeleton = () => (
  <div className="bg-gray-100 animate-pulse p-5 rounded-xl shadow-md">
    <div className="h-4 bg-gray-300 rounded w-24 mb-3"></div>
    <div className="h-3 bg-gray-300 rounded w-full mb-2"></div>
    <div className="h-3 bg-gray-300 rounded w-3/4 mb-4"></div>

    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
      <div>
        <div className="h-3 bg-gray-300 rounded w-20 mb-2"></div>
        <div className="h-3 bg-gray-300 rounded w-16"></div>
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

      if (res?.reviews) {
        setReviews(res.reviews);
      }
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
    <section className="bg-white py-10 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">
          Customer Reviews
        </h2>

        {/* Loading Skeletons */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
            {[1, 2, 3].map((i) => (
              <ReviewSkeleton key={i} />
            ))}
          </div>
        )}

        {/* No Reviews */}
        {!loading && topReviews.length === 0 && (
          <p className="text-gray-500">No reviews available.</p>
        )}

        {/* Swiper Slider */}
        {!loading && topReviews.length > 0 && (
          <Swiper
            slidesPerView={1}
            spaceBetween={25}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
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
                    delay: index * 0.15, // ⭐ Stagger fade-in animation
                  }}
                  className="bg-white border border-gray-200 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
                >
                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <FaStar
                        key={i}
                        className="text-yellow-400 text-lg drop-shadow-sm"
                      />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-4">
                    {review.comment || review.title}
                  </p>

                  {/* User Info */}
                  <div className="flex items-center gap-3">
                    <img
                      src={review.user?.avatar?.url || "/default-user.png"}
                      className="w-10 h-10 rounded-full object-cover shadow-sm"
                      alt="user"
                    />
                    <div>
                      <h4 className="text-sm font-semibold text-gray-800">
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
