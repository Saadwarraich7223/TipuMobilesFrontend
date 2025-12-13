import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoCloseOutline } from "react-icons/io5";
import { useAppContext } from "../../../context/AppContext";

const ProductsMobFilter = ({ onApply }) => {
  const { setShowMobileFilterBox, showMobileFilterBox } = useAppContext();
  const [resetAnim, setResetAnim] = useState(false);

  // Backend-compatible filters
  const [filters, setFilters] = useState({
    sort: "price_asc", // price_asc or price_desc
    brand: "",
    maxPrice: 5000,
    minRating: 0,
    freeDelivery: "",
    minDiscount: "",
  });
  const clearFilters = () => {
    const defaultFilters = {
      sort: "price_asc",
      brand: "",
      maxPrice: 5000,
      minRating: 0,
      freeDelivery: "",
      minDiscount: 0,
    };

    setResetAnim(true);
    setTimeout(() => {
      setFilters(defaultFilters);
      onApply(defaultFilters); // pass the actual reset state
      setResetAnim(false);
      setShowMobileFilterBox(false);
    }, 250);
  };

  const handleApplyFilters = () => {
    onApply(filters);
    setShowMobileFilterBox(false);
  };

  return (
    <AnimatePresence>
      {showMobileFilterBox && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowMobileFilterBox(false)}
          />

          {/* Drawer */}
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-100 bg-white rounded-t-2xl shadow-2xl p-4 max-h-[80vh] overflow-y-auto"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 250, damping: 25 }}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-base font-semibold text-gray-800">Filters</h2>
              <button
                onClick={() => setShowMobileFilterBox(false)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <IoCloseOutline size={20} className="text-gray-600" />
              </button>
            </div>

            <div className="space-y-4 text-sm">
              {/* Sort by Price */}
              <div>
                <h3 className="text-gray-700 mb-1 font-medium text-xs uppercase tracking-wide">
                  Sort by Price
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      setFilters((f) => ({ ...f, sort: "price_asc" }))
                    }
                    className={`px-3 py-1 text-xs border rounded-full ${
                      filters.sort === "price_asc"
                        ? "bg-primary text-white border-primary"
                        : "hover:bg-primary/10 text-gray-700"
                    }`}
                  >
                    Low → High
                  </button>

                  <button
                    onClick={() =>
                      setFilters((f) => ({ ...f, sort: "price_desc" }))
                    }
                    className={`px-3 py-1 text-xs border rounded-full ${
                      filters.sort === "price_desc"
                        ? "bg-primary text-white border-primary"
                        : "hover:bg-primary/10 text-gray-700"
                    }`}
                  >
                    High → Low
                  </button>
                </div>
              </div>

              {/* Brand */}
              <div>
                <h3 className="text-gray-700 mb-1 font-medium text-xs uppercase tracking-wide">
                  Brand
                </h3>
                <div className="flex gap-1.5 flex-wrap">
                  {["", "Apple", "Samsung", "OnePlus", "Xiaomi", "Anker"].map(
                    (brand) => (
                      <button
                        key={brand}
                        onClick={() => setFilters((f) => ({ ...f, brand }))}
                        className={`px-3 py-1 text-xs border rounded-full ${
                          filters.brand === brand
                            ? "bg-primary text-white border-primary"
                            : "hover:bg-primary/10 text-gray-700"
                        }`}
                      >
                        {brand === "" ? "Any" : brand}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Max Price */}
              <div>
                <h3 className="text-gray-700 mb-1 font-medium text-xs uppercase tracking-wide">
                  Max Price
                </h3>
                <input
                  type="range"
                  min="0"
                  max="5000"
                  step="50"
                  value={filters.maxPrice}
                  onChange={(e) =>
                    setFilters((f) => ({
                      ...f,
                      maxPrice: Number(e.target.value),
                    }))
                  }
                  className="w-full accent-primary"
                />
                <div className="text-[11px] text-gray-500 mt-0.5">
                  Rs {filters.maxPrice}
                </div>
              </div>

              {/* Rating */}
              <div>
                <h3 className="text-gray-700 mb-1 font-medium text-xs uppercase tracking-wide">
                  Minimum Rating
                </h3>
                <div className="flex gap-1.5">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <button
                      key={rating}
                      onClick={() =>
                        setFilters((f) => ({ ...f, minRating: rating }))
                      }
                      className={`px-2 py-1 text-xs border rounded-full ${
                        filters.minRating === rating
                          ? "bg-primary text-white border-primary"
                          : "hover:bg-primary/10 text-gray-700"
                      }`}
                    >
                      {rating === 0 ? "Any" : `${rating}+ ⭐`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Free Delivery */}
              <div>
                <h3 className="text-gray-700 mb-1 font-medium text-xs uppercase tracking-wide">
                  Free Delivery
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      setFilters((f) => ({ ...f, freeDelivery: true }))
                    }
                    className={`px-3 py-1 text-xs border rounded-full ${
                      filters.freeDelivery === true
                        ? "bg-primary text-white border-primary"
                        : "hover:bg-primary/10 text-gray-700"
                    }`}
                  >
                    Yes
                  </button>

                  <button
                    onClick={() =>
                      setFilters((f) => ({ ...f, freeDelivery: "" }))
                    }
                    className={`px-3 py-1 text-xs border rounded-full ${
                      filters.freeDelivery === ""
                        ? "bg-primary text-white border-primary"
                        : "hover:bg-primary/10 text-gray-700"
                    }`}
                  >
                    Any
                  </button>
                </div>
              </div>

              {/* Discount */}
              <div>
                <h3 className="text-gray-700 mb-1 font-medium text-xs uppercase tracking-wide">
                  Minimum Discount
                </h3>
                <div className="flex gap-2 flex-wrap">
                  {[0, 10, 20, 30, 40, 50].map((d) => (
                    <button
                      key={d}
                      onClick={() =>
                        setFilters((f) => ({ ...f, minDiscount: d }))
                      }
                      className={`px-3 py-1 text-xs border rounded-full ${
                        filters.minDiscount === d
                          ? "bg-primary text-white border-primary"
                          : "hover:bg-primary/10 text-gray-700"
                      }`}
                    >
                      {d === 0 ? "Any" : `${d}%`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Apply Filters */}
              <button
                onClick={clearFilters}
                className={`w-full mb-2 py-2 rounded-full text-sm font-medium border border-gray-300 text-gray-700 
    transition-all duration-300
    ${resetAnim ? "opacity-50 scale-90" : "opacity-100 scale-100"}
  `}
              >
                Clear Filters
              </button>
              <button
                onClick={handleApplyFilters}
                className="w-full mt-3 bg-primary text-white py-2 rounded-full text-sm font-medium hover:bg-primary/90"
              >
                Apply Filters
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProductsMobFilter;
