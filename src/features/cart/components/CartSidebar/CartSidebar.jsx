import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Trash, X, Minus, Plus, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { setShowCartSidebar } from "../../../../store/uiSlice";
import { removeItem, updateCart } from "../../store/cartSlice";
import CartSidebarSkeleton from "../../../../components/layout/ShimmerSkeletons/CartSidebarSkeleton";

const CartSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cart, loading } = useSelector((state) => state.cart);

  if (loading) return <CartSidebarSkeleton />;

  const handleClose = () => dispatch(setShowCartSidebar(false));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm flex justify-end"
      onClick={handleClose}
    >
      <motion.div
        initial={{ opacity: 0, x: 40, scale: 0.98 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-[92%] sm:w-[400px] h-screen animate-slideInRight flex flex-col
                   bg-white/80 backdrop-blur-xl border-l border-[#ddd4c8]/60 shadow-[0_30px_80px_rgba(23,23,23,0.18)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 pt-5 pb-4 border-b border-[#e6ded4]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#8a6b47]/70 font-semibold">
                Your Bag
              </p>
              <h5 className="text-[18px] font-bold text-[#171717]">
                Shopping Cart
              </h5>
              <div className="mt-2 inline-flex items-center gap-2 text-[11px] font-semibold text-[#4f4a43] bg-white/70 border border-[#ddd4c8]/70 rounded-full px-2.5 py-1">
                <ShoppingBag size={12} />
                <span>{cart?.totalItems || 0} items</span>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="w-9 h-9 rounded-full border border-[#ddd4c8]/70 bg-white/70 hover:bg-white transition flex items-center justify-center text-[#171717]"
              aria-label="Close cart"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-hide">
          {(!cart || cart.items.length === 0) && (
            <div className="text-center py-12 text-[#6b5e54] text-sm">
              <div className="mx-auto mb-3 w-14 h-14 rounded-2xl bg-white/70 border border-[#ddd4c8]/60 flex items-center justify-center">
                <ShoppingBag size={22} className="text-[#8a6b47]" />
              </div>
              Your cart is empty.
            </div>
          )}

          {cart?.items.map((item) => (
            <div
              key={item.product}
              className="flex items-start gap-3 p-3 rounded-2xl surface-raised border-[#ddd4c8]/50"
            >
              {/* Image */}
              <div className="w-[26%] h-[80px] rounded-xl overflow-hidden border border-white/70 bg-white/60">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex-1 text-[13px] sm:text-[14px] flex flex-col gap-2">
                <h3 className="font-semibold text-[#171717] line-clamp-2 leading-tight">
                  {item.title}
                </h3>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-2 bg-white/70 border border-[#ddd4c8]/70 rounded-full px-2 py-1">
                    {/* Quantity - / + */}
                    <button
                      onClick={() =>
                        dispatch(
                          updateCart({
                            productId: item.product,
                            quantity: Math.max(0, item.quantity - 1),
                          }),
                        )
                      }
                      className="w-7 h-7 rounded-full bg-white border border-[#ddd4c8]/70 hover:bg-white transition flex items-center justify-center text-[#4f4a43]"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={12} />
                    </button>

                    <span className="min-w-[16px] text-center font-semibold text-[#171717] text-xs">
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

                  <span className="font-bold text-[#4f4a43]">
                    Rs {item.lineTotal}
                  </span>
                </div>
              </div>

              {/* Delete */}
              <button
                onClick={() =>
                  dispatch(removeItem({ productId: item.product }))
                }
                className="w-8 h-8 rounded-full border border-[#ddd4c8]/70 bg-white/70 hover:bg-white transition flex items-center justify-center text-[#8a6b47]"
                aria-label="Remove item"
              >
                <Trash size={14} />
              </button>
            </div>
          ))}
        </div>

        {/* Bottom Info */}
        <div className="border-t border-[#e6ded4] px-5 py-4 space-y-3 text-[13px] sm:text-[14px] bg-white/70 backdrop-blur-sm">
          <div className="flex items-center justify-between font-medium text-[#6b5e54]">
            <span>{cart?.totalItems || 0} items</span>
            <span className="font-semibold text-[#4f4a43]">
              Rs {cart?.subtotal || 0}
            </span>
          </div>

          <div className="flex items-center justify-between font-semibold text-[#171717]">
            <span>Total</span>
            <span className="text-[#171717]">Rs {cart?.totalAmount || 0}</span>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              className="w-1/2 bg-[#171717] text-white font-semibold text-sm py-2.5 rounded-xl hover:bg-black transition"
              onClick={() => {
                handleClose();
                navigate("/cart");
              }}
            >
              View Cart
            </button>

            <button
              className="w-1/2 border border-[#171717] text-[#171717] font-semibold text-sm py-2.5 rounded-xl hover:bg-white transition"
              onClick={() => {
                handleClose();
                navigate("/checkout");
              }}
            >
              Checkout
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CartSidebar;
