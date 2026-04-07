import { useState } from "react";
import { ChevronDown, ChevronUp, Star, Truck, Tag, SlidersHorizontal, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const BRANDS = ["Apple", "Samsung", "Anker", "Spigen", "OtterBox", "Belkin", "Sony", "boAt"];

const Section = ({ title, icon: Icon, sectionKey, expanded, onToggle, children }) => (
  <div className="border-b border-purple-100/50 last:border-0">
    <button
      onClick={() => onToggle(sectionKey)}
      className="w-full flex items-center justify-between py-3 text-left group"
    >
      <div className="flex items-center gap-2 text-[13px] font-bold text-gray-700 group-hover:text-purple-600 transition-colors">
        {Icon && <Icon size={13} className="text-purple-400" />}
        {title}
      </div>
      {expanded ? (
        <ChevronUp size={14} className="text-gray-400" />
      ) : (
        <ChevronDown size={14} className="text-gray-400" />
      )}
    </button>
    <AnimatePresence initial={false}>
      {expanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden pb-3"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export default function ProductsFilter({ onApply }) {
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [selectedRating, setSelectedRating] = useState(null);
  const [freeDelivery, setFreeDelivery] = useState(false);
  const [minDiscount, setMinDiscount] = useState(0);

  const [expanded, setExpanded] = useState({
    brand: true,
    price: true,
    rating: false,
    delivery: false,
    discount: false,
  });

  const toggle = (key) =>
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));

  const toggleBrand = (brand) =>
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((x) => x !== brand) : [...prev, brand]
    );

  const hasActive =
    selectedBrands.length > 0 ||
    selectedRating ||
    freeDelivery ||
    minDiscount > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < 50000;

  const handleApply = () => {
    const f = {};
    if (selectedBrands.length > 0) f.brand = selectedBrands.join(",");
    if (priceRange[0] > 0) f.minPrice = priceRange[0];
    if (priceRange[1] < 50000) f.maxPrice = priceRange[1];
    if (selectedRating) f.minRating = selectedRating;
    if (freeDelivery) f.freeDelivery = true;
    if (minDiscount > 0) f.minDiscount = minDiscount;
    onApply(f);
  };

  const handleClear = () => {
    setSelectedBrands([]);
    setPriceRange([0, 50000]);
    setSelectedRating(null);
    setFreeDelivery(false);
    setMinDiscount(0);
    onApply({});
  };

  return (
    <div className="bg-white/70 backdrop-blur-md rounded-2xl border border-purple-100/60 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-purple-100/50">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={14} className="text-purple-500" />
          <h2 className="text-[13px] font-black text-gray-800 uppercase tracking-wider">Filters</h2>
        </div>
        {hasActive && (
          <button
            onClick={handleClear}
            className="flex items-center gap-1 text-[11px] font-bold text-purple-500 hover:text-purple-700 transition-colors"
          >
            <X size={11} />
            Clear
          </button>
        )}
      </div>

      <div className="px-4 py-2 max-h-[calc(100vh-200px)] overflow-y-auto scrollbar-hide space-y-0">
        {/* Brand */}
        <Section title="Brand" sectionKey="brand" expanded={expanded.brand} onToggle={toggle}>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {BRANDS.map((brand) => {
              const active = selectedBrands.includes(brand);
              return (
                <button
                  key={brand}
                  onClick={() => toggleBrand(brand)}
                  className={`px-3 py-1 rounded-full text-[11px] font-bold border transition-all duration-200 ${
                    active
                      ? "bg-purple-600 text-white border-purple-600 shadow-sm shadow-purple-200"
                      : "bg-white text-gray-500 border-gray-200 hover:border-purple-200 hover:text-purple-500"
                  }`}
                >
                  {brand}
                </button>
              );
            })}
          </div>
        </Section>

        {/* Price Range */}
        <Section title="Price Range" sectionKey="price" expanded={expanded.price} onToggle={toggle}>
          <div className="space-y-3 pt-1">
            <div className="flex items-center gap-2">
              <div className="flex-1 relative">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[11px] text-gray-400 font-semibold">Rs</span>
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                  className="w-full border border-gray-200 rounded-xl pl-8 pr-2 py-2 text-[12px] text-gray-700 bg-white/80 focus:outline-none focus:border-purple-300 transition"
                  placeholder="Min"
                />
              </div>
              <span className="text-gray-300 text-xs">—</span>
              <div className="flex-1 relative">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[11px] text-gray-400 font-semibold">Rs</span>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 50000])}
                  className="w-full border border-gray-200 rounded-xl pl-8 pr-2 py-2 text-[12px] text-gray-700 bg-white/80 focus:outline-none focus:border-purple-300 transition"
                  placeholder="Max"
                />
              </div>
            </div>
            <div className="flex justify-between text-[10px] text-gray-400 font-medium px-1">
              <span>Rs {priceRange[0].toLocaleString()}</span>
              <span>Rs {priceRange[1].toLocaleString()}</span>
            </div>
          </div>
        </Section>

        {/* Rating */}
        <Section title="Min Rating" icon={Star} sectionKey="rating" expanded={expanded.rating} onToggle={toggle}>
          <div className="space-y-1 pt-1">
            {[4, 3, 2, 1].map((r) => (
              <button
                key={r}
                onClick={() => setSelectedRating(selectedRating === r ? null : r)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-[12px] font-semibold transition-all duration-200 ${
                  selectedRating === r
                    ? "bg-amber-50 text-amber-600 border border-amber-200"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                <div className="flex gap-0.5">
                  {Array.from({ length: r }).map((_, i) => (
                    <Star key={i} size={11} fill="#f59e0b" className="text-amber-400" />
                  ))}
                </div>
                <span>& up</span>
              </button>
            ))}
          </div>
        </Section>

        {/* Free Delivery */}
        <Section title="Delivery" icon={Truck} sectionKey="delivery" expanded={expanded.delivery} onToggle={toggle}>
          <label className="flex items-center gap-2.5 pt-1 px-1 cursor-pointer group">
            <div
              onClick={() => setFreeDelivery(!freeDelivery)}
              className={`w-9 h-5 rounded-full transition-all duration-300 relative flex-shrink-0 cursor-pointer ${
                freeDelivery ? "bg-purple-600" : "bg-gray-200"
              }`}
            >
              <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${freeDelivery ? "left-4" : "left-0.5"}`} />
            </div>
            <span className="text-[12px] font-semibold text-gray-600 group-hover:text-gray-800 transition-colors">
              Free delivery only
            </span>
          </label>
        </Section>

        {/* Discount */}
        <Section title="Min Discount" icon={Tag} sectionKey="discount" expanded={expanded.discount} onToggle={toggle}>
          <div className="pt-1 space-y-2">
            <div className="flex flex-wrap gap-1.5">
              {[10, 20, 30, 50].map((d) => (
                <button
                  key={d}
                  onClick={() => setMinDiscount(minDiscount === d ? 0 : d)}
                  className={`px-3 py-1 rounded-full text-[11px] font-bold border transition-all duration-200 ${
                    minDiscount === d
                      ? "bg-purple-600 text-white border-purple-600"
                      : "bg-white text-gray-500 border-gray-200 hover:border-purple-200 hover:text-purple-500"
                  }`}
                >
                  {d}%+
                </button>
              ))}
            </div>
          </div>
        </Section>
      </div>

      {/* Apply Button */}
      <div className="px-4 pb-4 pt-2">
        <button
          onClick={handleApply}
          disabled={!hasActive}
          className={`w-full py-2.5 rounded-xl text-[13px] font-black transition-all duration-300 ${
            hasActive
              ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-[0_4px_16px_rgba(139,92,246,0.3)] hover:shadow-[0_6px_24px_rgba(139,92,246,0.45)] hover:from-purple-500 hover:to-pink-500"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}
