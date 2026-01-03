import { memo } from "react";
import ProductCard from "../ProductCard/ProductCard";

const ProductGrid = memo(({ products }) => {
  return (
    <div className="overflow-x-auto sm:overflow-x-visible scrollbar-hide pb-2">
      <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 min-w-max sm:min-w-0">
        {products.map((product) => (
          <div key={product._id} className="w-48 sm:w-auto flex-shrink-0">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
});

export default ProductGrid;
