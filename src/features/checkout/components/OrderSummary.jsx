import React from "react";

const OrderSummary = ({ cart }) => {
  return (
    <div className="surface-raised border-[#ddd4c8]/60 rounded-2xl p-4 sm:p-6">
      <h2 className="text-lg sm:text-2xl font-bold text-[#171717] mb-5">
        Order Summary
      </h2>

      {/* Items */}
      <div className="space-y-3 sm:space-y-4">
        {cart?.items?.map((item) => (
          <div key={item.product} className="flex gap-4 items-center">
            {/* Product Image */}
            <img
              src={item.image || "/placeholder.png"}
              alt={item.title}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border border-[#ddd4c8]/60 bg-white/60"
            />

            {/* Product Info */}
            <div className="flex-1 flex flex-col justify-between">
              <p className="text-[#171717] font-medium text-sm sm:text-base">
                {item.title}
              </p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-[#6b5e54] text-xs sm:text-sm">
                  Qty: {item.quantity}
                </span>
                <span className="text-[#171717] font-semibold text-sm sm:text-base">
                  Rs {item.lineTotal}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <hr className="my-5 border-[#e6ded4]" />

      {/* Price Breakdown */}
      <div className="space-y-2 sm:space-y-3 text-[#4f4a43] text-xs sm:text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-medium">Rs {cart.totalAmount}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span className="font-medium">Rs {cart.shippingFee}</span>
        </div>
        {cart.discount > 0 && (
          <div className="flex justify-between text-[#3d6b5a] font-medium">
            <span>Discount</span>
            <span>-Rs {cart.discount}</span>
          </div>
        )}
      </div>

      {/* Total */}
      <div className="flex justify-between items-center mt-5 pt-4 border-t border-[#e6ded4]">
        <span className="text-base sm:text-lg font-semibold text-[#171717]">
          Total
        </span>
        <span className="text-base sm:text-lg font-bold text-[#171717]">
          Rs {cart.grandTotal}
        </span>
      </div>
    </div>
  );
};

export default OrderSummary;
