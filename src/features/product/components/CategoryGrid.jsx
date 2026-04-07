import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import { useCategoriesForHome } from "../../../features/product/queries/categories";

const CategoryGrid = () => {
  const { data: categories = [], isLoading } = useCategoriesForHome();

  // Masonry height variation (mobile only)
  const getHeight = (index) => {
    const patterns = ["h-12", "h-16", "h-20", "h-14", "h-[72px]"];
    return patterns[index % patterns.length];
  };
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };
  if (isLoading) {
    return (
      <section className="px-4 md:px-12 py-10 max-w-7xl mx-auto">
        {/* Mobile Skeleton */}
        <div className="columns-3 gap-2 md:hidden">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="mb-2 h-16 rounded-xl bg-gray-200 animate-pulse"
            />
          ))}
        </div>

        {/* Desktop Skeleton */}
        <div className="hidden md:grid grid-cols-6 gap-4 auto-rows-[160px]">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl bg-white/10 animate-pulse border border-white/5"
            />
          ))}
        </div>
      </section>
    );
  }

  // Desktop Bento Pattern
  const pattern = [
    "md:col-span-2 md:row-span-1",
    "md:col-span-1 md:row-span-1",
    "md:col-span-1 md:row-span-2",
    "md:col-span-2 md:row-span-1",
    "md:col-span-1 md:row-span-1",
    "md:col-span-1 md:row-span-1",
    "md:col-span-1 md:row-span-1",
  ];

  const displayed = categories.slice(0, 7);

  return (
    <section className="px-4 md:px-12 py-5 md:py-16 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-200/5 blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-pink-200/5 blur-[100px]" />

      <div className="max-w-7xl mx-auto space-y-6 md:space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50/50 border border-purple-100 text-purple-500 text-xs font-semibold mb-3">
              <Zap size={10} className="fill-current" />
              Our Collections
            </div>

            <h2 className="text-xl md:text-3xl font-black text-gray-900">
              Explore Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
                Categories
              </span>
            </h2>
          </div>
        </div>

        {/* ================= MOBILE (MASONRY) ================= */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-3 auto-rows-[70px] gap-2 md:hidden"
        >
          {displayed.map((item, index) => {
            const spans = [
              "col-span-2",
              "col-span-1",
              "col-span-3",
              "col-span-2",
              "col-span-1",
              "col-span-1",
              "col-span-1",
            ];

            const gradients = [
              "from-purple-500/20 to-pink-500/20",
              "from-blue-500/20 to-cyan-500/20",
              "from-orange-500/20 to-yellow-500/20",
              "from-emerald-500/20 to-teal-500/20",
            ];

            return (
              <motion.div
                key={item._id || index}
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  y: -2,
                }}
                whileTap={{ scale: 0.96 }}
                className={spans[index] || "col-span-1"}
              >
                <Link
                  to={`/products/${item.slug}`}
                  className="
                relative rounded-xl overflow-hidden p-2
                flex items-center justify-center text-center
                backdrop-blur-xl bg-white/10
                border border-white/10
                shadow-[0_4px_20px_rgba(0,0,0,0.08)]
                h-full
              "
                >
                  {/* Animated Gradient Glow */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${
                      gradients[index % gradients.length]
                    }`}
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: [0.4, 0.7, 0.4] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Light reflection */}
                  <div className="absolute inset-0 bg-white/10 opacity-30" />

                  {/* Floating shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "linear",
                      delay: index * 0.3,
                    }}
                    style={{ opacity: 0.08 }}
                  />

                  {/* Content */}
                  <span className="relative z-10 text-[11px] font-semibold text-gray-900 leading-tight line-clamp-2">
                    {item.name}
                  </span>
                </Link>
              </motion.div>
            );
          })}

          {/* 🔥 Premium View All Card */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.04, x: 4 }}
            whileTap={{ scale: 0.96 }}
            className="col-span-3"
          >
            <Link
              to="/products/all"
              className="
            relative rounded-2xl overflow-hidden
            flex items-center justify-between px-4
            backdrop-blur-xl bg-gray-900/80
            border border-white/10
            shadow-lg h-full
          "
            >
              {/* Glow pulse */}
              <motion.div
                className="absolute -top-5 -right-5 w-20 h-20 bg-purple-500/30 blur-2xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.4, 0.7, 0.4],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              />

              <div className="relative z-10">
                <p className="text-[10px] text-purple-300 uppercase tracking-widest">
                  Explore
                </p>
                <p className="text-sm font-bold text-white">
                  View All Categories
                </p>
              </div>

              <motion.div
                className="relative z-10 text-white text-lg"
                animate={{ x: [0, 6, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              >
                →
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
        {/* ================= DESKTOP (BENTO) ================= */}
        <div className="hidden md:grid grid-cols-6 gap-4 auto-rows-[160px]">
          {displayed.map((item, index) => (
            <motion.div
              key={item._id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className={pattern[index]}
            >
              <Link
                to={`/products/${item.slug}`}
                className="group relative h-full flex flex-col justify-end rounded-xl overflow-hidden shadow-lg hover:shadow-xl border border-white/5"
              >
                {/* Image */}
                <div className="absolute inset-0">
                  <motion.img
                    src={`https://res.cloudinary.com/dti1kpfhi/image/upload/f_auto,q_auto,w_800/${item.image.public_id}`}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition" />

                {/* Content */}
                <div className="relative z-10 p-5 text-white">
                  <h3 className="text-lg font-black">{item.name}</h3>

                  <div className="flex items-center gap-1 text-xs opacity-0 group-hover:opacity-100 transition">
                    Explore <ArrowRight size={12} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}

          {/* View More */}
          <motion.div className="col-span-2">
            <Link
              to="/products/all"
              className="group h-full flex items-center justify-between rounded-2xl p-6 bg-gray-900 text-white hover:bg-black transition"
            >
              <div>
                <p className="text-xs text-purple-400 mb-1">Don't miss</p>
                <h3 className="text-lg font-black">
                  View All <br /> Categories
                </h3>
              </div>

              <ArrowRight />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
