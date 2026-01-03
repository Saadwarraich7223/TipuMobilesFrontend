import { useState, useMemo, memo, useCallback } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";
import { Heart, ShoppingCart } from "lucide-react";

import { useCart } from "../../../context/CartContext";
import { useAuthContext } from "../../../context/AuthContext";
import { cld } from "../../../utlis/CloudinaryImageSizeReducer/cloudinary";

const ProductCard = memo(({ product }) => {
  const { addOrRemoveFromWishList, wishList, isLoggedIn } = useAuthContext();
  const { addToCart } = useCart();

  const [loading, setLoading] = useState(false);
  const [showHoverImage, setShowHoverImage] = useState(false);

  const wishListSet = useMemo(
    () => new Set(wishList.map((item) => item._id)),
    [wishList]
  );
  const isInWishList = wishListSet.has(product._id);

  const discountPercentage = useMemo(() => {
    if (product.salePrice && product.salePrice < product.price) {
      return Math.round(
        ((product.price - product.salePrice) / product.price) * 100
      );
    }
    if (product.oldPrice && product.oldPrice > product.price) {
      return Math.round(
        ((product.oldPrice - product.price) / product.oldPrice) * 100
      );
    }
    return 0;
  }, [product.price, product.salePrice, product.oldPrice]);

  const handleAddToCart = useCallback(async () => {
    try {
      setLoading(true);
      const res = await addToCart({ productId: product._id });
      if (res) toast.success(res.message);
    } finally {
      setLoading(false);
    }
  }, [addToCart, product._id]);
  const handleToggleWishlist = useCallback(async () => {
    if (!isLoggedIn) {
      toast.error("Please login to add to wishlist");
      return;
    }
    await addOrRemoveFromWishList(product._id);
  }, [isLoggedIn, addOrRemoveFromWishList, product._id]);

  if (!product) return null;

  return (
    <div
      onMouseEnter={() => setShowHoverImage(true)}
      onMouseLeave={() => setShowHoverImage(false)}
      className="group flex flex-col bg-white rounded-lg border border-gray-200
                 shadow-sm hover:shadow-xl hover:-translate-y-1
                 transition-all duration-300 overflow-hidden
                 w-full max-w-[340px] mx-auto"
    >
      {/* ================= Image Section ================= */}
      <div className="relative overflow-hidden">
        <Link to={`/product/${product._id}`}>
          <div className="aspect-[1/1.1] w-full relative">
            <img
              src={cld(
                product?.images?.[0],
                "f_auto,q_auto,w_400,h_400,c_fill"
              )}
              alt={product.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {showHoverImage && product?.images?.[1] && (
              <img
                src={cld(
                  product?.images?.[1],
                  "f_auto,q_auto,w_400,h_400,c_fill"
                )}
                alt={`${product.title} hover`}
                className="absolute inset-0 w-full h-full object-cover
                           opacity-0 group-hover:opacity-100
                           transition-opacity duration-700"
              />
            )}
          </div>
        </Link>

        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <span
            className="absolute top-2 left-2 bg-primary text-white
                           text-[11px] px-2 py-1 rounded-md shadow"
          >
            {discountPercentage}% OFF
          </span>
        )}

        {/* Wishlist */}
        <button
          onClick={handleToggleWishlist}
          aria-pressed={isInWishList}
          className="absolute top-2 right-2 w-9 h-9 rounded-full
                     flex items-center justify-center
                     bg-white/90 backdrop-blur shadow-md
                     hover:scale-105 transition"
        >
          <Heart
            size={18}
            className={isInWishList ? "text-red-500 fill-red-500" : ""}
          />
        </button>
      </div>

      {/* ================= Content ================= */}
      <div className="p-2 sm:p-4 flex-1">
        {/* Category */}
        <h6 className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">
          <Link to={`/category/${product.category?.slug || ""}`}>
            {product.category?.name}
          </Link>
        </h6>

        {/* Title */}
        <h3
          className="text-sm sm:text-[15px] font-semibold text-gray-800
                       leading-snug line-clamp-2 mb-2"
        >
          <Link to={`/product/${product._id}`}>{product.title}</Link>
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className={`text-sm ${
                i < product.averageRating ? "text-yellow-400" : "text-gray-300"
              }`}
            >
              ★
            </span>
          ))}
          <span className="text-xs text-gray-500">({product.numReviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          {product.isInFlashSale ? (
            <>
              <span className="text-xs text-gray-400 line-through">
                Rs {product.price}
              </span>
              <span className="text-red-600 font-bold text-base">
                Rs {product.salePrice}
              </span>
            </>
          ) : (
            <>
              {product.oldPrice > product.price && (
                <span className="text-xs text-gray-400 line-through">
                  Rs {product.oldPrice}
                </span>
              )}
              <span className="text-primary font-bold text-base">
                Rs {product.price}
              </span>
            </>
          )}
        </div>
      </div>

      {/* ================= CTA ================= */}
      <div className="p-3 sm:p-4 pt-0">
        <button
          onClick={handleAddToCart}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2
                     border border-primary text-primary
                     rounded-lg py-2 text-sm font-semibold
                     hover:bg-primary hover:text-white
                     transition-all duration-300 disabled:opacity-60"
        >
          {loading ? (
            <ClipLoader size={18} />
          ) : (
            <>
              <ShoppingCart size={18} />
              Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
});

export default ProductCard;
