import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingBag,
  Menu,
  ChevronDown,
  Zap,
  Filter,
  ChevronRight,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  setIsSideBarOpen,
  setSearchQuery,
  setShowCartSidebar,
  setShowMobileFilterBox,
} from "../../../store/uiSlice";
import { useCategories } from "../../../features/product/queries/categories";

const Navbar = ({ onMobileMenu }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: categories = [], isLoading: isCategoriesLoading } =
    useCategories();
  const { showMobileFilterBox } = useSelector((state) => state.ui);
  const { cart } = useSelector((state) => state.cart);
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  const isProductsPage = location.pathname.includes("products");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Products", hasDropdown: true, type: "products" },
    { name: "Categories", hasDropdown: true, type: "categories" },
    { name: "Pricing", hasDropdown: false, type: "pricing" },
    { name: "Resources", hasDropdown: true, type: "resources" },
  ];

  const featuredProducts = [
    {
      title: "New Arrivals",
      description: "Fresh picks this week",
      href: "/products/new",
    },
    {
      title: "Best Sellers",
      description: "Top-rated by shoppers",
      href: "/products/best-sellers",
    },
    {
      title: "Flash Sales",
      description: "Limited-time drops",
      href: "/products/flash-sales",
    },
    {
      title: "Bundles",
      description: "Save more together",
      href: "/products/bundles",
    },
  ];

  const resources = [
    {
      title: "Buying Guide",
      description: "Pick the right device",
      href: "/blog",
    },
    {
      title: "Warranty",
      description: "Coverage and repairs",
      href: "/warranty",
    },
    { title: "Shipping", description: "Delivery timelines", href: "/shipping" },
    { title: "Support", description: "We are here to help", href: "/support" },
  ];

  const handleNavigate = (href) => {
    setOpenMenu(null);
    navigate(href);
  };

  const renderDropdown = (link) => {
    if (!link.hasDropdown) return null;

    if (link.type === "categories") {
      const topCategories = Array.isArray(categories) ? categories : [];
      const tileTones = [
        "from-slate-50 via-white to-white",
        "from-amber-50 via-white to-white",
        "from-sky-50 via-white to-white",
        "from-rose-50 via-white to-white",
        "from-emerald-50 via-white to-white",
        "from-indigo-50 via-white to-white",
        "from-orange-50 via-white to-white",
        "from-teal-50 via-white to-white",
      ];
      return (
        <div className="absolute left-1/2 top-full mt-2 w-[720px] -translate-x-1/2">
          <div className="absolute -top-2 left-0 right-0 h-2" />
          <div className="rounded-2xl border border-gray-200 bg-transparent backdrop-blur-xl p-3 shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
            {isCategoriesLoading && (
              <div className="text-[12px] text-gray-500 px-2 py-6 text-center">
                Loading categories...
              </div>
            )}
            {!isCategoriesLoading && topCategories.length === 0 && (
              <div className="text-[12px] text-gray-500 px-2 py-6 text-center">
                No categories available yet.
              </div>
            )}
            {!isCategoriesLoading && (
              <div className="grid grid-cols-4 grid-flow-dense gap-2">
                {topCategories.slice(0, 10).map((category, index) => {
                  const hasChildren = (category.children?.length || 0) > 0;
                  const spanClass =
                    index === 0
                      ? "col-span-2 row-span-2"
                      : index === 2
                        ? "row-span-2"
                        : index === 5
                          ? "col-span-2"
                          : "col-span-1";
                  const toneClass = tileTones[index % tileTones.length];
                  return (
                    <button
                      key={category._id || category.slug || category.name}
                      onClick={() => {
                        handleNavigate(`/products/${category.slug}`);
                      }}
                      className={`relative z-0 text-left rounded-xl border border-gray-200/70 bg-gradient-to-br ${toneClass} p-4 transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(15,23,42,0.08)] ${spanClass} group/item hover:z-20`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-[13px] font-semibold text-gray-900">
                            {category.name}
                          </p>
                          <p className="mt-1 text-[11px] text-gray-600">
                            {category.children?.length
                              ? `${category.children.length} sub-categories`
                              : "Curated picks"}
                          </p>
                        </div>
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full  text-gray-700 text-[11px] font-medium">
                          <ChevronRight size={15} />
                        </span>
                      </div>
                      {hasChildren && (
                        <div className="absolute left-full top-2 ml-2 w-[240px] opacity-0 pointer-events-none group-hover/item:opacity-100 group-hover/item:pointer-events-auto transition-opacity duration-150 z-30">
                          <div className="rounded-xl border border-gray-200/80 bg-white/95 backdrop-blur-md shadow-[0_10px_24px_rgba(15,23,42,0.08)] overflow-hidden">
                            <div className="px-3 py-2 border-b border-gray-200/70 bg-gray-50">
                              <p className="text-[11px] font-medium text-gray-700">
                                {category.name}
                              </p>
                            </div>
                            <div className="grid grid-cols-1">
                              {category.children.map((child) => (
                                <button
                                  key={child._id || child.slug || child.name}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleNavigate(`/products/${child.slug}`);
                                  }}
                                  className="text-left border-b border-gray-200/70 px-3 py-2.5 text-[12px] text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                  {child.name}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      );
    }

    if (link.type === "products") {
      return (
        <div className="absolute left-1/2 top-full mt-2 w-[520px] -translate-x-1/2">
          <div className="absolute -top-2 left-0 right-0 h-2" />
          <div className="rounded-2xl border border-gray-200 bg-white/90 backdrop-blur-xl p-3 shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
            <div className="grid grid-cols-2 gap-2">
              {featuredProducts.map((item, idx) => (
                <button
                  key={item.title}
                  onClick={() => {
                    handleNavigate(item.href);
                  }}
                  className={`text-left rounded-xl border border-gray-200/70 bg-gradient-to-br from-slate-50 via-white to-white p-3 transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(15,23,42,0.08)] ${
                    idx === 0 ? "col-span-2" : ""
                  }`}
                >
                  <p className="text-[12px] font-semibold text-gray-900">
                    {item.title}
                  </p>
                  <p className="mt-1 text-[11px] text-gray-600">
                    {item.description}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (link.type === "resources") {
      return (
        <div className="absolute left-1/2 top-full mt-2 w-[460px] -translate-x-1/2">
          <div className="absolute -top-2 left-0 right-0 h-2" />
          <div className="rounded-2xl border border-gray-200 bg-white/90 backdrop-blur-xl p-3 shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
            <div className="grid grid-cols-2 gap-2">
              {resources.map((item) => (
                <button
                  key={item.title}
                  onClick={() => {
                    handleNavigate(item.href);
                  }}
                  className="text-left rounded-xl border border-gray-200/70 bg-gradient-to-br from-slate-50 via-white to-white p-3 transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(15,23,42,0.08)]"
                >
                  <p className="text-[12px] font-semibold text-gray-900">
                    {item.title}
                  </p>
                  <p className="mt-1 text-[11px] text-gray-600">
                    {item.description}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <>
      <header
        style={
          isScrolled
            ? {
                backgroundColor:
                  "color-mix(in srgb, var(--site-bg) 88%, transparent)",
              }
            : undefined
        }
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? "py-2 backdrop-blur-md shadow-[0_4px_18px_rgba(36,32,24,0.06)]"
            : "py-4 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-12">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              to="/"
              className="relative z-20 flex items-center gap-2 group"
            >
              <div className="w-8 h-8 rounded-lg border border-[#d9cfbf] bg-white/65 backdrop-blur-sm flex items-center justify-center text-[#8a6b47]">
                <Zap size={16} fill="currentColor" />
              </div>
              <span className="text-[17px] font-black tracking-tight text-[#171717]">
                Tipu Mobiles
              </span>
            </Link>

            {/* Desktop Nav Links - Centered */}
            <nav className="hidden lg:flex items-center gap-7 z-10">
              {navLinks.map((link) => (
                <div
                  key={link.name}
                  className="relative cursor-pointer group"
                  onMouseEnter={() => setOpenMenu(link.type)}
                  onMouseLeave={() => setOpenMenu(null)}
                >
                  <span className="flex items-center gap-1 text-[13px] font-semibold text-[#4f4a43] hover:text-[#171717] transition-colors">
                    {link.name}
                    {link.hasDropdown && (
                      <ChevronDown
                        size={14}
                        className="opacity-40 group-hover:rotate-180 transition-transform duration-300"
                      />
                    )}
                  </span>
                  {openMenu === link.type ? renderDropdown(link) : null}
                </div>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="relative z-30 flex items-center gap-5">
              <div className="flex items-center gap-4 border-r border-[#d8cebf]/70 pr-5 hidden sm:flex">
                <button
                  onClick={() => handleNavigate("/products")}
                  className="text-[#4f4a43] hover:text-[#171717] transition-colors"
                  aria-label="Search products"
                >
                  <Search size={18} strokeWidth={2.5} />
                </button>
                <button
                  onClick={() => {
                    setOpenMenu(null);
                    dispatch(setShowCartSidebar(true));
                  }}
                  className="text-[#4f4a43] hover:text-[#171717] transition-colors relative"
                  aria-label="Open cart"
                >
                  <ShoppingBag size={18} strokeWidth={2.5} />
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#171717] text-white text-[9px] font-black rounded-full flex items-center justify-center border-2 border-[#f7f3ea]">
                    {cart?.items?.length}
                  </span>
                </button>
              </div>

              <div className="flex items-center gap-4">
                {isLoggedIn ? (
                  <motion.button
                    onClick={() => handleNavigate("/profile")}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-full border border-[#d8cebf] bg-white/70 backdrop-blur-sm text-[13px] font-semibold text-[#171717] transition-all hover:bg-white"
                  >
                    {user?.avatar?.url ? (
                      <img
                        src={user.avatar.url}
                        alt={user?.name || "Profile"}
                        className="w-6 h-6 rounded-full object-cover border border-white"
                      />
                    ) : (
                      <span className="w-6 h-6 rounded-full bg-[#171717] text-white text-[11px] flex items-center justify-center">
                        {user?.name?.[0]?.toUpperCase() || "U"}
                      </span>
                    )}
                    <span>Account</span>
                  </motion.button>
                ) : (
                  <>
                    <button
                      onClick={() => handleNavigate("/login")}
                      className="text-[13px] font-semibold text-[#4f4a43] hover:text-[#171717] transition-colors hidden sm:block"
                    >
                      Sign In
                    </button>
                    <motion.button
                      onClick={() => handleNavigate("/register")}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-5 py-2 rounded-xl border border-[#d8cebf] bg-white/65 backdrop-blur-sm text-[13px] font-semibold text-[#171717] transition-all hover:bg-white/90 hover:border-[#cdbca3] hidden md:block"
                    >
                      Get Started
                    </motion.button>
                  </>
                )}

                {/* Mobile Menu Icon */}
                <button
                  onClick={() => {
                    setOpenMenu(null);
                    if (onMobileMenu) {
                      onMobileMenu();
                    } else {
                      dispatch(setIsSideBarOpen(true));
                    }
                  }}
                  className="lg:hidden p-2 text-[#171717]"
                >
                  <Menu size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Products page: mobile search row */}
          {isProductsPage && (
            <div className="flex items-center gap-2 md:hidden py-1 mt-1">
              <div className="flex items-center w-full rounded-2xl border border-[#ddd4c8] bg-white/72 backdrop-blur-md px-4 py-2.5 shadow-[0_8px_20px_rgba(36,32,24,0.05)]">
                {!isFocused && (
                  <Search
                    size={18}
                    className="mr-2 text-[#8a8a8a] transition-opacity duration-200"
                  />
                )}
                <input
                  type="text"
                  placeholder="Search products"
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  onChange={(event) =>
                    dispatch(setSearchQuery(event.target.value))
                  }
                  className="w-full bg-transparent text-sm text-[#4f4a43] outline-none placeholder:text-[#8a8a8a]"
                />
              </div>

              <button
                aria-label="Filter products"
                title="Filter products"
                onClick={() =>
                  dispatch(setShowMobileFilterBox(!showMobileFilterBox))
                }
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#ddd4c8] bg-white/72 text-[#8a6b47] shadow-[0_8px_20px_rgba(36,32,24,0.05)]"
              >
                <Filter size={18} />
              </button>
            </div>
          )}
        </div>
      </header>
      {/* Spacing for transparent header */}
      <div className="h-[80px]" />
    </>
  );
};

export default Navbar;
