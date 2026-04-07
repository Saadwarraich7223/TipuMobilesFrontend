import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";

import ReviewsSection from "../../reviews/components/ReviewSection";
import ProductsList from "../components/ProductsList";
import ProductDetailsSkelton from "../../../components/layout/ShimmerSkeletons/ProductDetailsSkelton";

import { addToCart } from "../../cart/store/cartSlice";
import { toggleWishlist } from "../../auth/store/authSlice";
import { useCategoryProducts, useProductDetails } from "../queries/products";

import ClipLoader from "react-spinners/ClipLoader";
import {
  Heart,
  Star,
  ChevronLeft,
  BadgePercent,
  Package,
  Truck,
  CalendarDays,
  ShoppingBag,
  Zap,
  Shield,
  ChevronRight,
  Check,
} from "lucide-react";

/* ─── Star rating component ─── */
const RatingStars = ({ rating = 0 }) => (
  <div className="flex gap-1">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={14}
        fill={i < Math.round(rating) ? "#f59e0b" : "none"}
        className={i < Math.round(rating) ? "text-yellow-500" : "text-gray-300"}
      />
    ))}
  </div>
);

const ProductDetailsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { wishList } = useSelector((s) => s.auth);

  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [adding, setAdding] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const { data: product = {}, isLoading } = useProductDetails(id);

  const { data: products = {} } = useCategoryProducts(product?.category?.slug);
  const relatedProducts = products.products?.filter(
    (p) => p._id !== product._id,
  );

  const isLiked = wishList?.some((item) => item._id === product._id);
  const images = product?.images?.length ? product.images : ["/image.png"];
  const discountPct = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : null;

  const handleAddToCart = async () => {
    try {
      setAdding(true);
      await dispatch(addToCart({ productId: product._id, quantity })).unwrap();
    } catch (e) {
      console.error(e);
    } finally {
      setAdding(false);
    }
  };

  const handleBuyNow = async () => {
    await handleAddToCart();
    navigate("/checkout");
  };

  if (isLoading) return <ProductDetailsSkelton />;

  return (
    <div className="!m-0 min-h-screen font-sans bg-white/50 border p-2 py-4 rounded-2xl border-white/20">
      <div className="max-w-7xl mx-auto px-5 md:py-8">
        {/* Breadcrumb */}
        <nav className="md:flex hidden items-center gap-2 text-sm text-gray-400 mb-4">
          <button
            className="flex items-center gap-1 px-3 bg-white border rounded-full text-gray-500 hover:bg-gray-100"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft size={12} /> Back
          </button>
          <span>/</span>
          <span>Home</span>
          <span>/</span>
          <span>{product?.category?.name || "Products"}</span>
          <span>/</span>
          <span className="text-gray-800 font-medium">{product.title}</span>
        </nav>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
          {/* Left - Images */}
          <div className="">
            <div className="relative rounded-3xl overflow-hidden border border-gray-200 aspect-square bg-white">
              <img
                src={images[activeIndex]}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute top-4 left-4 bg-black text-white text-xs font-semibold px-3 py-1 rounded-full uppercase">
                New
              </div>
              {discountPct && (
                <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  −{discountPct}%
                </div>
              )}
            </div>

            {images.length > 1 && (
              <div className="flex gap-2 mt-3 overflow-x-auto scrollbar-hide">
                {images.map((img, i) => (
                  <div
                    key={i}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden cursor-pointer border-2 ${
                      i === activeIndex ? "border-black" : "border-transparent"
                    }`}
                    onClick={() => setActiveIndex(i)}
                  >
                    <img
                      src={img}
                      alt={`view ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-center gap-1 mt-2">
              {images.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === activeIndex ? "w-6 bg-black" : "w-1 bg-gray-300"
                  }`}
                  onClick={() => setActiveIndex(i)}
                />
              ))}
            </div>

            {/* Trust strip */}
            <div className="hidden md:flex flex-wrap justify-center gap-5 mt-3 bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex items-center gap-2 text-gray-500 text-xs font-medium">
                <Shield size={14} className="text-green-500" /> 2-Year Warranty
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-xs font-medium">
                <Truck size={14} className="text-green-500" /> Free Delivery
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-xs font-medium">
                <Check size={14} className="text-green-500" /> Easy Returns
              </div>
            </div>
          </div>

          {/* Right - Info */}
          <div className="">
            <Link
              to={`/products/${product.category?.slug}`}
              className="inline-block text-xs font-bold uppercase tracking-wider bg-gray-200 text-gray-600 px-3 py-1 rounded-full mb-3"
            >
              {product?.category?.name || "Product"}
            </Link>

            <h1 className="font-serif capitalize text-3xl md:text-4xl text-gray-900 mb-4">
              {product.title}
            </h1>

            <div className="flex items-center gap-2 mb-5 flex-wrap">
              <RatingStars rating={product.averageRating} />
              <span className="text-sm font-semibold text-gray-900">
                {product.averageRating?.toFixed(1) || "—"}
              </span>
              <span className="w-px h-3 bg-gray-300" />
              <span className="text-xs text-gray-400">
                {product.numReviews || 0} reviews
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 flex-wrap bg-white border border-gray-200 rounded-xl p-4 mb-5">
              <span className="text-2xl text-shadow-[0_1px_2px_rgba(0,0,0,0.25)] font-semibold text-gray-900">
                Rs {product.price}
              </span>
              {product.oldPrice !== 0 && (
                <span className="line-through text-gray-400">
                  Rs {product.oldPrice}
                </span>
              )}
              {discountPct && (
                <span className="ml-auto bg-yellow-100 text-yellow-800 border border-yellow-200 text-xs font-bold px-2 py-1 rounded">
                  Save {discountPct}%
                </span>
              )}
            </div>

            {/* Description */}
            <div className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-2">
              About this item
            </div>
            <p className="text-sm text-gray-500 mb-5">
              {product.description || "No description available."}
            </p>

            {/* Quantity + CTA */}
            <div className="flex gap-2 mb-4 flex-wrap">
              <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">
                <button
                  className="w-10 h-12 flex items-center justify-center text-gray-400 hover:text-gray-900"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  −
                </button>
                <div className="w-8 text-center font-semibold">{quantity}</div>
                <button
                  className="w-10 h-12 flex items-center justify-center text-gray-400 hover:text-gray-900"
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  +
                </button>
              </div>

              <button
                className="flex-1 flex items-center justify-center gap-2 min-h-12 border border-gray-200 rounded-full text-sm font-semibold text-gray-700 bg-white hover:text-black hover:border-black"
                onClick={handleAddToCart}
              >
                {adding ? (
                  <ClipLoader size={16} color="#374151" />
                ) : (
                  <>
                    <ShoppingBag size={14} /> Add to Cart
                  </>
                )}
              </button>
            </div>

            {/* Wishlist + Stock */}
            <div className="flex items-center justify-between gap-3 flex-wrap mb-6">
              <button
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border ${
                  isLiked
                    ? "bg-pink-50 text-pink-600 border-pink-300"
                    : "bg-white text-gray-500 border-gray-200 hover:text-pink-600 hover:border-pink-300"
                }`}
                onClick={() => dispatch(toggleWishlist(product._id))}
              >
                <Heart size={14} fill={isLiked ? "currentColor" : "none"} />
                {isLiked ? "Saved to Wishlist" : "Add to Wishlist"}
              </button>

              <div className="flex items-center gap-2 text-xs text-green-600 font-medium">
                <div className="w-2 h-2 rounded-full bg-green-500" /> In stock ·
                Ships in 1–2 days
              </div>
            </div>

            {/* Meta cards */}
            <div className="md:grid hidden grid-cols-2 gap-2">
              {[
                {
                  icon: <BadgePercent size={15} />,
                  label: "Discount",
                  val: "Up to 50% off",
                },
                {
                  icon: <Package size={15} />,
                  label: "Packaging",
                  val: "Standard box",
                },
                {
                  icon: <Truck size={15} />,
                  label: "Delivery",
                  val: "3–4 working days",
                },
                {
                  icon: <CalendarDays size={15} />,
                  label: "Arrives",
                  val: "By Oct 12",
                },
              ].map(({ icon, label, val }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg p-3"
                >
                  <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100 text-gray-400">
                    {icon}
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase text-gray-400">
                      {label}
                    </div>
                    <div className="text-sm font-medium text-gray-800">
                      {val}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="my-10 border-t border-gray-200 pt-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-serif text-2xl text-gray-900">
              Ratings & Reviews
            </h2>
            <span className="flex items-center gap-1 text-sm text-gray-400 cursor-pointer hover:text-black">
              See all <ChevronRight size={14} />
            </span>
          </div>
          <ReviewsSection />
        </div>

        {/* Related products */}
        {relatedProducts?.length > 0 && (
          <div className="my-10">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-serif text-2xl text-gray-900">
                You Might Also Like
              </h2>
              <span className="flex items-center gap-1 text-sm text-gray-400 cursor-pointer hover:text-black">
                View all <ChevronRight size={14} />
              </span>
            </div>
            <ProductsList items={5} products={relatedProducts} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailsPage;
