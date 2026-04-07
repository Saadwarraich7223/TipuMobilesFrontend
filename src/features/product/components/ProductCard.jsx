import { useState, useMemo, memo, useCallback } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";
import { Heart, ShoppingBag, ArrowUpRight, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { addToCart } from "../../cart/store/cartSlice";
import { toggleWishlist } from "../../auth/store/authSlice";
import { cld } from "../../../utils/CloudinaryImageSizeReducer/cloudinary";

/* ─── Fonts ─────────────────────────────────────────────────────────────────
   Add to your index.html or global CSS:
   @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700&family=DM+Sans:wght@300;400;500;700&display=swap');

   Then in tailwind.config.js → theme.extend.fontFamily:
     playfair: ['Playfair Display', 'serif'],
     dm:       ['DM Sans', 'sans-serif'],
─────────────────────────────────────────────────────────────────────────── */

const ProductCard = memo(({ product }) => {
  const dispatch = useDispatch();
  const { wishList, isLoggedIn } = useSelector((s) => s.auth);

  const [loading, setLoading] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const isInWishList = useMemo(
    () => wishList?.some((i) => i._id === product._id),
    [wishList, product._id],
  );

  const discount = useMemo(() => {
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

  const displayPrice = (product.salePrice || product.price).toLocaleString();
  const originalPrice = (product.oldPrice || product.price).toLocaleString();

  const handleAddToCart = useCallback(
    async (e) => {
      e.preventDefault();
      e.stopPropagation();
      try {
        setLoading(true);
        await dispatch(addToCart({ productId: product._id })).unwrap();
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

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col bg-white font-dm overflow-hidden
                 rounded-[10px] md:rounded-[22px]
                 shadow-[0_2px_0_#ddd,0_8px_32px_rgba(0,0,0,0.07)]
                 hover:shadow-[0_2px_0_#ccc,0_20px_56px_rgba(0,0,0,0.13)]
                 transition-shadow duration-500 w-full"
    >
      {/* ── IMAGE ZONE ───────────────────────────────────── */}
      <div className="relative overflow-hidden aspect-square bg-[#edeae4]">
        {/* skeleton shimmer */}
        {!imgLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-[#ede8e0] to-[#d8d1c4] animate-pulse" />
        )}

        <Link to={`/product/${product._id}`} className="block h-full w-full">
          <img
            src={cld(product?.images?.[0], "f_auto,q_auto,w_600,h_600,c_fill")}
            alt={product.title}
            onLoad={() => setImgLoaded(true)}
            className={`w-full h-full object-cover group-hover:translate-y-[-2px] group-hover:rotate-1 transition-transform duration-700
                        group-hover:scale-[1.07]
                        ${imgLoaded ? "opacity-100" : "opacity-0"}`}
          />
        </Link>

        {/* vignette for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent pointer-events-none" />

        {/* ── Badges ── */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {discount > 0 && (
            <span
              className="px-2.5 py-1 rounded-[5px] text-[9px] font-bold tracking-[.14em] uppercase
                             bg-[#c8a97a] text-white"
            >
              -{discount}%
            </span>
          )}
          {product.isNew && (
            <span
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-[5px]
                             text-[9px] font-bold tracking-[.14em] uppercase text-white
                             bg-white/15 border border-white/30 backdrop-blur-md"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#c8a97a] flex-shrink-0" />
              New
            </span>
          )}
        </div>

        {/* ── Wishlist button on image (glass style) ── */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={handleToggleWishlist}
          className="absolute top-3 right-3 z-10 w-8 h-8 md:w-9 md:h-9 rounded-full
                     bg-white/50 border border-black/30 backdrop-blur-md
                     flex items-center justify-center
                     hover:bg-white/80 transition-colors duration-200"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isInWishList ? "on" : "off"}
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.5 }}
              transition={{ duration: 0.18 }}
            >
              <Heart
                size={13}
                className={
                  isInWishList ? "fill-rose-400 text-rose-400" : "text-gray-800"
                }
              />
            </motion.div>
          </AnimatePresence>
        </motion.button>

        {/* ── Price pinned to image bottom ── */}
        <div className="absolute text-shadow-[0_1px_2px_rgba(0,0,0,0.25)] bottom-0 left-0 right-0 px-3.5 pb-3 pt-10 z-10 pointer-events-none">
          <div className="flex items-baseline gap-2">
            <span
              className="font-playfair text-white font-bold tracking-tight leading-none
                             text-[19px] md:text-[23px]"
            >
              Rs {displayPrice}
            </span>
            {discount > 0 && (
              <span className="text-white/45 text-[11px] line-through font-light">
                {originalPrice}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── CONTENT ZONE ─────────────────────────────────── */}
      <div className="flex flex-col flex-1 px-2 pt-3 pb-3.5 md:px-4 md:pt-4 md:pb-5">
        {/* Category + rating */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-[9px] font-bold tracking-[.16em] truncate max-w-[80px] sm:max-w-ful uppercase text-[#c8a97a]">
            {product.category?.name || "Premium"}
          </span>
          <div
            className="flex items-center gap-1.5 bg-[#faf7f2] border border-[#ede8df]
                          px-2 py-0.5 rounded-full"
          >
            <Star size={8} className="fill-[#c8a97a] text-[#c8a97a]" />
            <span className="text-[9px] font-bold text-[#8a6b3a]">
              {product.averageRating || "4.5"}
            </span>
          </div>
        </div>

        {/* Title */}
        <Link to={`/product/${product._id}`} className="block mb-1">
          <h3
            className="font-playfair tracking-[0.02em] md:tracking-[0.03em] capitalize text-[13px] md:text-[16px] font-medium
                         text-[#1a1714] leading-snug line-clamp-1
                         group-hover:text-[#8a6b3a] transition-colors duration-300"
          >
            {product.title}
          </h3>
        </Link>

        {/* Feature tags — desktop only, from product.tags array */}
        {product.tags?.length > 0 && (
          <div className="hidden md:flex flex-wrap gap-1.5 mb-3 mt-1">
            {product.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[9px] font-medium tracking-[.06em] text-[#a09880]
                           bg-[#f5f2ed] border border-[#ede8df] px-2 py-0.5 rounded-[4px]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Divider */}
        <div className="h-px bg-[#ede8df] my-2.5 md:my-3" />

        {/* CTA row */}
        <div className="flex items-center gap-2">
          {/* ─── MOBILE: persistent "Add to cart" + wishlist ─── */}
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={handleAddToCart}
            disabled={loading}
            className=" flex-1 py-2 rounded-[10px] text-[10px] font-bold
                       tracking-[.14em] uppercase bg-[#1a1714] text-white
                       flex items-center justify-center gap-1
                       active:bg-[#2d2926] disabled:opacity-55 transition-colors"
          >
            {loading ? (
              <ClipLoader size={11} color="white" />
            ) : (
              <>
                <ShoppingBag size={20} strokeWidth={2.5} /> Add to Cart
              </>
            )}
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleToggleWishlist}
            className="hidden w-9 h-9 rounded-[10px] border border-[#e8e3db]
                       md:flex items-center justify-center flex-shrink-0
                       hover:border-rose-200 transition-colors"
          >
            <Heart
              size={14}
              className={
                isInWishList ? "fill-rose-500 text-rose-500" : "text-[#1a1714]"
              }
            />
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
});

export default ProductCard;

