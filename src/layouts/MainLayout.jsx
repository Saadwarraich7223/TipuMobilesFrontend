import { useDispatch, useSelector } from "react-redux";
import CartSidebar from "../features/cart/components/CartSidebar/CartSidebar";
import CategorySidebar from "../components/layout/CategorySidebar/CategorySidebar";
import { Outlet } from "react-router-dom";
import MobileBottomNav from "../components/layout/MobileBottomNav/MobileBottomNav";
import Navbar from "../components/layout/Navbar/Navbar";
import Footer from "../components/layout/Footer/Footer";
import { setIsSideBarOpen } from "../store/uiSlice";

const MainLayout = () => {
  const dispatch = useDispatch();
  const { showCartSidebar, isSideBarOpen } = useSelector((state) => state.ui);

  return (
    <div className="relative">
      <Navbar />

      {showCartSidebar && <CartSidebar />}
      {isSideBarOpen && (
        <div
          className="fixed inset-0 z-[70] bg-black/40 lg:hidden backdrop-blur-sm transition-all duration-300"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              dispatch(setIsSideBarOpen(false));
            }
          }}
        >
          <div
            className="h-full w-[88%] max-w-[360px]"
            onClick={(event) => event.stopPropagation()}
          >
            <CategorySidebar />
          </div>
        </div>
      )}
      <main className=" pb-10 md:pb-15 md:pt-0">
        <Outlet />
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
};

export default MainLayout;
