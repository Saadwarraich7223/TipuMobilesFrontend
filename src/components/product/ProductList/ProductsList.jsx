import React from "react";
import ProductCard from "../../common/ProductCard/ProductCard";
const ProductsList = ({ products }) => {
  return (
    <section className="  bg-white">
      <div className="max-w-7xl mx-auto ">
        {/* Scrollable Product Row */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory ">
          {products?.map((product, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[80%] sm:w-[48%] md:w-[32%] lg:w-[22%] xl:w-[18%] snap-start"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsList;
