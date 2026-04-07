import { useState, useMemo, memo, useCallback } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";
import {
  Heart,
  ShoppingBag,
  Star,
  ArrowRight,
  Truck,
  BadgeCheck,
} from "lucide-react";
import { motion } from "framer-motion";

import { addToCart } from "../../cart/store/cartSlice";
import { toggleWishlist } from "../../auth/store/authSlice";
import { cld } from "../../../utils/CloudinaryImageSizeReducer/cloudinary";

const ProductListCard = memo(({ product }) => {
  const dispatch = useDispatch();
  const { wishList, isLoggedIn } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [imgHover, setImgHover] = useState(false);

  const isInWishList = useMemo(
    () => wishList?.some((item) => item._id === product._id),
    [wishList, product._id],
  );

  const discountPercentage = useMemo(() => {
    if (product.salePrice && product.salePrice < product.price)
      return Math.round(
        ((product.price - product.salePrice) / product.price) * 100,
      );
    if (product.oldPrice && product.oldPrice > product.price)
      return Math.round(
        ((product.oldPrice - product.price) / product.oldPrice) * 100,
      );
    return 0;
  }, [product.price, product.salePrice, product.oldPrice]);

  const handleAddToCart = useCallback(
    async (e) => {
      e.preventDefault();
      e.stopPropagation();
      try {
        setLoading(true);
        await dispatch(addToCart({ productId: product._id })).unwrap();
        toast.success("Added to cart");
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [dispatch, product._id],
  );

  const handleToggleWishlist = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!isLoggedIn) {
        toast.error("Please login to add to wishlist");
        return;
      }
      dispatch(toggleWishlist(product._id));
    },
    [isLoggedIn, dispatch, product._id],
  );

  if (!product) return null;

  const price = product.salePrice || product.price;
  const oldPrice = product.salePrice ? product.price : product.oldPrice;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="group flex gap-4 bg-white/70 backdrop-blur-md border border-purple-100/60 rounded-2xl p-4 
                 hover:shadow-[0_8px_32px_rgba(139,92,246,0.1)] hover:border-purple-200/70
                 transition-all duration-300"
    >
      {/* ── Image ── */}
      <div
        className="relative flex-shrink-0 w-36 h-36 sm:w-44 sm:h-44 rounded-xl overflow-hidden bg-gray-50"
        onMouseEnter={() => setImgHover(true)}
        onMouseLeave={() => setImgHover(false)}
      >
        <Link to={`/product/${product._id}`} className="block h-full w-full">
          <img
            src={cld(
              imgHover && product?.images?.[1]
                ? product.images[1]
                : product?.images?.[0],
              "f_auto,q_auto,w_300,h_300,c_fill",
            )}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>

        {/* Discount badge */}
        {discountPercentage > 0 && (
          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-gray-900 text-white text-[10px] font-black">
            -{discountPercentage}%
          </span>
        )}
        {product.isNew && (
          <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-white/90 backdrop-blur border border-purple-100 text-purple-600 text-[10px] font-black">
            NEW
          </span>
        )}
      </div>

      {/* ── Details ── */}
      <div className="flex-1 min-w-0 flex flex-col gap-2">
        {/* Top row: category + rating */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-purple-400">
            {product.category?.name || "Premium Tech"}
          </span>
          <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-full">
            <Star size={11} fill="#f59e0b" className="text-amber-400" />
            <span className="text-[11px] font-black text-amber-700">
              {product.averageRating || "4.5"}
            </span>
            {product.reviewCount > 0 && (
              <span className="text-[10px] text-amber-600/70">
                ({product.reviewCount})
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <Link to={`/product/${product._id}`}>
          <h3 className="text-[15px] font-black text-gray-900 leading-tight line-clamp-2 hover:text-purple-600 transition-colors">
            {product.title}
          </h3>
        </Link>

        {/* Description */}
        {product.description && (
          <p className="text-[12px] text-gray-500 leading-relaxed line-clamp-2 hidden sm:block">
            {product.description}
          </p>
        )}

        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2 mt-auto">
          {product.freeDelivery && (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">
              <Truck size={9} />
              Free Delivery
            </span>
          )}
          {product.brand && (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-gray-500 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-full">
              <BadgeCheck size={9} />
              {product.brand}
            </span>
          )}
          {discountPercentage > 0 && (
            <span className="text-[10px] font-bold text-rose-600 bg-rose-50 border border-rose-100 px-2 py-0.5 rounded-full">
              Save {discountPercentage}%
            </span>
          )}
        </div>

        {/* Price + Actions */}
        <div className="flex items-center justify-between gap-3 pt-2 border-t border-purple-100/50 mt-1">
          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-black text-gray-900">
              Rs {price?.toLocaleString()}
            </span>
            {oldPrice && oldPrice > price && (
              <span className="text-[12px] text-gray-400 line-through">
                Rs {oldPrice?.toLocaleString()}
              </span>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={handleToggleWishlist}
              className="w-9 h-9 rounded-xl bg-white border border-purple-100 flex items-center justify-center hover:border-rose-200 hover:bg-rose-50 transition-all duration-200"
            >
              <Heart
                size={15}
                className={
                  isInWishList ? "text-rose-500 fill-rose-500" : "text-gray-400"
                }
              />
            </button>

            <button
              onClick={handleAddToCart}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 
                         text-white text-[12px] font-black hover:from-purple-500 hover:to-pink-500
                         shadow-[0_4px_14px_rgba(139,92,246,0.3)] hover:shadow-[0_6px_20px_rgba(139,92,246,0.4)]
                         transition-all duration-300 disabled:opacity-70"
            >
              {loading ? (
                <ClipLoader size={12} color="white" />
              ) : (
                <>
                  <ShoppingBag size={13} />
                  <span className="hidden sm:inline">Add to Cart</span>
                </>
              )}
            </button>

            <Link
              to={`/product/${product._id}`}
              className="w-9 h-9 rounded-xl bg-white border border-purple-100 flex items-center justify-center text-gray-400 hover:text-purple-600 hover:border-purple-200 transition-all duration-200"
            >
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

export default ProductListCard;
