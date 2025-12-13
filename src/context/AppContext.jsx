import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import categoriesApi from "../api/categories";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [showProductView, setShowProductView] = useState(false);
  const [showCartSidebar, setShowCartSidebar] = useState(false);
  const [showMobileFilterBox, setShowMobileFilterBox] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchProductsByCat = async (slug, filters = {}) => {
    try {
      setLoading(true);
      const res = await categoriesApi.getProductsByCategory(slug, filters);
      return res.products;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await categoriesApi.getCategoriesTree();
      console.log(res);
      console.log(res.data);
      setCategories(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const value = {
    showProductView,
    setShowProductView,
    showCartSidebar,
    setShowCartSidebar,
    showMobileFilterBox,
    setShowMobileFilterBox,

    categories,
    loading,
    navigate,
    fetchProductsByCat,
    setIsSideBarOpen,
    isSideBarOpen,
    searchQuery,
    setSearchQuery,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
