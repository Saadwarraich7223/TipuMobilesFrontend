export default function ProductDetailsSkelton() {
  return (
    <div className="animate-pulse p-4 bg-gray-100 rounded-lg flex flex-col md:flex-row gap-8">
      {/* Image shimmer */}
      <div className="w-full md:w-[35%] h-[250px] sm:h-[400px] bg-gray-300 rounded-lg" />

      {/* Details shimmer */}
      <div className="w-full md:w-[62%] flex flex-col gap-4">
        <div className="h-6 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>

        <div className="h-5 bg-gray-300 rounded w-1/3"></div>

        <div className="h-6 bg-gray-300 rounded w-1/4 mt-4"></div>
        <div className="h-5 bg-gray-300 rounded w-1/2"></div>

        <div className="h-10 bg-gray-300 rounded w-[200px] mt-4"></div>
      </div>
    </div>
  );
}
