import { useState, useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SearchX } from "lucide-react";

import ProductsFilter from "../../components/product/ProductsFilter/ProductsFilter";
import ProductsMobFilter from "../../components/product/ProductMobFilter/ProductsMobFilter";
import ProductCard from "../../components/common/ProductCard/ProductCard";
import Pagination from "../../components/common/Pagination/Pagination";
import ProductSkeleton from "../../components/layout/ShimmerSkeltons/ProductSkelton";

import { useAppContext } from "../../context/AppContext";
import { useCategoryProducts } from "../../queries/products";

const DEFAULT_LIMIT = 20;

const ProductsListingPage = () => {
  const { searchQuery } = useAppContext();
  const { "*": slug } = useParams();

  const [currentPage, setCurrentPage] = useState(1);
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
    setFilters((prev) => ({
      ...prev,
      search: searchQuery || "",
    }));
    setCurrentPage(1);
  }, [searchQuery]);

  /**  Stable query object (VERY IMPORTANT) */
  const query = useMemo(() => {
    const q = {
      page: currentPage,
      limit: DEFAULT_LIMIT,
    };

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
  const products = data || [];
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
    });
    setCurrentPage(1);
  };

  return (
    <section>
      <div className="flex flex-col md:flex-row gap-4 pt-2 bg-white">
        {/* Sidebar */}
        <div className="hidden md:block w-[20%]">
          <ProductsFilter onApply={applyFilters} />
        </div>

        {/* Main */}
        <div className="w-full md:w-[80%] px-1">
          <div className="hidden md:flex items-center mb-3 px-4 py-2 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              {isFetching
                ? "Updating…"
                : `There are ${products.length} products`}
            </p>
          </div>

          <div className="grid gap-1 sm:gap-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {isLoading ? (
              Array.from({ length: 10 }).map((_, i) => (
                <ProductSkeleton key={i} />
              ))
            ) : products.length === 0 ? (
              <div className="col-span-full flex flex-col items-center py-10">
                <SearchX size={35} className="text-gray-400 mb-3" />
                <h3 className="text-lg font-semibold text-gray-700">
                  No Products Found
                </h3>
                <p className="text-sm text-gray-500">
                  Try adjusting your filters.
                </p>
              </div>
            ) : (
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            )}
          </div>

          {products.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>

      <ProductsMobFilter onApply={applyFilters} />
    </section>
  );
};

export default ProductsListingPage;
