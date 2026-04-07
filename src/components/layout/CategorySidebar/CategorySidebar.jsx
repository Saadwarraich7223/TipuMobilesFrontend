import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronDown, Compass } from "lucide-react";
import { useCategories } from "../../../features/product/queries/categories";
import { setIsSideBarOpen } from "../../../store/uiSlice";

const CategoryItem = ({ category, level = 0 }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { slug } = useParams();

  const navigateToProducts = (e) => {
    e.stopPropagation();
    navigate(`/products/${category.slug}`);
    dispatch(setIsSideBarOpen(false));
  };

  const isActive = slug === category.slug;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li className="mb-0.5 last:mb-0">
      <div
        className={`group flex justify-between items-center p-2.5 cursor-pointer rounded-2xl transition-all duration-300 ${
          isActive
            ? "bg-white/85 border border-[#ddd4c8]/70 text-[#171717] shadow-[0_10px_24px_rgba(36,32,24,0.08)]"
            : "hover:bg-white/70 text-[var(--site-fg)]"
        }`}
        onClick={() => setIsOpen(!isOpen)}
        style={{ paddingLeft: `${(level + 1) * 12}px` }}
      >
        <div className="flex items-center gap-3 overflow-hidden">
          {level === 0 && (
            <div
              className={`p-2 rounded-xl border ${
                isActive
                  ? "bg-white/80 border-[#ddd4c8]/70 text-[#8a6b47]"
                  : "bg-white/60 border-[#ddd4c8]/40 text-[#8a8a8a]"
              }`}
            >
              {category.image ? (
                <img
                  src={category.image.url}
                  alt={category.name}
                  className="w-5 h-5 object-cover rounded-md"
                />
              ) : (
                <Compass size={16} />
              )}
            </div>
          )}
          <span
            onClick={navigateToProducts}
            className="text-[13px] sm:text-[14px] flex-1 truncate whitespace-nowrap"
          >
            {category.name}
          </span>
        </div>
        {category.children?.length > 0 && (
          <button
            className="p-1.5 rounded-full hover:bg-black/5 transition-colors shrink-0"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
          >
            <ChevronDown
              size={16}
              className={`transition-transform duration-200 ${
                isOpen ? "rotate-180 text-[#8a6b47]" : "text-[#b0a79a]"
              }`}
            />
          </button>
        )}
      </div>
      <AnimatePresence>
        {isOpen && category.children?.length > 0 && (
          <motion.ul
            className="mt-1 overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeInOut" }}
          >
            {category.children.map((child) => (
              <CategoryItem
                key={child._id}
                category={child}
                level={level + 1}
              />
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
};

const CategorySidebar = () => {
  const dispatch = useDispatch();
  const { data: categories = [] } = useCategories();
  const [query, setQuery] = useState("");

  const filtered = categories.filter((category) =>
    category.name?.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="w-full h-full  bg-white  flex flex-col relative overflow-hidden border-r border-[#ddd4c8]/20">
      <div className="flex items-center justify-between p-4 border-b border-[#e6ded4] relative z-10 shrink-0">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-[#8a6b47]/70 font-semibold">
            Browse
          </p>
          <h2 className="text-lg font-bold tracking-tight text-[#171717]">
            Categories
          </h2>
        </div>
        <button
          aria-label="Close"
          onClick={() => dispatch(setIsSideBarOpen(false))}
          className="p-2 rounded-full border border-[#ddd4c8]/70 bg-white/70 text-[#8a6b47] hover:bg-white transition-all cursor-pointer"
        >
          <X size={18} />
        </button>
      </div>

      <div className="px-4 pt-3">
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search categories"
          className="w-full rounded-2xl border border-[#ddd4c8]/70 bg-white/70 px-3 py-2 text-sm text-[#4f4a43] outline-none focus:ring-1 focus:ring-[#8a6b47]/40"
        />
      </div>

      <ul
        className="flex-1 overflow-y-auto p-3 space-y-0.5 relative z-10"
        style={{ scrollbarWidth: "none" }}
      >
        {filtered?.map((category) => (
          <CategoryItem key={category._id} category={category} />
        ))}
      </ul>
    </div>
  );
};

export default CategorySidebar;
