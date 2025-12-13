import { motion } from "framer-motion";
import { FaBolt } from "react-icons/fa6";
import { IoFlashOutline } from "react-icons/io5";
import useCountdown from "../../../hooks/useCountDown";
import ProductCard from "../ProductCard/ProductCard";

const FlashSale = ({ sale, loading }) => {
  const { hours, minutes, seconds } = useCountdown(sale?.endTime);

  if (loading)
    return (
      <div className="w-full py-20 text-center text-gray-600 text-lg">
        Loading Flash Sale...
      </div>
    );

  return (
    <section className="w-full py-2 bg-gradient-to-r from-red-100 via-red-50 to-pink-50 rounded-2xl mx-1">
      <div className="max-w-7xl mx-auto px-2 sm:px-6">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row items-center justify-between  pb-4 ">
          {/* Sale Title */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3"
          >
            <div className="p-2 rounded-lg bg-red-50">
              <FaBolt className="text-red-500 text-xl" />
            </div>

            <div>
              <h2 className="text-2xl sm:text-xl font-bold text-gray-900">
                {sale.title}
              </h2>
              <p className="text-gray-500 text-sm">Limited time offer</p>
            </div>
          </motion.div>

          {/* Countdown Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-4 py-2 rounded-lg"
          >
            <IoFlashOutline className="text-red-500 text-lg" />
            <span className="text-gray-600 text-sm font-medium">Ends in</span>

            <div className="flex gap-1 text-base font-semibold text-gray-900">
              <span className="bg-white border border-gray-300 px-2 py-1 rounded min-w-[2rem] text-center">
                {hours.toString().padStart(2, "0")}
              </span>
              <span className="text-gray-400">:</span>
              <span className="bg-white border border-gray-300 px-2 py-1 rounded min-w-[2rem] text-center">
                {minutes.toString().padStart(2, "0")}
              </span>
              <span className="text-gray-400">:</span>
              <span className="bg-white border border-gray-300 px-2 py-1 rounded min-w-[2rem] text-center">
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
          className="overflow-x-auto scrollbar-hide pb-2"
        >
          <div className="flex sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 min-w-max sm:min-w-0">
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
