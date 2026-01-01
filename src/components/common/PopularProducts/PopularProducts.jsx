import { useEffect, useState } from "react";
import ProductSkeleton from "../../layout/ShimmerSkeltons/ProductSkelton";
import ProductsList from "../../product/ProductList/ProductsList";
import categoriesApi from "../../../api/categories";
import { useAppContext } from "../../../context/AppContext";

import { FileX } from "lucide-react";

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
    <section className="bg-white py-4 border-t border-gray-100 min-h-[440px]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row items-start md:items-center md:justify-between md:gap-4 mb-3">
          {/* Left */}
          <div className=" w-full lg:w-[40%] ">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">
              Shop by Categories
            </h2>
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
                    className="flex-shrink-0 w-[80%] sm:w-[48%] md:w-[32%] lg:w-[22%] xl:w-[18%] snap-start product-skeleton-container"
                  >
                    <ProductSkeleton />
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : products.length === 0 ? (
          <div className="w-full py-10 flex flex-col items-center text-center text-gray-500">
            <FileX size={30} className="text-4xl mb-2 text-gray-400" />
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

export default PopularProducts;
