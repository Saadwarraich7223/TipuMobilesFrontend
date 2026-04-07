import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BatteryCharging, Headphones, ShieldCheck, Star } from "lucide-react";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative md:min-h-[80vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-[18%] top-[8%] h-36 rounded-full bg-white/18 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto lg:px-6 max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center gap-2 md:gap-6 lg:px-18 lg:gap-8">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-500 text-xs font-semibold tracking-wide mb-3 md:mb-6">
              <Star size={12} />
              Premium Mobile Experience
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-2  text-gray-900 leading-tight tracking-tight md:mb-6">
              Premium Tech for <br />
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                Modern Living
              </span>
            </h1>

            <p className="hidden lg:block text-gray-500 text-sm sm:text-base max-w-md mx-auto lg:mx-0 mb-8 leading-relaxed">
              Discover high-quality mobile accessories designed for performance,
              style, and everyday convenience.
            </p>

            <motion.button
              whileHover={{ y: -1, scale: 1.005 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/products")}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="px-6 py-3 rounded-full bg-gray-900 text-white text-sm font-semibold shadow-[0_12px_28px_rgba(24,24,27,0.14)] transition-all hover:bg-black hover:shadow-[0_0_0_1px_rgba(255,255,255,0.10),0_14px_30px_rgba(24,24,27,0.16),0_0_40px_rgba(72,48,86,0.12)]"
            >
              Shop Now
            </motion.button>

            <div className="flex items-center justify-center lg:justify-start gap-6 mt-4 md:mt-8 text-xs text-gray-400">
              <span>4.8 Rating</span>
              <span>Free Delivery</span>
              <span>Easy Returns</span>
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="hidden flex-1 lg:flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[560px]">
              <div className="absolute z-20 -left-10 top-10 inline-flex items-center gap-2 rounded-full border border-purple-100 bg-purple-50/50 px-4 py-1.5 text-xs font-semibold tracking-wide text-purple-500 shadow-[0_12px_24px_rgba(72,48,86,0.08)]">
                <BatteryCharging size={12} />
                Fast Everyday Charging
              </div>
              <div className="absolute z-20 -right-2 top-28 inline-flex items-center gap-2 rounded-full border border-pink-100 bg-pink-50/50 px-4 py-1.5 text-xs font-semibold tracking-wide text-pink-500 shadow-[0_12px_24px_rgba(72,48,86,0.08)]">
                <Headphones size={12} />
                Premium Sound For Travel
              </div>
              <div className="absolute right-4 z-20 bottom-12 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50/50 px-4 py-1.5 text-xs font-semibold tracking-wide text-emerald-500 shadow-[0_12px_24px_rgba(72,48,86,0.08)]">
                <ShieldCheck size={12} />
                Protected For Your Daily Carry
              </div>
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <img
                  src="/hero_img.png"
                  alt="Phone and headphones"
                  className="mx-auto w-full max-w-[400px] drop-shadow-[0_28px_42px_rgba(42,33,61,0.16)]"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
