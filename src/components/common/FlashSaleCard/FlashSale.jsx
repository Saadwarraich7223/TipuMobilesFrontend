import { motion } from "framer-motion";
import useCountdown from "../../../hooks/useCountDown";
import ProductCard from "../ProductCard/ProductCard";
import { Zap } from "lucide-react";

const FlashSale = ({ sale, loading }) => {
  const { hours, minutes, seconds } = useCountdown(sale?.endTime);

  if (loading)
    return (
      <div className="w-full py-24 text-center text-gray-600 text-lg sm:text-xl">
        Loading Flash Sale...
      </div>
    );

  return (
    <section className="w-full py-4 sm:py-6 bg-gradient-to-r from-red-100 via-red-50 to-pink-50 rounded-2xl px-2 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 pb-4">
          {/* Sale Title */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 w-full sm:w-auto"
          >
            <div className="p-2 sm:p-3 rounded-lg bg-red-50 flex-shrink-0">
              <Zap fill="red" size={25} className="text-red-500" />
            </div>

            <div>
              <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
                {sale.title}
              </h2>
              <p className="text-gray-500 text-sm sm:text-base">
                Limited time offer
              </p>
            </div>
          </motion.div>

          {/* Countdown Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="flex items-center gap-2 sm:gap-3 bg-gray-50 border border-gray-200 px-3 sm:px-4 py-2 sm:py-3 rounded-lg"
          >
            <Zap size={18} className="text-red-500" />
            <span className="text-gray-600 text-sm sm:text-base font-medium">
              Ends in
            </span>

            <div className="flex gap-1 sm:gap-2 text-base sm:text-lg font-semibold text-gray-900">
              <span className="bg-white border border-gray-300 px-2 sm:px-3 py-1 sm:py-1.5 rounded min-w-[2.5rem] text-center">
                {hours.toString().padStart(2, "0")}
              </span>
              <span className="text-gray-400">:</span>
              <span className="bg-white border border-gray-300 px-2 sm:px-3 py-1 sm:py-1.5 rounded min-w-[2.5rem] text-center">
                {minutes.toString().padStart(2, "0")}
              </span>
              <span className="text-gray-400">:</span>
              <span className="bg-white border border-gray-300 px-2 sm:px-3 py-1 sm:py-1.5 rounded min-w-[2.5rem] text-center">
                {seconds.toString().padStart(2, "0")}
              </span>
            </div>
          </motion.div>
        </div>

        {/* PRODUCT GRID */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.12 } } }}
          className="overflow-x-auto sm:overflow-x-visible scrollbar-hide pb-2"
        >
          <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 min-w-max sm:min-w-0">
            {sale.products?.map((product) => (
              <motion.div
                key={product._id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0 },
                }}
                className="w-48 sm:w-auto flex-shrink-0"
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FlashSale;
