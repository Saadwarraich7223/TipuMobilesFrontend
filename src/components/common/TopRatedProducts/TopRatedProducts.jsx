import { useEffect, useState } from "react";

import productsApi from "../../../api/productsApi";
import ProductSkeleton from "../../layout/ShimmerSkeltons/ProductSkelton";
import ProductsList from "../../product/ProductList/ProductsList";

const TopRatedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTopRated = async () => {
      try {
        setLoading(true);
        const res = await productsApi.getProducts({
          sort: "-averageRating",
          limit: 5,
        });
        setProducts(res.data.products);
      } catch (err) {
        console.error("Failed to fetch top rated products", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopRated();
  }, []);

  return (
    <section className="py-6 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-4">
          Top Rated Products ⭐
        </h2>

        {loading ? (
          <section className=" ">
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
        ) : (
          <ProductsList products={products} items={5} />
        )}
      </div>
    </section>
  );
};

export default TopRatedProducts;
