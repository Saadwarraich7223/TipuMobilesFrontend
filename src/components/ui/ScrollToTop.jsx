// ScrollToTop.jsx
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const prevPath = useRef(pathname);

  useEffect(() => {
    // Manual scroll restoration
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Only scroll to top if path changed (new page)
    if (prevPath.current !== pathname) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }

    prevPath.current = pathname;
  }, [pathname]);

  return null;
};

export default ScrollToTop;
