import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";
import { MotionConfig } from "framer-motion";
import AppRoutes from "./routes/AppRoutes";
import ScrollToTop from "./components/ui/ScrollToTop";
import { fetchProfile } from "./features/auth/store/authSlice";
import { fetchCart, initializeCart } from "./features/cart/store/cartSlice";
import { applyTheme, getStoredTheme } from "./theme/themes";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    applyTheme(getStoredTheme());
  }, []);

  useEffect(() => {
    // Initialize Auth
    dispatch(fetchProfile());

    // Initialize Cart
    const cartToken = localStorage.getItem("cartToken");
    if (cartToken) {
      dispatch(fetchCart());
    } else {
      dispatch(initializeCart());
    }
  }, [dispatch]);

  return (
    <MotionConfig reducedMotion="always">
      <div className="app-shell">
        <ScrollToTop />
        <Toaster position="top-center" reverseOrder={false} />
        <AppRoutes />
      </div>
    </MotionConfig>
  );
};

export default App;

