import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();

  /* ================= UI State Only ================= */
  const [showProductView, setShowProductView] = useState(false);
  const [showCartSidebar, setShowCartSidebar] = useState(false);
  const [showMobileFilterBox, setShowMobileFilterBox] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const value = {
    navigate,

    showProductView,
    setShowProductView,

    showCartSidebar,
    setShowCartSidebar,

    showMobileFilterBox,
    setShowMobileFilterBox,

    isSideBarOpen,
    setIsSideBarOpen,

    searchQuery,
    setSearchQuery,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
