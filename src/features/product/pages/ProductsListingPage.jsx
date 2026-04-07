import { useState, useMemo, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  SearchX,
  SlidersHorizontal,
  LayoutGrid,
  List,
  Sparkles,
} from "lucide-react";

import ProductsFilter from "../components/ProductsFilter";
import ProductsMobFilter from "../components/ProductsMobFilter";
import ProductCard from "../components/ProductCard";
import ProductListCard from "../components/ProductListCard";
import Pagination from "../../../components/ui/Pagination";
import ProductSkeleton from "../../../components/layout/ShimmerSkeletons/ProductSkelton";

import { useCategoryProducts } from "../queries/products";

const DEFAULT_LIMIT = 20;

const SORT_OPTIONS = [
  { value: "price_asc", label: "Price: Low → High" },
  { value: "price_desc", label: "Price: High → Low" },
  { value: "newest", label: "Newest First" },
  { value: "popular", label: "Most Popular" },
  { value: "rating", label: "Top Rated" },
];

const ProductsListingPage = () => {
  const { searchQuery } = useSelector((state) => state.ui);
  const { "*": slug } = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState("grid"); // grid | list
  const [filters, setFilters] = useState({
    sort: "price_asc",
    brand: "",
    minPrice: 0,
    maxPrice: 50000,
    minRating: 0,
    freeDelivery: "",
    minDiscount: 0,
    search: searchQuery,
  });

  useEffect(() => {
    setFilters((prev) => ({ ...prev, search: searchQuery || "" }));
    setCurrentPage(1);
  }, [searchQuery]);

  const query = useMemo(() => {
    const q = { page: currentPage, limit: DEFAULT_LIMIT };
    if (filters.sort) q.sort = filters.sort;
    if (filters.brand) q.brand = filters.brand;
    if (filters.search) q.search = filters.search;
    if (filters.minPrice > 0) q.minPrice = filters.minPrice;
    if (filters.maxPrice < 50000) q.maxPrice = filters.maxPrice;
    if (filters.minRating > 0) q.minRating = filters.minRating;
    if (filters.freeDelivery !== "") q.freeDelivery = filters.freeDelivery;
    if (filters.minDiscount > 0) q.minDiscount = filters.minDiscount;
    return q;
  }, [filters, currentPage]);

  const { data, isLoading, isFetching } = useCategoryProducts(slug, query);
  const products = data?.products || [];
  const totalPages = Math.ceil((data?.total || 0) / DEFAULT_LIMIT);

  const applyFilters = (selected) => {
    setFilters({
      sort: selected.sort ?? "price_asc",
      brand: selected.brand || "",
      minPrice: selected.minPrice ?? 0,
      maxPrice: selected.maxPrice ?? 50000,
      minRating: selected.minRating ?? 0,
      freeDelivery: selected.freeDelivery ?? "",
      minDiscount: selected.minDiscount ?? 0,
      search: filters.search,
    });
    setCurrentPage(1);
  };

  const isAllProducts = !slug;
  const categoryTitle = slug
    ? slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : "All Products";

  return (
    <div className="min-h-screen ">
      <div className="relative bg-gradient-to-r mt-10 md:mt-0 from-gray-950/90  to-purple-950/80 overflow-hidden">
        {/* <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(139,92,246,0.25),transparent_60%)]" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-600/10 rounded-full blur-[80px] pointer-events-none" /> */}
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4 relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-[10px] font-bold uppercase tracking-widest">
              <Sparkles size={9} />
              {searchQuery ? "Search Results" : "Collection"}
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight font-montserrat">
            {searchQuery ? (
              <>
                Results for{" "}
                <span className="text-purple-400">"{searchQuery}"</span>
              </>
            ) : (
              categoryTitle
            )}
          </h1>
          {!isLoading && (
            <p className="text-white/40 text-sm mt-1">
              {isFetching ? "Updating…" : `${data?.total || 0} products found`}
            </p>
          )}
        </div>
      </div>

      {/* ── Main Layout ── */}
      <div className="max-w-7xl mx-auto px-1 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* ── Filter Sidebar (desktop) ── */}
          <aside className="hidden md:block w-[240px] flex-shrink-0">
            <div className="sticky top-20">
              <ProductsFilter onApply={applyFilters} />
            </div>
          </aside>

          {/* ── Products Area ── */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between gap-3 mb-5 bg-white/70 backdrop-blur border border-purple-300/50 rounded-xl px-4 py-2.5">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <SlidersHorizontal size={14} className="text-purple-400" />
                <span className="font-medium text-gray-700">
                  {isFetching ? (
                    <span className="animate-pulse">Updating…</span>
                  ) : (
                    <>
                      {data?.total || 0}{" "}
                      <span className="hidden sm:inline">products</span>
                    </>
                  )}
                </span>
                <Link
                  to="/products"
                  className={`ml-2 inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-widest transition ${
                    isAllProducts
                      ? "border-purple-200/70 text-purple-300 cursor-default pointer-events-none"
                      : "border-purple-300/60 text-purple-600 hover:border-purple-400/70 hover:text-purple-700 bg-white/70"
                  }`}
                  aria-current={isAllProducts ? "page" : undefined}
                >
                  All Products
                </Link>
              </div>

              <div className="flex items-center gap-3">
                {/* Sort */}
                <select
                  value={filters.sort}
                  onChange={(e) =>
                    applyFilters({ ...filters, sort: e.target.value })
                  }
                  className="text-xs font-semibold text-gray-600 bg-transparent border-0 outline-none cursor-pointer pr-1 py-1"
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>

                {/* View Toggle */}
                <div className="hidden sm:flex items-center gap-1 bg-gray-100 rounded-xl p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-1.5 rounded-lg transition-all duration-200 ${viewMode === "grid" ? "bg-white shadow-sm text-purple-600" : "text-gray-400 hover:text-gray-600"}`}
                  >
                    <LayoutGrid size={14} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-1.5 rounded-lg transition-all duration-200 ${viewMode === "list" ? "bg-white shadow-sm text-purple-600" : "text-gray-400 hover:text-gray-600"}`}
                  >
                    <List size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Product Grid / List */}
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="skeleton"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={
                    viewMode === "list"
                      ? "flex flex-col gap-3"
                      : "grid gap-1 sm:gap-4 grid-cols-1 sm:grid-cols-3 lg:grid-cols-4"
                  }
                >
                  {Array.from({ length: viewMode === "list" ? 6 : 12 }).map(
                    (_, i) =>
                      viewMode === "list" ? (
                        /* List skeleton */
                        <div
                          key={i}
                          className="animate-pulse flex gap-4 bg-white/60 border border-purple-100/40 rounded-2xl p-4"
                        >
                          <div className="flex-shrink-0 w-36 h-36 sm:w-44 sm:h-44 bg-purple-50 rounded-xl" />
                          <div className="flex-1 space-y-3 py-1">
                            <div className="h-3 bg-gray-200 rounded w-24" />
                            <div className="h-4 bg-gray-200 rounded w-3/4" />
                            <div className="h-3 bg-gray-100 rounded w-full" />
                            <div className="h-3 bg-gray-100 rounded w-5/6" />
                            <div className="flex gap-2 pt-2">
                              <div className="h-5 bg-purple-100 rounded-full w-20" />
                              <div className="h-5 bg-gray-100 rounded-full w-16" />
                            </div>
                            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                              <div className="h-6 bg-gray-200 rounded w-24" />
                              <div className="h-9 bg-purple-100 rounded-xl w-28" />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <ProductSkeleton key={i} />
                      ),
                  )}
                </motion.div>
              ) : products.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center py-24 text-center bg-white/60 backdrop-blur rounded-3xl border border-purple-100/50"
                >
                  <div className="w-20 h-20 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center mb-5">
                    <SearchX size={32} className="text-purple-300" />
                  </div>
                  <h3 className="text-lg font-black text-gray-800 tracking-tight">
                    Nothing found
                  </h3>
                  <p className="text-sm text-gray-400 mt-1 max-w-xs">
                    Try adjusting your search or filter criteria to discover
                    more products.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key={`products-${filters.sort}-${currentPage}-${viewMode}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className={
                    viewMode === "list"
                      ? "flex flex-col gap-3"
                      : "  grid gap-1 sm:gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
                  }
                >
                  {products.map((product, i) => (
                    <motion.div
                      key={product._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03, duration: 0.3 }}
                    >
                      {viewMode === "list" ? (
                        <ProductListCard product={product} />
                      ) : (
                        <ProductCard product={product} />
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pagination */}
            {products.length > 0 && totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(p) => {
                  setCurrentPage(p);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Sheet */}
      <ProductsMobFilter onApply={applyFilters} />
    </div>
  );
};

export default ProductsListingPage;
