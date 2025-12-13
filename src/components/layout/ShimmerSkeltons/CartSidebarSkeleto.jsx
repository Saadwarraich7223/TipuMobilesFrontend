const CartSidebarSkeleton = () => {
  return (
    <div className="fixed inset-0 z-[60] bg-black/50 flex justify-end">
      <div className="relative w-[90%] sm:w-[380px] h-screen bg-white shadow-xl animate-slideInRight flex flex-col animate-pulse">
        {/* Header */}
        <div className="border-b border-gray-200 py-3 px-4 flex items-center justify-between bg-gray-50">
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
          <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-3 sm:px-4 py-4 space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-start gap-3 border-b border-gray-200 pb-3"
            >
              {/* Image */}
              <div className="w-[25%] h-[75px] bg-gray-200 rounded-md"></div>

              {/* Text content */}
              <div className="flex-1 space-y-2">
                <div className="h-4 w-40 bg-gray-200 rounded"></div>
                <div className="flex justify-between items-center">
                  <div className="h-4 w-16 bg-gray-200 rounded"></div>
                  <div className="h-4 w-12 bg-gray-200 rounded"></div>
                </div>
              </div>

              {/* Delete button */}
              <div className="h-6 w-6 bg-gray-200 rounded-md"></div>
            </div>
          ))}
        </div>

        {/* Bottom Info */}
        <div className="border-t border-gray-200 px-4 py-3 space-y-3">
          <div className="flex justify-between">
            <div className="h-4 w-20 bg-gray-200 rounded"></div>
            <div className="h-4 w-14 bg-gray-200 rounded"></div>
          </div>

          <div className="flex justify-between">
            <div className="h-4 w-28 bg-gray-200 rounded"></div>
            <div className="h-4 w-16 bg-gray-200 rounded"></div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <div className="h-10 w-1/2 bg-gray-200 rounded-md"></div>
            <div className="h-10 w-1/2 bg-gray-200 rounded-md"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSidebarSkeleton;
