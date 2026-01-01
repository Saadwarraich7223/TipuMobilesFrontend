import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import toast from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";
import { useAuthContext } from "../../../context/AuthContext";

import useCountdown from "../../../hooks/useCountDown";
import { cld } from "../../../utlis/CloudinaryImageSizeReducer/cloudinary";
import { Heart, ShoppingCart } from "lucide-react";

const ProductCard = ({ product }) => {
  const { addOrRemoveFromWishList, wishList, isLoggedIn } = useAuthContext();
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [isFlashSaleActive, setIsFlashSaleActive] = useState(false);

  const isInWishList = wishList.some((item) => item._id === product._id);

  useEffect(() => {
    const checkFlashSaleStatus = () => {
      const currentTime = new Date();
      const flashSaleEndTime = new Date(product.flashSaleEndTime);
      setIsFlashSaleActive(currentTime < flashSaleEndTime);
    };

    checkFlashSaleStatus();

    const interval = setInterval(() => {
      checkFlashSaleStatus();
    }, 60000);

    return () => clearInterval(interval);
  }, [product.flashSaleEndTime]);

  const handleAddToCart = async () => {
    try {
      setLoading(true);
      const res = await addToCart({ productId: product._id });
      if (res) toast.success(res.message);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleToggleProductWishlist = async () => {
    try {
      if (!isLoggedIn) {
        toast.error("Please login to add to wishlist");
        return;
      }
      await addOrRemoveFromWishList(product._id);
    } catch (error) {
      console.log(error);
    }
  };

  const { hours, minutes, seconds } = useCountdown(product.flashSaleEndTime);

  const getDiscountPercentage = () => {
    if (product.isInFlashSale && product.salePrice) {
      return Math.round(
        ((product.price - product.salePrice) / product.price) * 100
      );
    }
    if (product.oldPrice && product.price) {
      return Math.round(
        ((product.oldPrice - product.price) / product.oldPrice) * 100
      );
    }
    return 0;
  };

  return (
    <>
      {product && (
        <div
          className="flex min-h-[320px] flex-col bg-white group rounded-lg border border-gray-300
        shadow-md hover:shadow-xl hover:-translate-y-1 hover:shadow-primary/30
        transition-all duration-300 overflow-hidden w-full max-w-[350px] mx-auto"
        >
          {/* --- Image Section --- */}
          <div className="relative overflow-hidden flex-shrink-0">
            <Link to={`/product/${product._id}`}>
              <div className="aspect-[1/1.1] w-full relative">
                <img
                  src={cld(
                    product?.images?.[0],
                    "f_auto,q_auto,w_400,h_400,c_fill"
                  )}
                  alt="Product front"
                  width="360"
                  height="360"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <img
                  src={cld(
                    product?.images?.[1] || product?.images?.[0],
                    "f_auto,q_auto,w_400,h_400,c_fill"
                  )}
                  loading="lazy"
                  alt="Product hover"
                  className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                />
              </div>
            </Link>

            {/* Flash Sale Badge */}
            {isFlashSaleActive && (
              <div className="absolute top-2 right-2 sm:top-3 sm:right-3 flex flex-col items-end gap-1">
                {/* Flash Sale Badge */}
                <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-[11px] sm:text-sm font-bold px-3 py-1 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-200">
                  🔥 On Sale
                </span>

                {/* Countdown Timer */}
                <span className="bg-white bg-opacity-90 text-gray-900 text-[11px] sm:text-sm font-semibold px-3 py-1 rounded-lg shadow-md backdrop-blur-sm">
                  {hours.toString().padStart(2, "0")}:
                  {minutes.toString().padStart(2, "0")}:
                  {seconds.toString().padStart(2, "0")}
                </span>
              </div>
            )}

            {/* Discount / Flash Sale Percentage Badge */}
            {(product.oldPrice || isFlashSaleActive) && (
              <span
                className={`absolute top-2 left-2 sm:top-3 sm:left-3 ${
                  isFlashSaleActive ? "bg-red-600" : "bg-primary"
                } text-white text-[10px] sm:text-xs font-semibold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-sm shadow`}
              >
                {getDiscountPercentage()}% off
              </span>
            )}

            {/* Hover Actions */}
            <div className="absolute top-2 right-2 sm:top-3 sm:right-3 flex flex-col gap-1 sm:gap-2  transition-all duration-500">
              <button
                onClick={handleToggleProductWishlist}
                title={
                  isInWishList ? "Remove from Wishlist" : "Add to Wishlist"
                }
                aria-pressed={isInWishList}
                className={` cursor-pointer 
        flex items-center justify-center w-10 h-10 rounded-full 
        transition-all duration-100 ease-in-out transform
        ${
          isInWishList
            ? "text-red-600 scale-100 shadow-lg"
            : "text-gray-700 shadow-lg hover:shadow-sm"
        }
        hover:scale-105
      `}
              >
                {isInWishList ? (
                  <Heart
                    size={22}
                    color="red"
                    fill="red"
                    className="transition-colors duration-300"
                  />
                ) : (
                  <Heart size={22} className="transition-colors duration-300" />
                )}
              </button>
            </div>
          </div>

          {/* --- Info Section --- */}
          <div className="p-2 sm:p-4 flex-1">
            <h6 className="text-[11px] sm:text-xs text-gray-500 uppercase tracking-wide">
              <Link to="/">{product.category?.name}</Link>
            </h6>

            <h3 className="text-[13px] sm:text-sm font-semibold text-gray-800 md:mt-1 leading-tight line-clamp-2">
              <Link to="/">{product.title}</Link>
            </h3>

            {/* Custom Rating */}
            <div className="flex items-center gap-1 sm:mt-2">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-[12px] sm:text-[14px] ${
                    i < product.averageRating
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
              <span className="text-xs sm:text-sm text-gray-700">
                ({product.numReviews})
              </span>
            </div>

            {/* Price Section */}
            <div className="flex items-center gap-1.5 sm:gap-2 sm:mt-3">
              {product.isInFlashSale ? (
                <>
                  <span className="text-gray-400 sm:block line-through text-xs sm:text-sm">
                    Rs {product.price}
                  </span>
                  <span className="text-red-600 font-bold text-sm sm:text-base">
                    Rs {product.salePrice}
                  </span>
                </>
              ) : (
                <>
                  {product.oldPrice > 0 && (
                    <span className="text-gray-400 sm:block line-through text-xs sm:text-sm">
                      Rs {product.oldPrice}
                    </span>
                  )}
                  <span className="text-primary font-bold text-sm sm:text-base">
                    Rs {product.price}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Add to Cart Button */}
          <div className="p-2 sm:p-4 mt-auto">
            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-1.5 sm:gap-2 border border-primary text-primary rounded-md py-1.5 sm:py-2 text-xs sm:text-sm font-semibold hover:bg-primary cursor-pointer hover:text-white transition-all duration-300"
            >
              {loading ? (
                <ClipLoader size={20} className="text-gray-800" />
              ) : (
                <>
                  <ShoppingCart size={16} className="sm:size-[18px]" />
                  Add to Cart
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
