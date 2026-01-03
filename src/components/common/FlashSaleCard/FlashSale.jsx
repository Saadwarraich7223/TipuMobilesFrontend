import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import CountdownTimer from "./CountdownTimer";
import ProductGrid from "./ProductGrid";

const FlashSale = ({ sale }) => {
  if (!sale) return null;

  return (
    <section className="w-full py-4 sm:py-6 bg-gradient-to-r from-red-100 via-red-50 to-pink-50 rounded-2xl px-2 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 sm:p-3 rounded-lg bg-red-50">
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
          </div>

          {/* 🔥 Countdown isolated */}
          <CountdownTimer endTime={sale.endTime} />
        </motion.div>

        {/* 🔥 Product grid NEVER re-renders */}
        <ProductGrid products={sale.products || []} />
      </div>
    </section>
  );
};

export default FlashSale;
