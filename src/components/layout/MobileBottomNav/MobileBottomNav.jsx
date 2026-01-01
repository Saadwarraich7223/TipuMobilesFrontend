import { useEffect, useState, Fragment } from "react";

import { Home, ShoppingCart, LogIn, Compass } from "lucide-react";

import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../context/AuthContext";
import { cld } from "../../../utlis/CloudinaryImageSizeReducer/cloudinary";

export default function MobileBottomNav() {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [activePath, setActivePath] = useState("/");
  const location = useLocation();

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location.pathname]);

  const navItems = [
    { label: "Home", icon: Home, path: "/" },
    { label: "Explore", icon: Compass, path: "/products" },
    { label: "Cart", icon: ShoppingCart, path: "/cart" },
    {
      label: "Account",
      icon: user ? null : LogIn, // Show login icon if no user
      path: "/profile",
    },
  ];

  return (
    <>
      {/* Bottom nav */}
      <div
        style={{
          paddingBottom: "env(safe-area-inset-bottom)",
          height: "80px",
        }}
        className="w-full sm:hidden select-none fixed bottom-0 right-0 left-0 pb-safe z-20 flex items-end justify-center"
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
                <Fragment key={item.path}>
                  <button
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
                            ? "bg-primary/20 text-white shadow-lg"
                            : "bg-transparent group-hover:bg-gray-100"
                        }`}
                      >
                        {item.label === "Account" && user ? (
                          <div className="w-6 h-6">
                            <img
                              src={cld(
                                user.avatar.url,
                                "f_auto,q_auto,w_96,h_96,c_fill"
                              )}
                              alt={user.name}
                              width="24"
                              height="24"
                              className="w-full h-full rounded-full object-cover"
                            />
                          </div>
                        ) : (
                          <Icon
                            size={18}
                            className={`transition-colors duration-300 ${
                              active
                                ? "text-primary"
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
                  </button>
                </Fragment>
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
