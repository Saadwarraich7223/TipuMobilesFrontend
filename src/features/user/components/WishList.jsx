import { Heart, ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";

import { addToCart } from "../../cart/store/cartSlice";
import { toggleWishlist } from "../../auth/store/authSlice";

const WishList = () => {
  const dispatch = useDispatch();
  const { wishList } = useSelector((state) => state.auth);
  const [loadingId, setLoadingId] = useState(null);

  const removeFromWishlist = (id) => {
    dispatch(toggleWishlist(id));
  };

  const moveToCart = async (id) => {
    try {
      setLoadingId(id);
      await dispatch(addToCart({ productId: id })).unwrap();
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl md:text-3xl text-[#171717]">
          My Wishlist
        </h1>
        <div className="text-xs sm:text-sm text-[#6b5e54]">
          {wishList?.length || 0} {wishList?.length === 1 ? "item" : "items"}
        </div>
      </div>

      {wishList?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {wishList.map((item) => {
            const inStock =
              item.countInStock === undefined ? true : item.countInStock > 0;

            return (
              <div
                key={item._id}
                className="surface-raised rounded-2xl border-[#ddd4c8]/60 overflow-hidden group hover:shadow-md transition-shadow"
              >
                <div className="relative">
                  <img
                    src={item.images?.[0] || "/image.png"}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  <button
                    onClick={() => removeFromWishlist(item._id)}
                    className="absolute top-2 right-2 p-2 bg-white/90 rounded-full shadow-md hover:bg-red-50 transition-colors"
                  >
                    <X className="w-4 h-4 text-red-500" />
                  </button>
                  {!inStock && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs">
                      Out of Stock
                    </div>
                  )}
                </div>
                <div className="p-3 sm:p-4">
                  <h3 className="mb-2 line-clamp-1 text-[#171717] text-sm sm:text-base">
                    {item.title}
                  </h3>
                  <p className="text-lg sm:text-xl text-[#8a6b47] mb-3 sm:mb-4 font-semibold">
                    Rs {item.salePrice || item.price}
                  </p>
                  <button
                    onClick={() => moveToCart(item._id)}
                    disabled={!inStock || loadingId === item._id}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#171717] hover:bg-black text-white py-2 rounded-xl disabled:opacity-60 text-sm"
                  >
                    {loadingId === item._id ? (
                      <ClipLoader size={16} color="#fff" />
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="surface-raised rounded-2xl border-[#ddd4c8]/60 p-8 sm:p-12 text-center">
          <Heart className="w-12 h-12 sm:w-16 sm:h-16 text-[#8a6b47]/60 mx-auto mb-3 sm:mb-4" />
          <h3 className="text-lg sm:text-xl mb-2 text-[#171717]">
            Your Wishlist is Empty
          </h3>
          <p className="text-sm sm:text-base text-[#6b5e54] mb-4 sm:mb-6">
            Start adding items to your wishlist to save them for later.
          </p>
        </div>
      )}
    </div>
  );
};

export default WishList;
