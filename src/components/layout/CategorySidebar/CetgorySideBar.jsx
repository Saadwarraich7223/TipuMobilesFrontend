import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";
import { IoCloseSharp } from "react-icons/io5";
import { useAppContext } from "../../../context/AppContext";
import { useParams } from "react-router-dom";

const CategoryItem = ({ category, level = 0 }) => {
  const { navigate, setIsSideBarOpen } = useAppContext();
  const { slug } = useParams();
  const navigateToProducts = () => {
    navigate(`/products/${category.slug}`);
    setIsSideBarOpen(false);
  };

  const isActive = slug === category.slug;

  const [isOpen, setIsOpen] = useState(false);
  return (
    <li className="bg-secondary  text-secondary rounded-md border-b border-gray-300">
      <div
        className="flex justify-between items-center bg-input-hover p-2.5 px-2 cursor-pointer rounded-md"
        onClick={() => setIsOpen(!isOpen)}
        style={{ paddingLeft: `${(level + 1) * 16}px` }} // responsive indentation
      >
        {" "}
        <span
          onClick={navigateToProducts}
          className={`font-medium text-[12px] ${
            isActive ? "text-primary" : ""
          }`}
        >
          {category.name}
        </span>
        {category.children?.length > 0 && (
          <IoIosArrowDown
            size={15}
            className={`transition-transform duration-300 ${
              isOpen ? "rotate-180 " : ""
            } `}
          />
        )}
      </div>
      <AnimatePresence>
        {isOpen && category.children?.length > 0 && (
          <motion.ul
            className="mt-1 overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
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

const CetgorySideBar = () => {
  const { categories, setIsSideBarOpen } = useAppContext();
  return (
    <div className="w-full  h-full bg-white shadow-lg p-4 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 border-b border-gray-200 pb-2">
        <h2 className="text-lg font-semibold text-gray-800">
          Shop by Categories
        </h2>
        <button
          onClick={() => setIsSideBarOpen(false)}
          className="text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
        >
          <IoCloseSharp size={24} />
        </button>
      </div>

      {/* Categories */}
      <ul
        style={{ scrollbarWidth: "none" }}
        className="flex-1  overflow-y-auto space-y-2"
      >
        {categories.map((category) => (
          <CategoryItem
            key={category._id}
            category={category}
            className="hover:bg-gray-100 rounded-md transition-colors px-2 py-1"
            setIsSideBarOpen={setIsSideBarOpen}
          />
        ))}
      </ul>
    </div>
  );
};

export default CetgorySideBar;
