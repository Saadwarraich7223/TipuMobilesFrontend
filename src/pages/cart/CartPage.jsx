import React, { useState } from "react";
import {
  IoClose,
  IoRemove,
  IoAdd,
  IoReturnUpBackOutline,
  IoBagOutline,
  IoStorefrontOutline,
  IoTrashOutline,
} from "react-icons/io5";
import { useAppContext } from "../../context/AppContext";
import { useCart } from "../../context/CartContext";
import CartSkeleton from "../../components/layout/ShimmerSkeltons/CartSkeleton";

const CartPage = () => {
  const { navigate } = useAppContext();
  const { cart, loading, updateCart, clearCart, removeItem } = useCart();

  const [promoCode, setPromoCode] = useState("");
  console.log(cart);

  const continueShopping = () => navigate("/products");

  const EmptyCart = () => (
    <div className=" bg-gray-50  m-auto mt-30 items-end flex  justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="relative mb-2">
          <div className="w-15 h-15 mx-auto bg-gray-200 rounded-full flex items-center justify-center shadow-inner">
            <IoBagOutline size={30} className="text-gray-400" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Your Cart is Empty
        </h2>
        <p className="text-gray-600 mb-6 text-sm leading-relaxed">
          Looks like you haven’t added anything yet. Start shopping now!
        </p>

        <button
          onClick={continueShopping}
          className="w-full bg-primary hover:bg-primary/90 text-white py-2 rounded-md font-semibold flex items-center justify-center gap-2 transition"
        >
          <IoStorefrontOutline size={18} />
          Continue Shopping
        </button>
      </div>
    </div>
  );

  if (cart?.items.length === 0) return <EmptyCart />;
  if (loading) return <CartSkeleton />;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
      <h2 className="text-lg md:text-xl font-semibold mb-6 text-gray-800">
        <span className="text-primary">{cart?.items.length}</span> Products in
        Your Cart
      </h2>

      {/* Main layout grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left section (cart items) */}
        <div className="lg:col-span-2 w-full">
          {/* Table Header (hidden on small screens) */}
          <div className="hidden md:grid grid-cols-12 gap-4 pb-3 border-b border-gray-200 text-sm font-semibold text-gray-700 uppercase">
            <div className="col-span-5">Product</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-3 text-center">Quantity</div>
            <div className="col-span-2 text-right">Subtotal</div>
          </div>

          {/* Items */}
          {cart?.items.map((item) => (
            <div
              key={item.product}
              className="flex flex-col md:grid md:grid-cols-12 gap-4 py-5 border-b border-gray-200 rounded-lg hover:bg-gray-50 transition"
            >
              {/* Image + Info */}
              <div className="flex items-center gap-3 col-span-5">
                <button
                  onClick={() => removeItem({ productId: item.product })}
                  className="text-gray-400 cursor-pointer hover:text-red-500 transition"
                >
                  <IoClose size={18} />
                </button>

                <div className="w-20 h-24 rounded-md overflow-hidden flex-shrink-0 bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <h3 className="text-sm sm:text-base font-medium text-gray-800">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">Brand: Samsung</p>
                  {/* Show price + subtotal inline on mobile */}
                  <div className="flex md:hidden mt-2 text-sm text-gray-600">
                    <span className="mr-4">Rs {item.price}</span>
                    <span className="ml-auto text-primary font-medium">
                      Rs {item.lineTotal}
                    </span>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="hidden md:flex col-span-2 justify-center items-center">
                <span className="text-gray-700 text-sm md:text-base">
                  Rs {item.price}
                </span>
              </div>

              {/* Quantity */}
              <div className="flex col-span-3 md:justify-center items-center">
                <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                  <button
                    onClick={() =>
                      item.quantity === 1
                        ? removeItem({ productId: item.product })
                        : updateCart({
                            productId: item.product,
                            quantity: item.quantity - 1,
                          })
                    }
                    className="p-2 cursor-pointer hover:bg-gray-50 text-gray-600"
                  >
                    <IoRemove size={14} />
                  </button>
                  <span className="px-4 py-1 text-sm min-w-[2.5rem] text-center border-l border-r border-gray-300">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      updateCart({
                        productId: item.product,
                        quantity: item.quantity + 1,
                      })
                    }
                    className="p-2 cursor-pointer hover:bg-gray-50 text-gray-600"
                  >
                    <IoAdd size={14} />
                  </button>
                </div>
              </div>

              {/* Subtotal */}
              <div className="hidden md:flex col-span-2 justify-end items-center">
                <span className="text-primary  font-semibold text-sm md:text-base">
                  Rs {item.lineTotal}
                </span>
              </div>
            </div>
          ))}

          {/* Buttons below items */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8">
            <button
              onClick={() => navigate("/products")}
              className="flex cursor-pointer  items-center justify-center gap-2 px-5 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition w-full sm:w-auto text-sm font-medium"
            >
              <IoReturnUpBackOutline size={18} />
              Continue Shopping
            </button>

            <button
              onClick={clearCart}
              className="flex items-center justify-center gap-2 px-5 py-3 border border-red-400 text-red-500 rounded-md hover:bg-red-100 transition w-full sm:w-auto text-sm font-medium"
            >
              <IoTrashOutline size={18} />
              Clear Cart
            </button>
          </div>
        </div>

        {/* Right section (totals) */}
        <div className="lg:col-span-1 w-full">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 sm:p-6 shadow-sm">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">
              Cart Totals
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>{cart?.totalItems} items</span>
                <span>Rs {cart?.subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>Free</span>
              </div>
            </div>

            {/* Promo Code */}
            <div className="mt-6 flex flex-col sm:flex-row">
              <input
                type="text"
                placeholder="Promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded sm:rounded-l-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 mb-3 sm:mb-0"
              />
              <button className="px-4 py-2 cursor-pointer bg-black text-white text-sm font-medium rounded sm:rounded-r-md hover:bg-gray-800">
                Add
              </button>
            </div>

            <div className="mt-6 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Total (incl. tax)</span>
                <span className="text-red-500 font-semibold">
                  Rs {cart?.totalAmount}
                </span>
              </div>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="w-full mt-6 bg-primary hover:bg-primary/90 text-white py-3 rounded-md font-semibold text-sm uppercase tracking-wide transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
