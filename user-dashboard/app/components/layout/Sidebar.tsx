import { NavLink } from "react-router";
import {
  LayoutDashboard,
  Package,
  Clock,
  Truck,
  CheckCircle,
  XCircle,
  Heart,
  MapPin,
  Lock,
  User,
  LogOut,
  ChevronDown,
  Loader,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [isOrdersExpanded, setIsOrdersExpanded] = useState(false);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
      isActive
        ? "bg-blue-50 text-blue-600"
        : "text-gray-700 hover:bg-gray-100"
    }`;

  const subNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-2.5 pl-12 rounded-lg transition-all text-sm ${
      isActive
        ? "bg-blue-50 text-blue-600"
        : "text-gray-600 hover:bg-gray-100"
    }`;

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-40 transition-transform duration-300 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0
        `}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b">
            <h2 className="text-xl">ShopHub</h2>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-1">
              <NavLink to="/" end className={navLinkClass} onClick={onClose}>
                <LayoutDashboard className="w-5 h-5" />
                <span>Dashboard</span>
              </NavLink>

              {/* Orders Section */}
              <div>
                <button
                  onClick={() => setIsOrdersExpanded(!isOrdersExpanded)}
                  className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Package className="w-5 h-5" />
                    <span>My Orders</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      isOrdersExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOrdersExpanded && (
                  <div className="mt-1 space-y-1">
                    <NavLink
                      to="/orders"
                      end
                      className={subNavLinkClass}
                      onClick={onClose}
                    >
                      <Package className="w-4 h-4" />
                      <span>All Orders</span>
                    </NavLink>
                    <NavLink
                      to="/orders/pending"
                      className={subNavLinkClass}
                      onClick={onClose}
                    >
                      <Clock className="w-4 h-4" />
                      <span>Pending</span>
                    </NavLink>
                    <NavLink
                      to="/orders/processing"
                      className={subNavLinkClass}
                      onClick={onClose}
                    >
                      <Loader className="w-4 h-4" />
                      <span>Processing</span>
                    </NavLink>
                    <NavLink
                      to="/orders/shipped"
                      className={subNavLinkClass}
                      onClick={onClose}
                    >
                      <Truck className="w-4 h-4" />
                      <span>Being Shipped</span>
                    </NavLink>
                    <NavLink
                      to="/orders/delivered"
                      className={subNavLinkClass}
                      onClick={onClose}
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Delivered</span>
                    </NavLink>
                    <NavLink
                      to="/orders/cancelled"
                      className={subNavLinkClass}
                      onClick={onClose}
                    >
                      <XCircle className="w-4 h-4" />
                      <span>Cancelled</span>
                    </NavLink>
                  </div>
                )}
              </div>

              <NavLink to="/wishlist" className={navLinkClass} onClick={onClose}>
                <Heart className="w-5 h-5" />
                <span>Wishlist</span>
              </NavLink>

              <NavLink to="/addresses" className={navLinkClass} onClick={onClose}>
                <MapPin className="w-5 h-5" />
                <span>Shipping Addresses</span>
              </NavLink>

              <NavLink
                to="/change-password"
                className={navLinkClass}
                onClick={onClose}
              >
                <Lock className="w-5 h-5" />
                <span>Change Password</span>
              </NavLink>

              <NavLink
                to="/edit-profile"
                className={navLinkClass}
                onClick={onClose}
              >
                <User className="w-5 h-5" />
                <span>Edit Profile</span>
              </NavLink>
            </div>
          </nav>

          {/* Logout */}
          <div className="p-4 border-t">
            <button
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all"
              onClick={() => {
                toast.success("Logged out successfully!");
                onClose();
              }}
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}