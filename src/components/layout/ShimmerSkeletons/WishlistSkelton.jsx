const WishlistSkeleton = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, idx) => (
        <div key={idx} className="bg-white p-3 rounded-xl shadow shimmer">
          {/* Image placeholder */}
          <div className="w-full h-40 bg-gray-200 rounded-lg mb-3"></div>

          {/* Title */}
          <div className="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>

          {/* Price */}
          <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
        </div>
      ))}
    </div>
  );
};

export default WishlistSkeleton;
