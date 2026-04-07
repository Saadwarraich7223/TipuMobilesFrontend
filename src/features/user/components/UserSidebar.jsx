import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Heart,
  MapPin,
  Lock,
  User,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import { logout } from "../../auth/store/authSlice";
import { fetchCart } from "../../cart/store/cartSlice";

export default function UserSidebar({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [showLogoutPrompt, setShowLogoutPrompt] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `group relative flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl transition-all ${
      isActive
        ? "active bg-white/80 text-[#171717] shadow-[0_10px_24px_rgba(36,32,24,0.08)]"
        : "text-[#6b5e54] hover:bg-white/70"
    }`;

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      dispatch(fetchCart());
      navigate("/");
      toast.success("Logged out successfully");
    } catch (err) {
      toast.error(err?.message || "Logout failed");
    } finally {
      onClose();
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-56 sm:w-60 md:w-72 surface-raised border-r border-[#ddd4c8]/60 shadow-[0_20px_60px_rgba(36,32,24,0.18)] z-40 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="h-full flex flex-col">
          <div className="relative p-4 sm:p-5 border-b border-[#e6ded4]">
            <div className="flex items-center gap-2.5 sm:gap-3">
              {user?.avatar?.url ? (
                <img
                  src={user.avatar.url}
                  alt={user?.name || "Profile"}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl object-cover border border-[#ddd4c8]/70 bg-white/70"
                />
              ) : (
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-white/70 border border-[#ddd4c8]/70 flex items-center justify-center text-[#8a6b47] font-semibold text-sm">
                  {user?.name?.[0]?.toUpperCase() || "U"}
                </div>
              )}
              <div className="min-w-0">
                <p className="text-[13px] sm:text-sm font-semibold text-[#171717] truncate">
                  {user?.name || "Your Account"}
                </p>
                <p className="text-[11px] sm:text-xs text-[#6b5e54] truncate">
                  {user?.email || "Welcome back"}
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setShowLogoutPrompt(true);
              }}
              className="absolute top-4 right-4 sm:top-6 sm:right-5 w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl border border-[#ddd4c8]/70 bg-white/70 hover:bg-white transition flex items-center justify-center text-[#8a6b47]"
              aria-label="Logout"
              title="Logout"
            >
              <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          <nav className="flex-1 p-3 sm:p-4 pb-10 overflow-y-auto">
            <div className="space-y-1.5 sm:space-y-2">
              <p className="px-3 sm:px-4 text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-[#8a6b47]/70 font-semibold">
                Overview
              </p>
              <NavLink
                to="/profile"
                end
                className={navLinkClass}
                onClick={onClose}
              >
                <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-full bg-[#8a6b47] opacity-0 group-[.active]:opacity-100" />
                <LayoutDashboard className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Dashboard</span>
              </NavLink>

              <NavLink
                to="/profile/orders"
                className={navLinkClass}
                onClick={onClose}
              >
                <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-full bg-[#8a6b47] opacity-0 group-[.active]:opacity-100" />
                <Package className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">My Orders</span>
              </NavLink>

              <p className="px-3 sm:px-4 pt-3 text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-[#8a6b47]/70 font-semibold">
                Account
              </p>
              <NavLink
                to="/profile/wishlist"
                className={navLinkClass}
                onClick={onClose}
              >
                <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-full bg-[#8a6b47] opacity-0 group-[.active]:opacity-100" />
                <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Wishlist</span>
              </NavLink>

              <NavLink
                to="/profile/shipping-address"
                className={navLinkClass}
                onClick={onClose}
              >
                <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-full bg-[#8a6b47] opacity-0 group-[.active]:opacity-100" />
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Shipping Addresses</span>
              </NavLink>

              <NavLink
                to="/profile/change-password"
                className={navLinkClass}
                onClick={onClose}
              >
                <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-full bg-[#8a6b47] opacity-0 group-[.active]:opacity-100" />
                <Lock className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Change Password</span>
              </NavLink>

              <NavLink
                to="/profile/edit-profile"
                className={navLinkClass}
                onClick={onClose}
              >
                <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-full bg-[#8a6b47] opacity-0 group-[.active]:opacity-100" />
                <User className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Edit Profile</span>
              </NavLink>
            </div>
          </nav>

          <div className="pb-24 lg:pb-4" />
        </div>
      </aside>

      {showLogoutPrompt && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
          onClick={() => setShowLogoutPrompt(false)}
        >
          <div
            className="w-full max-w-[20rem] sm:max-w-sm surface-raised rounded-3xl border-[#ddd4c8]/60 p-5 sm:p-6 shadow-[0_30px_80px_rgba(23,23,23,0.18)]"
            onClick={(event) => event.stopPropagation()}
          >
            <h3 className="text-base sm:text-lg font-semibold text-[#171717]">
              Log out?
            </h3>
            <p className="text-[13px] sm:text-sm text-[#6b5e54] mt-2">
              Are you sure you want to end your session?
            </p>
            <div className="mt-5 sm:mt-6 flex items-center gap-3">
              <button
                className="flex-1 rounded-2xl border border-[#ddd4c8]/70 bg-white/70 py-2.5 text-[#4f4a43] hover:bg-white transition text-sm"
                onClick={() => setShowLogoutPrompt(false)}
              >
                Cancel
              </button>
              <button
                className="flex-1 rounded-2xl bg-[#171717] py-2.5 text-white hover:bg-black transition text-sm"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
