import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  SlidersHorizontal,
  Star,
  Truck,
  Tag,
  ArrowUpDown,
  Sparkles,
} from "lucide-react";
import { setShowMobileFilterBox } from "../../../store/uiSlice";

const BRANDS = [
  "Apple",
  "Samsung",
  "Anker",
  "Spigen",
  "OtterBox",
  "Belkin",
  "Sony",
  "boAt",
];
const SORT_OPTIONS = [
  { value: "price_asc", label: "Price: Low → High" },
  { value: "price_desc", label: "Price: High → Low" },
  { value: "newest", label: "Newest First" },
  { value: "popular", label: "Most Popular" },
  { value: "rating", label: "Top Rated" },
];

const Pill = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1.5 rounded-full text-[12px] font-bold border transition-all duration-200 cursor-pointer ${
      active
        ? "bg-purple-600 text-white border-purple-600 shadow-sm shadow-purple-200"
        : "bg-white text-gray-500 border-gray-200 hover:border-purple-300 hover:text-purple-500"
    }`}
  >
    {children}
  </button>
);

const SectionLabel = ({ children }) => (
  <p className="text-[10px] font-black uppercase tracking-[0.1em] text-purple-400 mb-2.5">
    {children}
  </p>
);

const ProductsMobFilter = ({ onApply }) => {
  const dispatch = useDispatch();
  const { showMobileFilterBox } = useSelector((state) => state.ui);

  const [filters, setFilters] = useState({
    sort: "price_asc",
    brand: "",
    maxPrice: 50000,
    minRating: 0,
    freeDelivery: "",
    minDiscount: 0,
  });

  const hasActive =
    filters.brand ||
    filters.minRating > 0 ||
    filters.freeDelivery === true ||
    filters.minDiscount > 0 ||
    filters.maxPrice < 50000;

  const activeCount = [
    filters.brand,
    filters.minRating > 0,
    filters.freeDelivery === true,
    filters.minDiscount > 0,
    filters.maxPrice < 50000,
  ].filter(Boolean).length;

  const clearFilters = () => {
    const d = {
      sort: "price_asc",
      brand: "",
      maxPrice: 50000,
      minRating: 0,
      freeDelivery: "",
      minDiscount: 0,
    };
    setFilters(d);
    onApply(d);
    dispatch(setShowMobileFilterBox(false));
  };

  const handleApply = () => {
    onApply(filters);
    dispatch(setShowMobileFilterBox(false));
  };

  const close = () => dispatch(setShowMobileFilterBox(false));

  return (
    <AnimatePresence>
      {showMobileFilterBox && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[90]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />

          {/* Bottom Sheet */}
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-[100] bg-[#f9f9fb] rounded-t-3xl shadow-[0_-20px_60px_rgba(139,92,246,0.15)] max-h-[88vh] flex flex-col"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-gray-300" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-purple-100/50">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-purple-50 border border-purple-100 flex items-center justify-center">
                  <SlidersHorizontal size={13} className="text-purple-500" />
                </div>
                <div>
                  <h2 className="text-[15px] font-black text-gray-900 leading-tight">
                    Filters
                  </h2>
                  {activeCount > 0 && (
                    <p className="text-[10px] text-purple-500 font-bold">
                      {activeCount} active
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {hasActive && (
                  <button
                    onClick={clearFilters}
                    className="text-[12px] font-bold text-gray-400 hover:text-rose-500 transition-colors px-2 py-1"
                  >
                    Clear all
                  </button>
                )}
                <button
                  onClick={close}
                  className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <X size={16} className="text-gray-600" />
                </button>
              </div>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
              {/* Sort */}
              <div>
                <SectionLabel>
                  <ArrowUpDown size={9} className="inline mr-1" />
                  Sort by
                </SectionLabel>
                <div className="grid grid-cols-2 gap-2">
                  {SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() =>
                        setFilters((f) => ({ ...f, sort: opt.value }))
                      }
                      className={`px-3 py-2.5 rounded-xl text-[12px] font-bold text-left border transition-all duration-200 ${
                        filters.sort === opt.value
                          ? "bg-purple-600 text-white border-purple-600 shadow-sm"
                          : "bg-white text-gray-600 border-gray-200 hover:border-purple-200"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brand */}
              <div>
                <SectionLabel>Brand</SectionLabel>
                <div className="flex flex-wrap gap-2">
                  <Pill
                    active={filters.brand === ""}
                    onClick={() => setFilters((f) => ({ ...f, brand: "" }))}
                  >
                    All
                  </Pill>
                  {BRANDS.map((b) => (
                    <Pill
                      key={b}
                      active={filters.brand === b}
                      onClick={() => setFilters((f) => ({ ...f, brand: b }))}
                    >
                      {b}
                    </Pill>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <SectionLabel>Max Price</SectionLabel>
                  <span className="text-[12px] font-black text-purple-600">
                    Rs {filters.maxPrice.toLocaleString()}
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="range"
                    min="0"
                    max="50000"
                    step="500"
                    value={filters.maxPrice}
                    onChange={(e) =>
                      setFilters((f) => ({
                        ...f,
                        maxPrice: Number(e.target.value),
                      }))
                    }
                    className="w-full h-2 rounded-full appearance-none cursor-pointer
                               [&::-webkit-slider-thumb]:appearance-none
                               [&::-webkit-slider-thumb]:w-5
                               [&::-webkit-slider-thumb]:h-5
                               [&::-webkit-slider-thumb]:rounded-full
                               [&::-webkit-slider-thumb]:bg-purple-600
                               [&::-webkit-slider-thumb]:shadow-[0_2px_8px_rgba(139,92,246,0.4)]
                               [&::-webkit-slider-track]:bg-purple-100"
                    style={{
                      background: `linear-gradient(to right, #9333ea ${(filters.maxPrice / 50000) * 100}%, #e9d5ff ${(filters.maxPrice / 50000) * 100}%)`,
                    }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-gray-400 font-medium mt-1.5">
                  <span>Rs 0</span>
                  <span>Rs 50,000</span>
                </div>
              </div>

              {/* Rating */}
              <div>
                <SectionLabel>
                  <Star size={9} className="inline mr-1" />
                  Min Rating
                </SectionLabel>
                <div className="flex gap-2">
                  <Pill
                    active={filters.minRating === 0}
                    onClick={() => setFilters((f) => ({ ...f, minRating: 0 }))}
                  >
                    Any
                  </Pill>
                  {[4, 3, 2, 1].map((r) => (
                    <Pill
                      key={r}
                      active={filters.minRating === r}
                      onClick={() =>
                        setFilters((f) => ({ ...f, minRating: r }))
                      }
                    >
                      {r}+ ★
                    </Pill>
                  ))}
                </div>
              </div>

              {/* Free Delivery */}
              <div>
                <SectionLabel>
                  <Truck size={9} className="inline mr-1" />
                  Delivery
                </SectionLabel>
                <div className="flex gap-2">
                  <Pill
                    active={filters.freeDelivery === ""}
                    onClick={() =>
                      setFilters((f) => ({ ...f, freeDelivery: "" }))
                    }
                  >
                    All
                  </Pill>
                  <Pill
                    active={filters.freeDelivery === true}
                    onClick={() =>
                      setFilters((f) => ({ ...f, freeDelivery: true }))
                    }
                  >
                    Free only
                  </Pill>
                </div>
              </div>

              {/* Discount */}
              <div>
                <SectionLabel>
                  <Tag size={9} className="inline mr-1" />
                  Min Discount
                </SectionLabel>
                <div className="flex flex-wrap gap-2">
                  {[0, 10, 20, 30, 50].map((d) => (
                    <Pill
                      key={d}
                      active={filters.minDiscount === d}
                      onClick={() =>
                        setFilters((f) => ({ ...f, minDiscount: d }))
                      }
                    >
                      {d === 0 ? "Any" : `${d}%+`}
                    </Pill>
                  ))}
                </div>
              </div>
            </div>

            {/* Sticky Footer CTA */}
            <div className="px-5 pb-6 pt-3 border-t border-purple-100/50 bg-[#f9f9fb]">
              <button
                onClick={handleApply}
                className="w-full py-3.5 rounded-2xl font-black text-[14px] text-white
                           bg-gradient-to-r from-purple-600 to-pink-600
                           hover:from-purple-500 hover:to-pink-500
                           shadow-[0_6px_24px_rgba(139,92,246,0.35)]
                           hover:shadow-[0_8px_32px_rgba(139,92,246,0.45)]
                           transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Sparkles size={14} />
                Show Results
                {hasActive && (
                  <span className="bg-white/20 rounded-full px-2 py-0.5 text-[11px]">
                    {activeCount} filters
                  </span>
                )}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProductsMobFilter;
