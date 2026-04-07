const ProductSkeleton = () => {
  return (
    <div
      className="relative flex flex-col rounded-2xl overflow-hidden 
                 border border-[#ddd4c8]/50 bg-white
                 animate-pulse"
    >
      {/* Image */}
      <div className="relative m-2 rounded-xl overflow-hidden bg-gray-200 aspect-[1/1]" />

      {/* Badges */}
      <div className="absolute top-4 left-4 flex flex-col gap-2">
        <div className="h-4 w-10 bg-gray-200 rounded-full" />
        <div className="h-4 w-12 bg-gray-200 rounded-full" />
      </div>

      {/* Wishlist Button */}
      <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-200" />

      {/* Content */}
      <div className="px-4 pb-4 pt-2">
        {/* Category + Rating */}
        <div className="flex items-center justify-between mb-2">
          <div className="h-3 w-20 bg-gray-200 rounded" />
          <div className="h-3 w-10 bg-gray-200 rounded" />
        </div>

        {/* Title */}
        <div className="h-4 w-full bg-gray-200 rounded mb-2" />
        <div className="h-4 w-3/4 bg-gray-200 rounded mb-3" />

        {/* Price + Arrow */}
        <div className="flex items-center justify-between mt-2">
          <div className="h-5 w-16 bg-gray-200 rounded" />
          <div className="w-8 h-8 bg-gray-200 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
