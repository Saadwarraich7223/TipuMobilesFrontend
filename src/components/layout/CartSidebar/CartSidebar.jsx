import { useAppContext } from "../../../context/AppContext";
import { useCart } from "../../../context/CartContext";
import { Trash } from "lucide-react";
import CartSidebarSkeleton from "../ShimmerSkeltons/CartSidebarSkeleto";

const CartSidebar = () => {
  const { setShowCartSidebar, navigate } = useAppContext();
  const { cart, removeItem, updateCart, loading } = useCart();

  if (loading) return <CartSidebarSkeleton />;

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/50 flex justify-end"
      onClick={() => setShowCartSidebar(false)}
    >
      <div
        className="relative w-[90%] sm:w-[380px] h-screen bg-white shadow-xl animate-slideInRight flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="border-b border-gray-200 py-3 px-4 flex items-center justify-between bg-gray-50">
          <h5 className="text-[15px] sm:text-base font-semibold uppercase tracking-wide text-gray-800">
            Shopping Cart ({cart?.totalItems})
          </h5>
          <button
            onClick={() => setShowCartSidebar(false)}
            className="text-3xl font-light hover:text-primary transition"
          >
            ×
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-3 sm:px-4 py-4 space-y-3 scrollbar-hide">
          {cart?.items.length === 0 && (
            <div className="text-center py-10 text-gray-500 text-sm">
              Your cart is empty.
            </div>
          )}

          {cart?.items.map((item) => (
            <div
              key={item.product}
              className="flex items-start gap-3 border-b border-gray-200 pb-3"
            >
              {/* Image */}
              <div className="w-[25%] h-[75px] sm:h-[80px] border border-gray-200 rounded-md overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex-1 text-[13px] sm:text-[14px] flex flex-col gap-1">
                <h3 className="font-semibold text-gray-800 line-clamp-2 leading-tight">
                  {item.title}
                </h3>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-2">
                    {/* Quantity - / + */}
                    <button
                      onClick={() =>
                        updateCart({
                          productId: item.product,
                          quantity: Math.max(0, item.quantity - 1),
                        })
                      }
                      className="px-2 py-0.5 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      -
                    </button>

                    <span className="font-medium">{item.quantity}</span>

                    <button
                      onClick={() =>
                        updateCart({
                          productId: item.product,
                          quantity: item.quantity + 1,
                        })
                      }
                      className="px-2 py-0.5 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>

                  <span className="font-semibold text-primary">
                    Rs {item.lineTotal}
                  </span>
                </div>
              </div>

              {/* Delete */}
              <button
                onClick={() => removeItem({ productId: item.product })}
                className="bg-primary/10 hover:bg-primary/20 text-primary p-1.5 rounded-md transition"
              >
                <Trash size={18} />
              </button>
            </div>
          ))}
        </div>

        {/* Bottom Info */}
        <div className="border-t border-gray-200 px-4 py-3 space-y-2 text-[13px] sm:text-[14px]">
          <div className="flex items-center justify-between font-medium text-gray-700">
            <span>{cart?.totalItems} items</span>
            <span className="text-primary font-semibold">
              Rs {cart?.subtotal}
            </span>
          </div>

          <div className="flex items-center justify-between font-semibold text-gray-800">
            <span>Total</span>
            <span className="text-primary">Rs {cart?.totalAmount}</span>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3 pt-3">
            <button
              className="w-1/2 bg-primary text-white font-semibold text-sm py-2.5 rounded-md hover:bg-primary/90 transition"
              onClick={() => {
                setShowCartSidebar(false);
                navigate("/cart");
              }}
            >
              View Cart
            </button>

            <button
              className="w-1/2 border border-primary text-primary font-semibold text-sm py-2.5 rounded-md hover:bg-gray-50 transition"
              onClick={() => {
                setShowCartSidebar(false);
                navigate("/checkout");
              }}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;
