import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import ProductSkeleton from "../../../components/layout/ShimmerSkeletons/ProductSkelton";
import ProductsList from "./ProductsList";
import { FileX, Zap } from "lucide-react";
import { useCategoriesForHome } from "../queries/categories";
import { useCategoryProducts } from "../queries/products";
import { useQueryClient } from "@tanstack/react-query";
import categoriesApi from "../api/categoriesApi";

const PopularProducts = () => {
  const { data: categories = [], isLoading: categoriesLoading } =
    useCategoriesForHome();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState(null);

  /* Set default category once */
  useEffect(() => {
    if (!activeTab && categories.length > 0) {
      setActiveTab(categories[0]);
    }
  }, [categories, activeTab]);

  /* ================= Products ================= */
  const { data, isLoading: productsLoading } = useCategoryProducts(
    activeTab?.slug,
    {},
  );

  /* Prefetch a few categories for instant tab switching */
  useEffect(() => {
    if (!categories.length) return;
    const defaultFilters = {};
    const filterKey = JSON.stringify(defaultFilters);
    const prefetchTargets = categories.slice(0, 3);
    prefetchTargets.forEach((cat) => {
      if (!cat?.slug) return;
      queryClient.prefetchQuery({
        queryKey: ["category-products", cat.slug, filterKey],
        queryFn: async () => {
          const res = await categoriesApi.getProductsByCategory(
            cat.slug,
            defaultFilters,
          );
          return res?.data ?? res;
        },
        staleTime: 1000 * 60 * 5,
      });
    });
  }, [categories, queryClient]);
  const products = data?.products || [];
  const loading = categoriesLoading || productsLoading;

  return (
    <section className="relative  overflow-hidden">
      {/* Background Subtle Accent */}
      <div className="absolute top-0 right-0 w-1/3 h-[500px] bg-gradient-to-l from-purple-50/30 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col justify-between gap-6  border-b border-purple-100/50 pb-2">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50/50 border border-purple-100 text-purple-500 text-xs font-semibold tracking-wide mb-4">
                <Zap size={10} className="fill-current" />
                Browse Collections
              </div>
              <h2 className="text-xl md:text-3xl font-black text-gray-900 tracking-tight font-montserrat">
                Shop by{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
                  Categories
                </span>
              </h2>
            </div>
          </div>

          {/* Glass-Pill Tabs */}
          <div className="flex-shrink-0 w-full lg:w-auto">
            <div className="flex overflow-x-auto scrollbar-hide gap-1 -mx-4 p-1 bg-white/40 backdrop-blur-md rounded-lg md:rounded-2xl border border-purple-200/60">
              {categoriesLoading ? (
                <>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="animate-pulse bg-purple-100/50 h-10 w-24 rounded-xl"
                    />
                  ))}
                </>
              ) : (
                categories?.map((cat) => (
                  <button
                    key={cat._id}
                    onClick={() => setActiveTab(cat)}
                    className="relative cursor-pointer px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 outline-none whitespace-nowrap"
                  >
                    {activeTab?._id === cat._id && (
                      <motion.div
                        layoutId="activeTabPill"
                        className="absolute inset-0 bg-white/40 rounded-xl shadow-[0_4px_12px_rgba(139,92,246,0.12)] border border-purple-200/70"
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.6,
                        }}
                      />
                    )}
                    <span
                      className={`relative z-10 ${
                        activeTab?._id === cat._id
                          ? "text-purple-600"
                          : "text-gray-500  hover:text-gray-700"
                      }`}
                    >
                      {cat.name}
                    </span>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Product Gallery Grid */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory"
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-[80%] sm:w-[48%] md:w-[32%] lg:w-[22%] xl:w-[18%] snap-start product-skeleton-container"
                >
                  <ProductSkeleton />
                </div>
              ))}
            </motion.div>
          ) : products.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full py-12 flex flex-col items-center text-center text-gray-400 bg-white/40 backdrop-blur-md rounded-3xl border border-purple-100/50"
            >
              <FileX size={48} className="mb-4 text-purple-200" />
              <p className="text-lg font-bold tracking-tight">
                No Items Unveiled Yet
              </p>
              <p className="text-sm mt-1">
                Explore our other curated categories.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <ProductsList
                products={products}
                items={8}
                activeCategory={activeTab}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default PopularProducts;
