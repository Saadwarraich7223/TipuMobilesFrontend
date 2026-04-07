import React from "react";

const ProductsListingSkeleton = () => {
  return (
    <section className="p-2">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Sidebar Filter Skeleton */}
        <div className="hidden md:block w-[20%] space-y-2">
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="animate-pulse h-6 bg-gray-300 rounded"
              ></div>
            ))}
        </div>

        {/* Main Content Skeleton */}
        <div className="w-full md:w-[80%] flex flex-col gap-4">
          {/* Toolbar Skeleton */}
          <div className="flex flex-col sm:flex-row justify-between items-center p-2 px-4 mb-3 bg-gray-100 rounded-lg gap-3">
            <div className="flex items-center gap-2">
              <div className="animate-pulse w-10 h-10 rounded-full bg-gray-300"></div>
              <div className="animate-pulse w-10 h-10 rounded-full bg-gray-300"></div>
            </div>
            <div className="animate-pulse w-32 h-8 bg-gray-300 rounded"></div>
          </div>

          {/* Products List Skeleton */}
          <div className="flex flex-col gap-3">
            {Array(10)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse border border-gray-200 rounded-lg p-4 flex gap-4 bg-white"
                >
                  {/* Image Placeholder */}
                  <div className="bg-gray-300 h-24 w-24 rounded-md flex-shrink-0"></div>

                  {/* Text Placeholder */}
                  <div className="flex-1 flex flex-col gap-2 justify-center">
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                  </div>

                  {/* Price/Action Placeholder */}
                  <div className="flex flex-col justify-between gap-2">
                    <div className="h-4 bg-gray-300 rounded w-16"></div>
                    <div className="h-8 bg-gray-300 rounded w-20"></div>
                  </div>
                </div>
              ))}
          </div>

          {/* Pagination Skeleton */}
          <div className="flex justify-center mt-4 gap-2">
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse w-10 h-10 bg-gray-300 rounded"
                ></div>
              ))}
          </div>
        </div>
      </div>

      {/* Mobile Filter Skeleton */}
      <div className="block md:hidden mt-4 flex gap-2 justify-between">
        <div className="animate-pulse h-10 w-20 bg-gray-300 rounded"></div>
        <div className="animate-pulse h-10 w-20 bg-gray-300 rounded"></div>
      </div>
    </section>
  );
};

export default ProductsListingSkeleton;
