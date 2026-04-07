const CartSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8 animate-pulse">
      {/* Title */}
      <div className="h-6 w-40 bg-gray-200 rounded mb-8"></div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT: List of Items */}
        <div className="lg:col-span-2 space-y-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex flex-col md:grid md:grid-cols-12 gap-4 py-5 border-b border-gray-200"
            >
              {/* Image + Title */}
              <div className="flex items-center gap-3 col-span-5">
                <div className="w-20 h-24 bg-gray-200 rounded-md"></div>

                <div className="space-y-3">
                  <div className="h-4 w-36 bg-gray-200 rounded"></div>
                  <div className="h-3 w-20 bg-gray-200 rounded"></div>
                </div>
              </div>

              {/* Price */}
              <div className="hidden md:flex col-span-2 justify-center items-center">
                <div className="h-4 w-16 bg-gray-200 rounded"></div>
              </div>

              {/* Quantity */}
              <div className="flex col-span-3 md:justify-center items-center">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 bg-gray-200 rounded"></div>
                  <div className="h-4 w-6 bg-gray-200 rounded"></div>
                  <div className="h-8 w-8 bg-gray-200 rounded"></div>
                </div>
              </div>

              {/* Subtotal */}
              <div className="hidden md:flex col-span-2 justify-end items-center">
                <div className="h-4 w-20 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT: Cart Totals */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 sm:p-6 shadow-sm space-y-4">
            <div className="h-5 w-32 bg-gray-200 rounded"></div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <div className="h-4 w-20 bg-gray-200 rounded"></div>
                <div className="h-4 w-14 bg-gray-200 rounded"></div>
              </div>
              <div className="flex justify-between">
                <div className="h-4 w-16 bg-gray-200 rounded"></div>
                <div className="h-4 w-10 bg-gray-200 rounded"></div>
              </div>
            </div>

            {/* Promo code */}
            <div className="h-10 bg-gray-200 rounded mt-4"></div>

            <div className="flex justify-between pt-4">
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
              <div className="h-4 w-20 bg-gray-200 rounded"></div>
            </div>

            <div className="h-10 w-full bg-gray-200 rounded mt-6"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSkeleton;
