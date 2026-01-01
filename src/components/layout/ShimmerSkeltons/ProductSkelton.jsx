const ProductSkeleton = () => {
  return (
    <div className="w-full rounded-xl border border-gray-200 p-3 min-h-[320px]">
      <div className="aspect-[1/1] bg-gray-200 rounded-lg animate-pulse" />
      <div className="mt-3 h-4 bg-gray-200 rounded animate-pulse" />
      <div className="mt-2 h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
      <div className="mt-3 h-8 bg-gray-200 rounded animate-pulse" />
    </div>
  );
};
export default ProductSkeleton;
