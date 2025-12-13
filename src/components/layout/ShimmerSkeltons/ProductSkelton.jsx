import React from "react";

const ProductSkeleton = () => {
  return (
    <div className="animate-pulse bg-white shadow-sm rounded-md p-4 w-full">
      <div className="h-40 bg-gray-200 rounded-md mb-3"></div>

      <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded mb-2 w-1/2"></div>

      <div className="h-5 bg-gray-200 rounded mt-4 w-1/3"></div>
    </div>
  );
};

export default ProductSkeleton;
