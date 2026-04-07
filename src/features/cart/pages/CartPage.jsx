import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  X,
  Minus,
  Plus,
  CornerUpLeft,
  ShoppingBag,
  Store,
  Trash2,
} from "lucide-react";

import { updateCart, clearCart, removeItem } from "../store/cartSlice";
import CartSkeleton from "../../../components/layout/ShimmerSkeletons/CartSkeleton";
import AuthRequiredModal from "../../auth/components/AuthRequiredModal";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { cart, loading } = useSelector((state) => state.cart);

  const [promoCode, setPromoCode] = useState("");
  const [showAuthModal, setShowAuthModal] = useState(false);

  const continueShopping = () => navigate("/products");

  const handleMoveToCheckout = () => {
    if (user) {
      navigate("/checkout");
    } else {
      setShowAuthModal(true);
    }
  };

  const EmptyCart = () => {
    return (
      <div className="flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-lg surface-raised rounded-3xl p-8 sm:p-10 text-center border-[#ddd4c8]/60">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/70 border border-[#ddd4c8]/70">
            <ShoppingBag size={32} className="text-[#8a6b47]" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-[#171717]">
            Your cart is empty
          </h2>

          <p className="mt-3 text-sm sm:text-base text-[#6b5e54] leading-relaxed">
            You haven’t added any items yet. Browse our products and start
            building your cart.
          </p>

          <button
            onClick={continueShopping}
            className="mt-8 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#171717] px-5 py-3 text-white font-semibold hover:bg-black transition"
          >
            <Store size={18} />
            Continue shopping
          </button>
        </div>
      </div>
    );
  };

  if (loading) return <CartSkeleton />;
  if (!cart?.items || cart.items.length === 0) return <EmptyCart />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-[#8a6b47]/70 font-semibold">
            Premium Cart
          </p>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#171717]">
            <span className="text-[#8a6b47]">{cart.items.length}</span> items in
            your cart
          </h2>
        </div>
        <div className="inline-flex items-center gap-2 text-[11px] font-semibold text-[#4f4a43] bg-white/70 border border-[#ddd4c8]/70 rounded-full px-3 py-1">
          <ShoppingBag size={12} />
          <span>{cart.totalItems} products</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <div className="lg:col-span-2 w-full space-y-4">
          <div className="hidden md:grid grid-cols-12 gap-4 pb-3 border-b border-[#e6ded4] text-[11px] font-semibold text-[#6b5e54] uppercase tracking-wider">
            <div className="col-span-5">Product</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-3 text-center">Quantity</div>
            <div className="col-span-2 text-right">Subtotal</div>
          </div>

          {cart.items.map((item) => (
            <div
              key={item.product}
              className="flex flex-col md:grid md:grid-cols-12 gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl surface-raised border-[#ddd4c8]/50"
            >
              <div className="flex items-center gap-3 sm:gap-4 col-span-5">
                <button
                  onClick={() =>
                    dispatch(removeItem({ productId: item.product }))
                  }
                  className="w-8 h-8 rounded-full border border-[#ddd4c8]/70 bg-white/70 hover:bg-white transition flex items-center justify-center text-[#8a6b47]"
                  aria-label="Remove item"
                >
                  <X size={14} />
                </button>
                <div className="w-16 h-20 sm:w-20 sm:h-24 rounded-xl overflow-hidden flex-shrink-0 bg-white/60 border border-white/70">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-[#171717]">
                    {item.title}
                  </h3>
                  <div className="flex md:hidden mt-2 text-xs sm:text-sm text-[#6b5e54]">
                    <span className="mr-4">Rs {item.price}</span>
                    <span className="ml-auto text-[#4f4a43] font-semibold">
                      Rs {item.lineTotal}
                    </span>
                  </div>
                </div>
              </div>

              <div className="hidden md:flex col-span-2 justify-center items-center text-[#4f4a43] font-semibold">
                Rs {item.price}
              </div>

              <div className="flex col-span-3 justify-center items-center">
                <div className="flex items-center gap-2 bg-white/70 border border-[#ddd4c8]/70 rounded-full px-2 py-1">
                  <button
                    onClick={() =>
                      item.quantity === 1
                        ? dispatch(removeItem({ productId: item.product }))
                        : dispatch(
                            updateCart({
                              productId: item.product,
                              quantity: item.quantity - 1,
                            }),
                          )
                    }
                    className="w-7 h-7 rounded-full bg-white border border-[#ddd4c8]/70 hover:bg-white transition flex items-center justify-center text-[#4f4a43]"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="px-2 text-xs min-w-[2rem] text-center font-semibold text-[#171717]">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      dispatch(
                        updateCart({
                          productId: item.product,
                          quantity: item.quantity + 1,
                        }),
                      )
                    }
                    className="w-7 h-7 rounded-full bg-white border border-[#ddd4c8]/70 hover:bg-white transition flex items-center justify-center text-[#4f4a43]"
                    aria-label="Increase quantity"
                  >
                    <Plus size={12} />
                  </button>
                </div>
              </div>

              <div className="hidden md:flex col-span-2 justify-end items-center text-[#4f4a43] font-semibold">
                Rs {item.lineTotal}
              </div>
            </div>
          ))}

          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 pt-2">
            <button
              onClick={() => navigate("/products")}
              className="flex items-center justify-center gap-2 px-4 sm:px-5 py-3 border border-[#ddd4c8] rounded-xl hover:bg-white/70 transition w-full sm:w-auto text-sm font-semibold text-[#4f4a43]"
            >
              <CornerUpLeft size={18} />
              Continue Shopping
            </button>

            <button
              onClick={() => dispatch(clearCart())}
              className="flex items-center justify-center gap-2 px-4 sm:px-5 py-3 border border-red-300 text-red-500 rounded-xl hover:bg-red-50/70 transition w-full sm:w-auto text-sm font-semibold"
            >
              <Trash2 size={18} />
              Clear Cart
            </button>
          </div>
        </div>

        <div className="lg:col-span-1 w-full">
          <div className="surface-raised border-[#ddd4c8]/60 rounded-2xl p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-bold text-[#171717] mb-4">
              Cart Summary
            </h3>

            <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-[#6b5e54]">
              <div className="flex justify-between">
                <span>{cart.totalItems} items</span>
                <span>Rs {cart.subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
            </div>

            <div className="mt-4 sm:mt-5 flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 px-3 py-2 border border-[#ddd4c8]/70 rounded-xl text-sm bg-white/70 focus:outline-none focus:ring-1 focus:ring-[#8a6b47]/40"
              />
              <button className="px-4 py-2 bg-[#171717] text-white text-sm font-semibold rounded-xl hover:bg-black transition">
                Add
              </button>
            </div>

            <div className="mt-5 sm:mt-6 flex justify-between text-sm font-semibold text-[#171717]">
              <span>Total (incl. tax)</span>
              <span>Rs {cart.totalAmount}</span>
            </div>

            <button
              onClick={handleMoveToCheckout}
              disabled={cart.items.length === 0}
              className={`w-full mt-5 sm:mt-6 py-3 rounded-xl text-sm font-semibold uppercase tracking-wide transition ${
                cart.items.length
                  ? "bg-[#171717] text-white hover:bg-black"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }`}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
      <AuthRequiredModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLogin={() => navigate("/login")}
        onRegister={() => navigate("/register")}
      />
    </div>
  );
};

export default CartPage;
