export default function ReviewSkeleton() {
  return (
    <div className="bg-white p-3 md:p-4 border border-gray-300 rounded-md shadow-sm animate-pulse">
      {/* Top: Avatar + Name */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        <div className="flex flex-col gap-1">
          <div className="w-24 h-3 bg-gray-300 rounded"></div>
          <div className="w-16 h-3 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Stars */}
      <div className="flex gap-1 mb-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="w-4 h-4 bg-gray-300 rounded-sm"></div>
        ))}
      </div>

      {/* Title */}
      <div className="w-40 h-3 bg-gray-300 rounded mb-2"></div>

      {/* Comment lines */}
      <div className="w-full h-3 bg-gray-200 rounded mb-1"></div>
      <div className="w-3/4 h-3 bg-gray-200 rounded mb-3"></div>

      {/* Helpful button */}
      <div className="w-32 h-3 bg-gray-300 rounded"></div>
    </div>
  );
}
