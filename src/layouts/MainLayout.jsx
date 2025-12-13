import { useAppContext } from "../context/AppContext";
import CartSidebar from "../components/layout/CartSidebar/CartSidebar";
import { Outlet } from "react-router-dom";
import Footer from "../components/common/Footer/Footer";
import TopStrip from "../components/layout/TopStrip/TopStrip";

import MobileBottomNav from "../components/layout/MobileBottomNav/MobileBottomNav";
import Navbar from "../components/layout/Navbar/Navbar";

const MainLayout = () => {
  const { showCartSidebar } = useAppContext();
  return (
    <div className="relative">
      {/* <Header /> */}
      <div className="sm:hidden md:block">
        <TopStrip />
      </div>

      <Navbar />

      {showCartSidebar && <CartSidebar />}
      <main className="  pb-20 md:pt-0">
        <Outlet />
      </main>
      <MobileBottomNav />
    </div>
  );
};

export default MainLayout;
