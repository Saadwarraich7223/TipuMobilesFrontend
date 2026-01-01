import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function ProductsFilter({ onApply }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedRating, setSelectedRating] = useState(null);
  const [freeDelivery, setFreeDelivery] = useState(false);
  const [minDiscount, setMinDiscount] = useState(0);

  const [expandedSections, setExpandedSections] = useState({
    category: true,
    brand: true,
    price: true,
    rating: true,
    delivery: true,
    discount: true,
  });

  const brands = [
    "Apple",
    "Samsung",
    "Anker",
    "Spigen",
    "OtterBox",
    "Belkin",
    "Sony",
  ];

  const toggleSection = (section) =>
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));

  const toggleBrand = (brand) =>
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((x) => x !== brand) : [...prev, brand]
    );

  const handleApplyFilters = () => {
    const filters = {};

    if (selectedBrands.length > 0) filters.brand = selectedBrands.join(",");

    if (priceRange[0] > 0) filters.minPrice = priceRange[0];
    if (priceRange[1] < 5000) filters.maxPrice = priceRange[1];
    if (selectedRating) filters.minRating = selectedRating;
    if (freeDelivery) filters.freeDelivery = true;

    onApply(filters);
  };

  //  RESET FILTERS
  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange([0, 5000]);
    setSelectedRating(null);
    setFreeDelivery(false);
    setMinDiscount(0);

    onApply({}); // send empty filters
  };

  const hasActiveFilters =
    searchTerm ||
    selectedCategories.length > 0 ||
    selectedBrands.length > 0 ||
    selectedRating ||
    freeDelivery ||
    minDiscount > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < 5000;

  return (
    <div className="w-full bg-white rounded-xl md:mt-4 border border-gray-200 ">
      <div className="px-5 py-4 border-b border-gray-200">
        <h2 className="text-base font-semibold text-gray-800">Filters</h2>
      </div>

      <div className="p-5 space-y-6 max-h-[calc(100vh-180px)] overflow-y-auto">
        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="w-full text-xs font-medium py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition"
          >
            Clear all filters
          </button>
        )}

        {/* Brand */}
        <div>
          <button
            onClick={() => toggleSection("brand")}
            className="w-full flex justify-between items-center text-sm font-medium text-gray-700 mb-2"
          >
            Brand{" "}
            {expandedSections.brand ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            )}
          </button>

          {expandedSections.brand && (
            <div className="space-y-1">
              {brands.map((brand) => (
                <label
                  key={brand}
                  className="flex items-center p-2 text-sm hover:bg-gray-50 rounded-md"
                >
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                    className="w-4 h-4 accent-primary"
                  />
                  <span className="ml-2 text-gray-600">{brand}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Price */}
        <div>
          <button
            onClick={() => toggleSection("price")}
            className="w-full flex justify-between items-center text-sm font-medium text-gray-700 mb-2"
          >
            Price Range{" "}
            {expandedSections.price ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            )}
          </button>

          {expandedSections.price && (
            <div>
              <div className="flex justify-between text-xs text-gray-500 mb-2">
                <span>PKR {priceRange[0]}</span>
                <span>PKR {priceRange[1]}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-2">
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) =>
                    setPriceRange([parseInt(e.target.value), priceRange[1]])
                  }
                  className="border p-1 rounded text-xs"
                />
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], parseInt(e.target.value)])
                  }
                  className="border p-1 rounded text-xs"
                />
              </div>
            </div>
          )}
        </div>

        {/* Rating */}
        <div>
          <button
            onClick={() => toggleSection("rating")}
            className="w-full flex justify-between text-sm font-medium text-gray-700 mb-2"
          >
            Rating{" "}
            {expandedSections.rating ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            )}
          </button>

          {expandedSections.rating && (
            <div className="space-y-1">
              {[4, 3, 2, 1].map((rating) => (
                <div
                  key={rating}
                  className={`flex items-center p-2 rounded-md cursor-pointer text-sm border
                    ${
                      selectedRating === rating
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-transparent hover:bg-gray-50 text-gray-600"
                    }`}
                  onClick={() =>
                    setSelectedRating(selectedRating === rating ? null : rating)
                  }
                >
                  {"⭐".repeat(rating)}{" "}
                  <span className="ml-1 text-xs text-gray-400">and up</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Free Delivery */}
        <div>
          <button
            onClick={() => toggleSection("delivery")}
            className="w-full flex justify-between text-sm font-medium text-gray-700 mb-2"
          >
            Free Delivery{" "}
            {expandedSections.delivery ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            )}
          </button>

          {expandedSections.delivery && (
            <label className="flex items-center p-2 rounded-md hover:bg-gray-50 cursor-pointer text-sm">
              <input
                type="checkbox"
                checked={freeDelivery}
                onChange={() => setFreeDelivery(!freeDelivery)}
                className="w-4 h-4 accent-primary"
              />
              <span className="ml-2 text-gray-600">
                Show only free delivery
              </span>
            </label>
          )}
        </div>

        {/* Discount */}
        <div>
          <button
            onClick={() => toggleSection("discount")}
            className="w-full flex justify-between text-sm font-medium text-gray-700 mb-2"
          >
            Minimum Discount{" "}
            {expandedSections.discount ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            )}
          </button>

          {expandedSections.discount && (
            <input
              type="number"
              min={0}
              max={90}
              value={minDiscount}
              onChange={(e) => setMinDiscount(parseInt(e.target.value))}
              className="border border-gray-200 p-2 text-xs rounded-lg w-full"
              placeholder="Enter minimum % discount"
            />
          )}
        </div>

        <div className="px-5 py-4 ">
          <button
            onClick={handleApplyFilters}
            disabled={!hasActiveFilters}
            className={`w-full py-2 rounded-lg text-sm font-medium
      ${
        hasActiveFilters
          ? "bg-primary text-white hover:bg-primary-dark"
          : "bg-gray-300 text-gray-500 cursor-not-allowed"
      }`}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
