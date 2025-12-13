import { useCallback, useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

import ProductsFilter from "../../components/product/ProductsFilter/ProductsFilter";
import ProductCard from "../../components/common/ProductCard/ProductCard";
import ProductsMobFilter from "../../components/product/ProductMobFilter/ProductsMobFilter";
import Pagination from "../../components/common/Pagination/Pagination";

import { useParams } from "react-router-dom";
import categoriesApi from "../../api/categories";

import ProductSkeleton from "../../components/layout/ShimmerSkeltons/ProductSkelton";
import { useAppContext } from "../../context/AppContext";
const DEFAULT_LIMIT = 20;
const ProductsListingPage = () => {
  const { searchQuery } = useAppContext();

  const { "*": slug } = useParams();

  const [products, setProducts] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 50000,
    brand: "",
    freeDelivery: "",
    discount: "",
    minDiscount: "",
    sort: "price_asc",
    search: searchQuery,
  });
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      search: searchQuery || "",
    }));
    setCurrentPage(1);
  }, [searchQuery]);
  const buildQuery = useCallback(() => {
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

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const query = buildQuery();

      const res = await categoriesApi.getProductsByCategory(slug, query);

      setProducts(res.products || []);
      setTotalPages(Math.ceil((res.total || 0) / DEFAULT_LIMIT));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [slug, buildQuery]);
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  const applyFilters = (selected) => {
    setFilters((prev) => ({
      ...prev,
      sort: selected.sort === "price_asc" ? "price_asc" : "price_desc",
      brand: selected.brand || "",
      minPrice: selected.minPrice ?? 0,
      maxPrice: selected.maxPrice ?? 50000,
      minRating: selected.minRating ?? 0,
      freeDelivery: selected.freeDelivery ?? "",
      minDiscount: selected.minDiscount ?? 0,
    }));

    setCurrentPage(1);
  };

  return (
    <section className="">
      <div className="flex flex-col md:flex-row gap-4 bg-white">
        {/* Sidebar Filter */}
        <div className="hidden md:block w-[20%] h-full">
          <ProductsFilter
            onApply={(selectedFilters) => {
              setFilters({
                sort:
                  selectedFilters.sort === "price_asc"
                    ? "price_asc"
                    : "price_desc",
                brand: selectedFilters.brand || "",
                minPrice: selectedFilters.minPrice ?? 0,
                maxPrice: selectedFilters.maxPrice,
                minRating: selectedFilters.minRating,
                freeDelivery: selectedFilters.freeDelivery,
                minDiscount: selectedFilters.minDiscount,
              });
              setCurrentPage(1);
            }}
          />
        </div>

        {/* Main Content */}
        <div className="w-full md:w-[80%]">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row justify-between items-center p-2 px-4 mb-3 bg-gray-50 rounded-lg gap-3">
            {/* Left: View switch + product count */}
            <div className="md:flex hidden items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
              <p className="text-sm text-gray-600 font-medium hidden sm:block">
                There are {products.length} products
              </p>
            </div>
          </div>

          {/* Products List */}
          <div
            className={`grid gap-1 sm:gap-2
                      grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5`}
          >
            {loading ? (
              Array.from({ length: 10 }, (_, i) => <ProductSkeleton key={i} />)
            ) : products.length === 0 ? (
              <div className="col-span-full flex flex-col items-center py-10 text-center">
                <IoSearchOutline className="text-5xl text-gray-400 mb-3" />

                <h3 className="text-lg font-semibold text-gray-700">
                  No Products Found
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Try adjusting your filters or search again.
                </p>
              </div>
            ) : (
              products.map((product) => (
                <ProductCard
                  key={product._id || product.id}
                  product={product}
                />
              ))
            )}
          </div>

          {/* Pagination */}

          {products.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          )}
        </div>
      </div>
      <ProductsMobFilter onApply={applyFilters} />
    </section>
  );
};

export default ProductsListingPage;
