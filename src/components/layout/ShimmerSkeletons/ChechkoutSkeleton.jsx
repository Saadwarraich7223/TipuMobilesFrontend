import React from "react";

const SkeletonBlock = ({ className }) => (
  <div className={`bg-gray-200 animate-pulse rounded-md ${className}`} />
);

const CheckoutSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Stepper Skeleton */}
      <div className="flex justify-between mb-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex flex-col items-center w-1/3">
            <SkeletonBlock className="w-8 h-8 mb-2 rounded-full" />
            <SkeletonBlock className="w-16 h-3" />
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Form Skeleton */}
        <div className="lg:col-span-2 space-y-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="space-y-4">
              <SkeletonBlock className="w-1/3 h-6 mb-2" />
              <SkeletonBlock className="w-full h-12" />
              <SkeletonBlock className="w-full h-12" />
              <SkeletonBlock className="w-3/4 h-12" />
            </div>
          ))}
          {/* Buttons Skeleton */}
          <div className="flex justify-between mt-6">
            <SkeletonBlock className="w-24 h-10" />
            <SkeletonBlock className="w-32 h-10 ml-auto" />
          </div>
        </div>

        {/* Right: Order Summary Skeleton */}
        <div className="lg:col-span-1 space-y-4">
          <SkeletonBlock className="w-full h-6 mb-4" />
          {[...Array(4)].map((_, i) => (
            <SkeletonBlock key={i} className="w-full h-12 mb-2" />
          ))}
          <SkeletonBlock className="w-full h-10 mt-4" />
        </div>
      </div>
    </div>
  );
};

export default CheckoutSkeleton;
