import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "../../../components/layout/Navbar/Navbar";
import CartSidebar from "../../cart/components/CartSidebar/CartSidebar";
import CategorySidebar from "../../../components/layout/CategorySidebar/CategorySidebar";
import { setIsSideBarOpen } from "../../../store/uiSlice";
import UserSidebar from "./UserSidebar";
import ProfileHeader from "./ProfileHeader";

export default function UserDashboardLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const { showCartSidebar, isSideBarOpen } = useSelector((state) => state.ui);

  return (
    <div className="min-h-screen app-shell">
      <Navbar onMobileMenu={() => setIsMobileMenuOpen((prev) => !prev)} />

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

      <UserSidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      <div className="lg:ml-70 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ProfileHeader />
          <div className="mt-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
