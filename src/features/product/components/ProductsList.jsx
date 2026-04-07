import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";

const ProductsList = ({ products }) => {
  return (
    <section className="max-w-7xl mx-auto   ">
      <div className="flex gap-2 md:gap-2 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory ">
        {products?.map((product) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex-shrink-0 py-2 
                w-[78%] sm:w-[48%] md:w-[32%] lg:w-[22%] xl:w-[18%]
                snap-start"
          >
            {/* Card Wrapper for polish */}
            <div className="h-full rounded-2xl transition-all duration-300 hover:scale-[1.02]">
              <ProductCard product={product} />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProductsList;
