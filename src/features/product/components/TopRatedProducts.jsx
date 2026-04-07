import ProductSkeleton from "../../../components/layout/ShimmerSkeletons/ProductSkelton";
import ProductsList from "./ProductsList";
import { useTopRatedProducts } from "../queries/products";
import { Star } from "lucide-react";

const TopRatedProducts = () => {
  const { data: products = [], isLoading } = useTopRatedProducts();

  console.log(products[0]);

  return (
    <section className="py-6 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex mb-3 md:mb-6 flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-50/50 border border-yellow-200 text-yellow-600 text-xs font-semibold tracking-wide mb-4">
              <Star size={10} className="fill-current" />
              Customer Favorites
            </div>
            <h2 className="text-xl md:text-3xl font-black text-gray-900 tracking-tight font-montserrat">
              Top Rated{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500">
                Products
              </span>
            </h2>
          </div>
        </div>

        {isLoading ? (
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
