import React, { useState, useEffect } from "react";
import { IoChevronBack, IoCloseCircle, IoSearch } from "react-icons/io5";
import ProductCard from "../../components/common/ProductCard/ProductCard";

const SearchPage = ({ navigate }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    category: "All",
    priceRange: [0, 1000],
    inStock: false,
    rating: 0,
  });

  const popularSearches = ["Headphones", "Smart Watch", "Shoes", "Backpack"];

  // Mock search function
  const handleSearch = async (searchQuery) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const fakeResults = [
        {
          id: 1,
          name: "Wireless Headphones",
          price: 149.99,
          originalPrice: 199.99,
          image:
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
          rating: 4.5,
          inStock: true,
        },
        {
          id: 2,
          name: "Smart Watch Pro",
          price: 599.99,
          originalPrice: 699.99,
          image:
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
          rating: 4.8,
          inStock: true,
        },
      ];

      setResults(
        fakeResults.filter((item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setLoading(false);
    }, 500);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    // Simple suggestion logic
    if (value.length > 0) {
      setSuggestions(
        popularSearches.filter((item) =>
          item.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setSuggestions([]);
    }
  };

  const handleClear = () => {
    setQuery("");
    setResults([]);
    setSuggestions([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header / Search Bar */}
      <div className="flex items-center gap-2 mb-4">
        <button onClick={() => navigate("/")} className="text-gray-600">
          <IoChevronBack size={24} />
        </button>
        <div className="flex flex-1 items-center bg-white rounded-xl px-4 py-2 shadow-sm">
          <IoSearch className="text-gray-400 mr-2" size={20} />
          <input
            type="text"
            className="flex-1 outline-none"
            placeholder="Search products..."
            value={query}
            onChange={handleInputChange}
            autoFocus
          />
          {query && (
            <button onClick={handleClear}>
              <IoCloseCircle className="text-gray-400" size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="bg-white rounded-xl shadow p-3 mb-4">
          <h3 className="text-gray-500 text-sm mb-2">Suggestions</h3>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((s, idx) => (
              <button
                key={idx}
                className="px-3 py-1 bg-gray-100 rounded-full hover:bg-gray-200 transition"
                onClick={() => {
                  setQuery(s);
                  handleSearch(s);
                  setSuggestions([]);
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-xl shadow p-4 mb-4 flex flex-wrap gap-3">
        <button
          className={`px-3 py-1 rounded-full ${
            filters.category === "All"
              ? "bg-blue-500 text-white"
              : "bg-gray-100"
          }`}
          onClick={() => setFilters({ ...filters, category: "All" })}
        >
          All
        </button>
        <button
          className={`px-3 py-1 rounded-full ${
            filters.category === "Electronics"
              ? "bg-blue-500 text-white"
              : "bg-gray-100"
          }`}
          onClick={() => setFilters({ ...filters, category: "Electronics" })}
        >
          Electronics
        </button>
        <button
          className={`px-3 py-1 rounded-full ${
            filters.category === "Wearables"
              ? "bg-blue-500 text-white"
              : "bg-gray-100"
          }`}
          onClick={() => setFilters({ ...filters, category: "Wearables" })}
        >
          Wearables
        </button>
      </div>

      {/* Search Results */}
      <div>
        {loading && <p className="text-gray-500">Loading...</p>}

        {!loading && results.length === 0 && query && (
          <div className="text-center text-gray-500 mt-8">
            <p>No results found for "{query}"</p>
            <p className="mt-2 text-sm">
              Try different keywords or browse popular products.
            </p>
          </div>
        )}

        {!loading && results.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
