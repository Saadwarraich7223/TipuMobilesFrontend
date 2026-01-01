import { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ReviewsSection from "../../components/common/ReviewSection/ReviewSection";
import ProductsList from "../../components/product/ProductList/ProductsList";
import { useParams } from "react-router-dom";
import productsApi from "../../api/productsApi";
import ProductDetailsSkelton from "../../components/layout/ShimmerSkeltons/ProductDetailsSkelton";
import useCountdown from "../../hooks/useCountDown";
import { useCart } from "../../context/CartContext";
import toast from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";
import { ShoppingCart, Heart, Star } from "lucide-react";

const RatingStars = ({ rating = 0 }) => (
  <div className="flex items-center gap-[2px]">
    {[...Array(5)].map((_, i) =>
      i < rating ? (
        <Star key={i} fill="yellow" size={16} className="text-yellow-500" />
      ) : (
        <Star key={i} size={16} className="text-gray-300" />
      )
    )}
  </div>
);

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [isFlashSaleActive, setIsFlashSaleActive] = useState(false);

  const handleAddToCart = async () => {
    try {
      setAdding(true);
      const res = await addToCart({ productId: product._id, quantity });
      if (res) toast.success(res.message);
    } catch (error) {
      console.log(error);
    } finally {
      setAdding(false);
    }
  };

  useEffect(() => {
    const checkFlashSaleStatus = () => {
      const currentTime = new Date();
      const flashSaleEndTime = new Date(product.flashSaleEndTime);
      setIsFlashSaleActive(currentTime < flashSaleEndTime);
    };

    // Check flash sale status when component mounts
    checkFlashSaleStatus();

    const interval = setInterval(() => {
      checkFlashSaleStatus();
    }, 30000); // Check every 60 seconds

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, [product.flashSaleEndTime]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await productsApi.getProduct(id);

        const { product, salePrice, isInFlashSale, flashSaleEndTime } =
          res.data;
        setProduct({ ...product, salePrice, isInFlashSale, flashSaleEndTime });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const countdown = useCountdown(product.flashSaleEndTime);

  const handleIncrease = () => setQuantity((q) => q + 1);
  const handleDecrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));
  const handleVariantChange = (variant) => setSelectedVariant(variant);

  // Determine current price (flash sale > variant > normal)
  const getCurrentPrice = () => {
    if (isFlashSaleActive && product.salePrice) return product.salePrice;
    if (selectedVariant?.price) return selectedVariant.price;
    return product.price;
  };

  // Determine original price for strike-through
  const getOriginalPrice = () => {
    if (isFlashSaleActive && product.salePrice) return product.price;
    if (selectedVariant?.oldPrice) return selectedVariant.oldPrice;
    if (product.price < 0) {
      return product.oldPrice;
    }
  };

  if (loading) return <ProductDetailsSkelton />;

  return (
    <section className="bg-white flex flex-col gap-10">
      {/* ---------- TOP SECTION ---------- */}
      <div className="rounded-lg p-2 md:p-4 bg-gray-100 flex flex-col md:flex-row gap-4 md:gap-8 items-start">
        {/* ---- IMAGE SLIDER ---- */}
        <div className="w-full md:w-[35%] relative overflow-hidden rounded-lg bg-gray-50 border-gray-300 border">
          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true, type: "fraction" }}
            loop
            className="rounded-md product-slider"
          >
            {product?.images?.map((img, i) => (
              <SwiperSlide key={i}>
                <img
                  src={img}
                  alt={`Product ${i + 1}`}
                  className="w-full h-[250px] sm:h-[400px] object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* ---- DETAILS ---- */}
        <div className="w-full md:w-[62%] flex flex-col justify-center gap-2 md:gap-5 sm:px-4">
          <h1 className="text-lg capitalize sm:text-2xl font-semibold leading-tight">
            {product.title}
          </h1>

          <p className="text-gray-500 text-sm">
            Category:{" "}
            <span className="font-medium text-gray-700">
              {product.category?.name}
            </span>
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <span className="text-gray-600 text-sm font-medium">
              Brand:{" "}
              <span className="font-semibold text-gray-900">
                {product.brand || "N/A"}
              </span>
            </span>
            <RatingStars rating={product.averageRating} />
            <p className="text-gray-600 cursor-pointer text-sm font-medium">
              Reviews ({product.numReviews})
            </p>
          </div>

          {/* --- PRICE & STOCK --- */}
          <div className="flex flex-wrap items-center gap-2 mt-1">
            {getOriginalPrice() && (
              <span className="text-gray-400 line-through text-md md:text-lg font-semibold">
                Rs {getOriginalPrice()}
              </span>
            )}
            <span
              className={`font-bold text-lg md:text-xl ${
                isFlashSaleActive ? "text-red-600" : "text-primary"
              }`}
            >
              Rs {getCurrentPrice()}
            </span>
            <span className="text-gray-600 md:ml-4 text-xs md:text-sm">
              In Stock:{" "}
              <span
                className={`font-bold ${
                  (selectedVariant?.stock || product.stock) > 0
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {selectedVariant?.stock || product.stock} items
              </span>
            </span>
          </div>

          {/* --- Flash Sale Badge --- */}
          {isFlashSaleActive && (
            <div className="w-full mt-3 flex flex-col sm:flex-row justify-between items-center bg-gradient-to-r from-red-500 to-red-600 text-white text-sm sm:text-base font-bold px-4 py-2 rounded-lg shadow-lg border border-red-700">
              <span className="flex items-center gap-2">
                🔥 On Sale -{" "}
                <span className="bg-white text-red-600 px-2 py-0.5 rounded text-xs font-semibold">
                  {Math.round(
                    ((product.price - product.salePrice) / product.price) * 100
                  )}
                  % Off
                </span>
              </span>
              <span className="mt-2 sm:mt-0 text-white/90 text-xs sm:text-sm">
                Ends in:{" "}
                {`${countdown.days || 0}d ${countdown.hours || 0}h ${
                  countdown.minutes || 0
                }m`}{" "}
                {countdown.seconds}s
              </span>
            </div>
          )}

          {/* --- Variants --- */}
          {product.variants?.length > 0 && (
            <div className="flex flex-col gap-2 mt-2">
              <label className="text-sm font-medium text-gray-700">
                Choose Variant:
              </label>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((variant, index) => (
                  <button
                    key={index}
                    onClick={() => handleVariantChange(variant)}
                    className={`px-3 py-1.5 border rounded-md md:text-sm text-xs font-medium transition-all ${
                      selectedVariant?.sku === variant.sku
                        ? "bg-primary text-white border-primary"
                        : "bg-white text-gray-700 border-gray-300 hover:border-primary"
                    }`}
                  >
                    {variant.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* --- Description --- */}
          <p className="text-gray-700 text-xs md:text-sm leading-relaxed mt-2">
            {product.description}
          </p>

          {product.isFreeShipping && (
            <p className="text-gray-600 text-xs md:text-sm font-medium mt-1">
              🚚 Free Shipping (Est. Delivery: 2–3 Days)
            </p>
          )}

          {/* --- Quantity & Add to Cart --- */}
          <div className="flex flex-wrap items-center gap-2 md:gap-4 mt-3">
            <div className="flex items-center border border-gray-300 rounded-md">
              <button
                onClick={handleDecrease}
                className="px-3 py-1 text-gray-700 hover:bg-gray-100 transition"
              >
                -
              </button>
              <span className="px-3 py-1 text-gray-800 font-medium">
                {quantity}
              </span>
              <button
                onClick={handleIncrease}
                className="px-3 py-1 text-gray-700 hover:bg-gray-100 transition"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="text-primary hover:text-white hover:bg-primary border-primary border px-6 py-2 flex items-center gap-2 rounded-md cursor-pointer md:text-sm text-xs sm:text-base font-semibold duration-300 transition-all"
            >
              {adding ? (
                <ClipLoader size={14} color="#ffffff" />
              ) : (
                <>
                  <ShoppingCart size={20} className="md:text-sm text-xs" />
                  Add to Cart
                </>
              )}
            </button>
          </div>

          {/* Wishlist & Compare */}
          <div className="flex items-center gap-6 mt-2">
            <span className="flex items-center gap-2 cursor-pointer text-gray-600 text-sm font-medium hover:text-primary transition">
              <Heart size={18} /> Add to Wishlist
            </span>
          </div>
        </div>
      </div>

      {/* ---------- REVIEW SECTION ---------- */}
      <div className="px-1 bg-gray-50 md:px-4 rounded-lg border border-gray-200">
        <ReviewsSection id={product._id} />
      </div>

      {/* ---------- RELATED PRODUCTS ---------- */}
      <div className="container">
        <h2 className="text-lg sm:text-2xl font-bold text-gray-900 mb-2">
          Related Products
        </h2>
        <ProductsList items={5} />
      </div>
    </section>
  );
};

export default ProductDetailsPage;
