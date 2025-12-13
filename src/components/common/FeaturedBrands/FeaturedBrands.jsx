import React from "react";
import { motion } from "framer-motion";

/**
 * Props:
 *  brands: [
 *    { id, name, logoUrl, link? },
 *    ...
 *  ]
 */

const brands = [
  {
    id: "1",
    name: "Apple",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    link: "/brands/apple",
  },
  {
    id: "2",
    name: "Samsung",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg",
    link: "/brands/samsung",
  },
  {
    id: "3",
    name: "Anker",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/9/9c/Anker_logo.svg",
    link: "/brands/anker",
  },
  {
    id: "4",
    name: "Baseus",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/5/53/Baseus_logo.png",
    link: "/brands/baseus",
  },
  {
    id: "5",
    name: "Joyroom",
    logoUrl:
      "https://seeklogo.com/images/J/joyroom-logo-7F1B0E5F7E-seeklogo.png",
    link: "/brands/joyroom",
  },
  {
    id: "6",
    name: "Sony",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/2/22/Sony_logo.svg",
    link: "/brands/sony",
  },
];

export default function FeaturedBrands() {
  // simple animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="bg-white py-6 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="mb-4  md:text-left">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
            Featured Brands
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            Shop top brands we trust.
          </p>
        </div>

        {/* Brand logos */}
        <motion.div
          className="flex gap-4 overflow-x-auto scrollbar-hide py-2"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {brands.length === 0
            ? // fallback placeholders
              Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-24 h-24 bg-gray-200 rounded-lg animate-pulse"
                />
              ))
            : brands.map((brand) => (
                <motion.a
                  key={brand.id}
                  href={brand.link || "#"}
                  className="flex-shrink-0 w-24 h-24 bg-white rounded-lg shadow-sm hover:shadow-md flex items-center justify-center p-2"
                  variants={item}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img
                    src={brand.logoUrl}
                    alt={brand.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </motion.a>
              ))}
        </motion.div>
      </div>
    </section>
  );
}
