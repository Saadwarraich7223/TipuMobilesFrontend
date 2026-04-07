import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { motion } from "framer-motion";

import reviewApi from "../api/reviewApi";
import { cld } from "../../../utils/CloudinaryImageSizeReducer/cloudinary";
import { MessageCircle, Quote, Star, User } from "lucide-react";

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

// Shimmer skeleton card
const ReviewSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
    {Array.from({ length: 3 }).map((_, i) => (
      <div
        key={i}
        className="animate-pulse bg-white/60 rounded-2xl p-6 border border-purple-100/50 space-y-4"
      >
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, j) => (
            <div key={j} className="w-4 h-4 bg-purple-100 rounded-full" />
          ))}
        </div>
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded w-full" />
          <div className="h-3 bg-gray-200 rounded w-5/6" />
          <div className="h-3 bg-gray-200 rounded w-4/6" />
        </div>
        <div className="flex items-center gap-3 pt-2">
          <div className="w-10 h-10 bg-purple-100 rounded-full" />
          <div className="space-y-1.5 flex-1">
            <div className="h-3 bg-gray-200 rounded w-28" />
            <div className="h-2.5 bg-gray-100 rounded w-20" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

const CustomerReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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
    fetchReviews();
  }, []);

  const topReviews = reviews.slice(0, 10);

  return (
    <section className="relative overflow-hidden md:py-10">
      {/* Soft atmospheric background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/40 via-transparent to-pink-50/30 pointer-events-none" />
      <div className="absolute top-0 left-0 w-64 h-64 bg-purple-100/20 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-3 md:mb-6  border-b border-purple-100/50 ">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-1"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50/70 border border-purple-100 text-purple-500 text-[11px] font-bold uppercase tracking-wider mb-3">
              <MessageCircle size={10} className="fill-current" />
              Verified Feedback
            </div>
            <h2 className="text-xl md:text-3xl font-black text-gray-900 tracking-tight font-montserrat">
              What Our Customers{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
                Are Saying
              </span>
            </h2>
          </motion.div>

          {/* Star summary badge */}
          {!loading && topReviews.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex-shrink-0 max-w-fit flex items-center gap-2 bg-white/20 border border-purple-200/70 rounded-2xl px-4 py-2.5 "
            >
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill="#f59e0b"
                    className="text-amber-400"
                  />
                ))}
              </div>
              <span className="text-sm font-black text-gray-800">4.9</span>
              <span className="text-xs text-gray-500 font-medium">
                / 5.0 avg rating
              </span>
            </motion.div>
          )}
        </div>

        {/* Loading */}
        {loading && <ReviewSkeleton />}

        {/* Empty */}
        {!loading && topReviews.length === 0 && (
          <p className="text-gray-400 text-center py-10 text-sm">
            No reviews available yet.
          </p>
        )}

        {/* Swiper Slider */}
        {!loading && topReviews.length > 0 && (
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            modules={[Pagination, Autoplay]}
            className="!pb-8"
          >
            {topReviews.map((review, index) => (
              <SwiperSlide key={review._id || index}>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="bg-white/70 backdrop-blur-md border border-purple-100/60 rounded-2xl p-5 
                             shadow-[0_4px_24px_rgba(139,92,246,0.06)] hover:shadow-[0_8px_32px_rgba(139,92,246,0.12)]
                             transition-shadow h-[200px] duration-300 flex flex-col justify-between  group"
                >
                  {/* Quote icon + Stars row */}
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={13}
                          fill={i < review.rating ? "#f59e0b" : "none"}
                          strokeWidth={i < review.rating ? 0 : 1.5}
                          className={
                            i < review.rating
                              ? "text-amber-400"
                              : "text-gray-200"
                          }
                        />
                      ))}
                    </div>
                    <Quote
                      size={20}
                      className="text-purple-200 group-hover:text-purple-300 transition-colors flex-shrink-0"
                    />
                  </div>

                  {/* Comment */}
                  <p className="text-gray-600  text-[13px] leading-relaxed line-clamp-4 flex-1 mb-1">
                    {review.comment}
                  </p>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-purple-100/60 via-pink-100/60 to-transparent mb-1" />

                  {/* User Info */}
                  <div className="flex items-center gap-3  ">
                    <div className="relative flex-shrink-0">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-300 to-pink-300 blur-sm opacity-40 scale-110" />
                      {review.user?.avatar.public_id !== null ? (
                        <img
                          src={cld(
                            review.user?.avatar?.url ||
                              "https://res.cloudinary.com/dm6h9pbg2/image/upload/v1711200000/default-avatar.png",
                            "f_auto,q_auto,w_80,h_80,c_fill,g_face",
                          )}
                          alt={review.user?.name || "User"}
                          className="relative w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                        />
                      ) : (
                        <div className="!bg-white w-10 h-10 rounded-full border-2 border-white shadow-sm flex items-center justify-center">
                          <User size={16} className="text-gray-500" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 leading-tight">
                        {review.user?.name || "Verified Buyer"}
                      </h4>
                      <p className="text-[11px] text-gray-400 mt-0.5">
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

      <style>{`
        .swiper-pagination-bullet {
          background: #d8b4fe;
          opacity: 0.5;
          width: 6px;
          height: 6px;
        }
        .swiper-pagination-bullet-active {
          background: #9333ea;
          opacity: 1;
          width: 18px;
          border-radius: 4px;
        }
      `}</style>
    </section>
  );
};

export default CustomerReviews;
