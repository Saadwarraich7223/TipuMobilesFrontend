import { Suspense } from "react";

const LazySection = ({ children, minHeight = 300 }) => {
  return (
    <Suspense
      fallback={
        <div
          style={{ minHeight }}
          className="w-full bg-gray-100 animate-pulse rounded-xl"
        />
      }
    >
      {children}
    </Suspense>
  );
};

export default LazySection;
