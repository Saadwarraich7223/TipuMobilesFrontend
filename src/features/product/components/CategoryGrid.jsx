import { Link } from "react-router-dom";
import { ArrowRight, Zap } from "lucide-react";
import { useCategoriesForHome } from "../../../features/product/queries/categories";

const CategoryGrid = () => {
  const { data: categories = [], isLoading } = useCategoriesForHome();

  if (isLoading) {
    const mobileSpans = [
      "col-span-2",
      "col-span-1",
      "col-span-3",
      "col-span-2",
      "col-span-1",
      "col-span-1",
      "col-span-1",
      "col-span-3",
    ];
    const desktopPattern = [
      "md:col-span-2 md:row-span-1",
      "md:col-span-1 md:row-span-1",
      "md:col-span-1 md:row-span-2",
      "md:col-span-2 md:row-span-1",
      "md:col-span-1 md:row-span-1",
      "md:col-span-1 md:row-span-1",
      "md:col-span-1 md:row-span-1",
      "md:col-span-2 md:row-span-1",
    ];
    return (
      <section className="px-4 md:px-12 py-10 max-w-7xl mx-auto">
        {/* Mobile Skeleton */}
        <div className="grid grid-cols-3 auto-rows-[70px] gap-2 md:hidden">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className={`${mobileSpans[i] || "col-span-1"} rounded-xl bg-gray-200`}
            />
          ))}
        </div>

        {/* Desktop Skeleton */}
        <div className="hidden md:grid grid-cols-6 gap-4 auto-rows-[160px]">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className={`${desktopPattern[i] || "md:col-span-1"} rounded-2xl bg-gray-200`}
            />
          ))}
        </div>
      </section>
    );
  }

  // Desktop Bento Pattern
  const pattern = [
    "md:col-span-2 md:row-span-1",
    "md:col-span-1 md:row-span-1",
    "md:col-span-1 md:row-span-2",
    "md:col-span-2 md:row-span-1",
    "md:col-span-1 md:row-span-1",
    "md:col-span-1 md:row-span-1",
    "md:col-span-1 md:row-span-1",
  ];

  const displayed = categories.slice(0, 7);

  return (
    <section className="px-4 md:px-12 py-5 md:py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-6 md:space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50/50 border border-purple-100 text-purple-500 text-xs font-semibold mb-3">
              <Zap size={10} className="fill-current" />
              Our Collections
            </div>

            <h2 className="text-xl md:text-3xl font-black text-gray-900">
              Explore Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
                Categories
              </span>
            </h2>
          </div>
        </div>

        {/* ================= MOBILE (MASONRY) ================= */}
        <div className="grid grid-cols-3 auto-rows-[70px] gap-2 md:hidden">
          {displayed.map((item, index) => {
            const spans = [
              "col-span-2",
              "col-span-1",
              "col-span-3",
              "col-span-2",
              "col-span-1",
              "col-span-1",
              "col-span-1",
            ];

            return (
              <div
                key={item._id || index}
                className={spans[index] || "col-span-1"}
              >
                <Link
                  to={`/products/${item.slug}`}
                  className="
                    relative rounded-xl overflow-hidden p-2
                    flex items-center justify-center text-center
                    bg-white border border-gray-200 h-full
                  "
                >
                  {/* Content */}
                  <span className="relative z-10 text-[11px] font-semibold text-gray-900 leading-tight line-clamp-2">
                    {item.name}
                  </span>
                </Link>
              </div>
            );
          })}

          {/* 🔥 Premium View All Card */}
          <div className="col-span-3">
            <Link
              to="/products/all"
              className="
            relative rounded-2xl overflow-hidden
            flex items-center justify-between px-4
            bg-gray-900
            border border-gray-800
            h-full
          "
            >
              <div className="relative z-10">
                <p className="text-[10px] text-purple-300 uppercase tracking-widest">
                  Explore
                </p>
                <p className="text-sm font-bold text-white">
                  View All Categories
                </p>
              </div>

              <div className="relative z-10 text-white text-lg">→</div>
            </Link>
          </div>
        </div>
        {/* ================= DESKTOP (BENTO) ================= */}
        <div className="hidden md:grid grid-cols-6 gap-4 auto-rows-[160px]">
          {displayed.map((item, index) => (
            <div
              key={item._id || index}
              className={pattern[index]}
            >
              <Link
                to={`/products/${item.slug}`}
                className="group relative h-full flex flex-col justify-end rounded-xl overflow-hidden border border-gray-200"
              >
                {/* Image */}
                <div className="absolute inset-0">
                  <img
                    src={`https://res.cloudinary.com/dti1kpfhi/image/upload/f_auto,q_auto,w_800/${item.image.public_id}`}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/30" />

                {/* Content */}
                <div className="relative z-10 p-5 text-white">
                  <h3 className="text-lg font-black">{item.name}</h3>

                  <div className="flex items-center gap-1 text-xs">
                    Explore <ArrowRight size={12} />
                  </div>
                </div>
              </Link>
            </div>
          ))}

          {/* View More */}
          <div className="col-span-2">
            <Link
              to="/products/all"
              className="group h-full flex items-center justify-between rounded-2xl p-6 bg-gray-900 text-white"
            >
              <div>
                <p className="text-xs text-purple-400 mb-1">Don't miss</p>
                <h3 className="text-lg font-black">
                  View All <br /> Categories
                </h3>
              </div>

              <ArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
