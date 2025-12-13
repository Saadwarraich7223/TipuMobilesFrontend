import React, { useEffect, useState } from "react";
import { HiOutlineInbox } from "react-icons/hi";

import CategorySlider from "../../components/common/CategorySlider/CategorySlider";
import BlogContainer from "../../components/blog/BlogContainer";

import ProductsList from "../../components/product/ProductList/ProductsList";
import MainBanner from "../../components/common/Banners/MainBanner";
import Adds1 from "../../components/common/Adds/Adds1";
import { useAppContext } from "../../context/AppContext";
import categoriesApi from "../../api/categories";
import ProductSkeleton from "../../components/layout/ShimmerSkeltons/ProductSkelton";
import FlashSale from "../../components/common/FlashSaleCard/FlashSale";
import flashSalesApi from "../../api/flashSales";
import FeaturedBrands from "../../components/common/FeaturedBrands/FeaturedBrands";
import CustomerReviews from "../../components/common/CustomerReviews/CustomerReviews";

const HomePage = () => {
  const [flashSales, setFlashSales] = useState([]);
  const [activeFlashSales, setActiveFlashSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlashSale = async () => {
      try {
        const res = await flashSalesApi.getFlashSales();
        setFlashSales(res);
      } catch (err) {
        console.error("Flash sale fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFlashSale();
  }, []);

  useEffect(() => {
    const filterActiveSales = () => {
      const now = new Date();
      const active = flashSales.filter((sale) => new Date(sale.endTime) > now);
      setActiveFlashSales(active);
    };

    filterActiveSales(); // initial run
    const interval = setInterval(filterActiveSales, 10000);
    return () => clearInterval(interval);
  }, [flashSales]);

  return (
    <>
      {/* <MainBanner /> */}

      {activeFlashSales.length === 0 ? (
        <></> // hide section completely if no active sales
      ) : (
        activeFlashSales.map((sale) => (
          <FlashSale key={sale._id} sale={sale} loading={loading} />
        ))
      )}

      <CategorySlider />
      <PopularProducts />
      <FeaturedBrands />
      <TopSellingProducts />

      <Adds1 />
      <CustomerReviews />
      <BlogContainer />
    </>
  );
};

export default HomePage;

const PopularProducts = () => {
  const { categories, loading } = useAppContext();
  const [products, setProducts] = useState([]);
  const [ploading, setpLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(categories[0]);
  const fetchProductsByCat = async () => {
    try {
      setpLoading(true);
      const res = await categoriesApi.getProductsByCategory(activeTab.slug);
      setProducts(res.products);
    } catch (error) {
      console.log(error);
    } finally {
      setpLoading(false);
    }
  };

  useEffect(() => {
    if (!activeTab && categories.length > 0) {
      setActiveTab(categories[0]);
      return;
    }

    if (!activeTab) return;

    fetchProductsByCat();
  }, [activeTab, categories]);

  return (
    <section className="bg-white py-4 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row items-start md:items-center md:justify-between md:gap-4 mb-3">
          {/* Left */}
          <div className=" w-full lg:w-[40%] ">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">
              Popular Products
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">
              Don’t miss our current offers — limited time only!
            </p>
          </div>

          {/* Right - Custom Tabs */}
          <div className=" w-full lg:w-[60%] items-start self-start justify-start r ">
            <div className="flex overflow-x-auto scrollbar-hide gap-3 md:gap-4  ">
              {loading && (
                <>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="animate-pulse bg-gray-200 h-6 w-20 rounded-md"
                    ></div>
                  ))}
                </>
              )}

              {!loading &&
                categories?.map((cat) => (
                  <button
                    key={cat._id}
                    onClick={() => setActiveTab(cat)}
                    className={`whitespace-nowrap cursor-pointer mr-2 py-2 text-sm font-medium rounded-t-md transition-colors duration-200 ${
                      activeTab === cat
                        ? "text-primary border-b-2 border-primary"
                        : "text-gray-600 hover:text-gray-800 hover:border-gray-300"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
            </div>
          </div>
        </div>

        {/* Product Slider */}
        {ploading || loading ? (
          <section className="  bg-white">
            <div className="max-w-7xl mx-auto ">
              {/* Scrollable Product Row */}
              <div className="flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory ">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 w-[80%] sm:w-[48%] md:w-[32%] lg:w-[22%] xl:w-[18%] snap-start"
                  >
                    <ProductSkeleton />
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : products.length === 0 ? (
          <div className="w-full py-10 flex flex-col items-center text-center text-gray-500">
            <HiOutlineInbox className="text-4xl mb-2 text-gray-400" />
            <p className="text-sm sm:text-base">
              No products found in this category.
            </p>
          </div>
        ) : (
          <ProductsList
            products={products}
            items={5}
            activeCategory={activeTab}
          />
        )}
      </div>
    </section>
  );
};

const TopSellingProducts = () => {
  return (
    <section className="bg-white py-4 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row items-start md:items-center md:justify-between gap-4 mb-2">
          {/* Left */}
          <div className=" w-full lg:w-[40%] ">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">
              Top Selling Products
            </h2>
            <p className=" text-xs md:text-sm text-gray-500">
              Don’t miss our current offers — limited time only!
            </p>
          </div>
        </div>

        {/* Product Slider */}
        <ProductsList items={5} />
      </div>
    </section>
  );
};
