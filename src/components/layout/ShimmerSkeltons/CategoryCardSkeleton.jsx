const CategoryCardSkeleton = () => {
  return (
    <div className="flex-shrink-0 scroll-snap-align-start animate-pulse">
      <div
        className="
          bg-white
          border border-gray-200
          rounded-xl
          p-4
          w-[96px] h-[110px]
          sm:w-[110px] sm:h-[125px]
          md:w-[130px] md:h-[145px]
          flex flex-col items-center justify-between
        "
      >
        {/* Circle for image */}
        <div
          className="
            w-12 h-12 md:w-14 md:h-14
            rounded-full
            bg-gray-200
          "
        />

        {/* Bar for category name */}
        <div className="h-3 md:h-4 w-16 md:w-20 bg-gray-200 rounded mt-2" />
      </div>
    </div>
  );
};

export default CategoryCardSkeleton;
