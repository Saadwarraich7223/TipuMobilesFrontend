import React, { useEffect, useState } from "react";
import {
  IoHomeOutline,
  IoCartOutline,
  IoHeartOutline,
  IoLogInOutline,
} from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../context/AuthContext";
import { MdOutlineExplore } from "react-icons/md";

export default function MobileBottomNav() {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [activePath, setActivePath] = useState("/");
  const location = useLocation();

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location.pathname]);

  const navItems = [
    { label: "Home", icon: IoHomeOutline, path: "/" },
    { label: "Explore", icon: MdOutlineExplore, path: "/products" },
    { label: "Cart", icon: IoCartOutline, path: "/cart" },
    {
      label: "Account",
      icon: user ? null : IoLogInOutline, // Show login icon if no user
      path: "/profile",
    },
  ];

  return (
    <>
      {/* Bottom nav */}
      <div
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        className="w-full sm:hidden select-none   fixed bottom-0 right-0 left-0 pb-safe z-20 flex items-end justify-center"
      >
        <nav className="w-full bg-white rounded-t-xl backdrop-blur-xl border-t border-gray-200 shadow-xl">
          <ul className="relative flex justify-around items-center py-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active =
                item.path === "/profile"
                  ? item.path === "/profile"
                    ? ["/profile", "/login", "/register"].some((path) =>
                        activePath.startsWith(path)
                      )
                    : activePath === item.path
                  : activePath === item.path;

              return (
                <React.Fragment key={item.path}>
                  <li
                    className="flex cursor-pointer flex-col items-center group relative"
                    onClick={() => navigate(item.path)}
                  >
                    <div
                      className={`relative transition-all duration-300 ${
                        active ? "scale-110" : "group-hover:scale-105"
                      }`}
                    >
                      <div
                        className={`relative p-1.5 rounded-xl transition-all duration-300 ${
                          active
                            ? "bg-primary text-white shadow-lg"
                            : "bg-transparent group-hover:bg-gray-100"
                        }`}
                      >
                        {item.label === "Account" && user ? (
                          <img
                            src={user.avatar?.url}
                            alt="Avatar"
                            className="w-6 h-6 rounded-full object-cover"
                          />
                        ) : (
                          <Icon
                            size={18}
                            className={`transition-colors duration-300 ${
                              active
                                ? "text-white"
                                : "text-gray-500 group-hover:text-primary"
                            }`}
                          />
                        )}
                      </div>
                    </div>

                    <span
                      className={`text-[9px] mt-0.5 font-medium transition-all duration-300 ${
                        active
                          ? "text-primary"
                          : "text-gray-500 group-hover:text-gray-700"
                      }`}
                    >
                      {item.label}
                    </span>
                  </li>
                </React.Fragment>
              );
            })}
          </ul>

          <div className="flex justify-center pb-1">
            <div className="w-24 h-1 bg-gray-300 rounded-full"></div>
          </div>
        </nav>
      </div>
    </>
  );
}
