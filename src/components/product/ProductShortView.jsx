import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { MdClose, MdOutlineShoppingCart } from "react-icons/md";
import { FaRegHeart, FaStar, FaRegStar } from "react-icons/fa";
import { IoGitCompareOutline } from "react-icons/io5";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";

// ⭐ RatingStars sub-component
const RatingStars = ({ rating = 0 }) => (
  <div className="flex items-center gap-[2px]">
    {[...Array(5)].map((_, i) =>
      i < Math.round(rating) ? (
        <FaStar key={i} size={14} className="text-yellow-400" />
      ) : (
        <FaRegStar key={i} size={14} className="text-gray-300" />
      )
    )}
  </div>
);

const ProductShortView = () => {
  const { showProductView, setShowProductView } = useAppContext();

  const handleClose = () => {
    setShowProductView(false);
  };

  const product = {
    title: "POCO C61, 4GB RAM, 64GB ROM, Ethereal Blue, Smartphone",
    brand: "Poco",
    price: 2290,
    oldPrice: 2690,
    rating: 4,
    stock: true,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has been the industry's standard dummy text ever since the 1500s.",
    images: [
      "https://m.media-amazon.com/images/I/61mIUCd-37L._SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71xn9bCRfhL._SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71DOdGk4ZpL._SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71EBLqZ6A2L._SL1500_.jpg",
    ],
  };

  if (!showProductView) return null;

  return (
    <div className=" fixed inset-0 z-40 ">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/20 opacity-20  z-40  cursor-pointer"
        onClick={handleClose}
      ></div>

      {/* Popup Card */}
      <div className="  flex w-full h-full items-center justify-center z-50 overflow-hidden">
        <div className="bg-white rounded-lg p-6 w-[650px] h-[450px]   relative ">
          {/* Header */}
          <div className="border-b border-gray-300 pb-3 relative">
            <h4 className="text-lg font-semibold pr-8 mb-1">{product.title}</h4>

            <div className="flex items-center gap-4">
              <span className="text-[13px] font-[500]">
                Brand:{" "}
                <span className="text-primary font-bold">{product.brand}</span>
              </span>
              <RatingStars rating={product.rating} />
            </div>

            <button
              className="absolute top-2 right-2 bg-gray-100 p-2 rounded-md text-gray-600 hover:text-primary hover:bg-gray-200 transition"
              onClick={handleClose}
            >
              <MdClose size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="flex flex-col sm:flex-row gap-6 p-4">
            {/* Images */}
            <div className="w-full sm:w-[40%] flex flex-col items-center">
              <Swiper
                style={{
                  "--swiper-pagination-color": "#000",
                }}
                spaceBetween={10}
                pagination={{ clickable: true }}
                modules={[Pagination, FreeMode]}
                className="w-full rounded-md overflow-hidden border border-gray-200"
              >
                {product.images.map((img, i) => (
                  <SwiperSlide key={i}>
                    <img
                      src={img}
                      alt={`Product image ${i + 1}`}
                      className="w-full h-[250px] object-cover rounded-md"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Product Details */}
            <div className="w-full sm:w-[60%] flex flex-col justify-center gap-4">
              <div className="flex items-center gap-3">
                {product.oldPrice && (
                  <span className="opacity-50 text-[18px] font-[600] line-through">
                    Rs {product.oldPrice}
                  </span>
                )}
                <span className="text-primary text-[22px] font-[700]">
                  Rs {product.price}
                </span>
              </div>

              <div
                className={`p-2 text-center rounded-2xl w-[100px] text-[13px] font-[600] ${
                  product.stock
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {product.stock ? "In Stock" : "Out of Stock"}
              </div>

              <p className="text-gray-700 text-sm leading-relaxed">
                {product.description}
              </p>

              <button className="w-full flex items-center justify-center gap-2 border border-primary text-primary rounded-md py-2 text-sm font-semibold hover:bg-primary hover:text-white transition-all duration-300">
                <MdOutlineShoppingCart size={18} />
                Add to Cart
              </button>

              <div className="flex items-center gap-6 mt-2">
                <span className="flex items-center gap-2 cursor-pointer text-gray-600 text-sm font-medium hover:text-primary transition">
                  <FaRegHeart size={18} />
                  Add to Wishlist
                </span>
                <span className="flex items-center gap-2 cursor-pointer text-gray-600 text-sm font-medium hover:text-primary transition">
                  <IoGitCompareOutline size={18} />
                  Add to Compare
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductShortView;
