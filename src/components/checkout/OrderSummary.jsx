import React from "react";

const OrderSummary = ({ cart }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>

      {/* Items */}
      <div className="space-y-4">
        {cart?.items?.map((item) => (
          <div key={item.product} className="flex gap-4 items-center">
            {/* Product Image */}
            <img
              src={item.image || "/placeholder.png"}
              alt={item.title}
              className="w-20 h-20 rounded-xl object-cover border border-gray-200"
            />

            {/* Product Info */}
            <div className="flex-1 flex flex-col justify-between">
              <p className="text-gray-800 font-medium text-base">
                {item.title}
              </p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-gray-500 text-sm">
                  Qty: {item.quantity}
                </span>
                <span className="text-gray-900 font-semibold text-base">
                  Rs {item.lineTotal}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <hr className="my-6 border-gray-200" />

      {/* Price Breakdown */}
      <div className="space-y-3 text-gray-700 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-medium">Rs {cart.totalAmount}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span className="font-medium">Rs {cart.shippingFee}</span>
        </div>
        {cart.discount > 0 && (
          <div className="flex justify-between text-green-600 font-medium">
            <span>Discount</span>
            <span>-Rs {cart.discount}</span>
          </div>
        )}
      </div>

      {/* Total */}
      <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
        <span className="text-lg font-semibold text-gray-800">Total</span>
        <span className="text-lg font-bold text-gray-900">
          Rs {cart.grandTotal}
        </span>
      </div>
    </div>
  );
};

export default OrderSummary;
