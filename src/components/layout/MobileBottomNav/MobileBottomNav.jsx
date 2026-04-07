import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Home, Store, ShoppingBag, User } from "lucide-react";
import { motion } from "framer-motion";

export default function MobileBottomNav() {
  const navigate = useNavigate();
  const [activePath, setActivePath] = useState("/");
  const location = useLocation();

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location.pathname]);

  const navItems = [
    { label: "Home", icon: Home, path: "/" },
    { label: "Store", icon: Store, path: "/products" },
    { label: "Cart", icon: ShoppingBag, path: "/cart" },
    {
      label: "Profile",
      icon: User,
      path: "/profile",
    },
  ];

  return (
    <div className="sm:hidden fixed bottom-5 left-1 right-1 z-[60] pb-safe pointer-events-none flex justify-center">
      <nav className="pointer-events-auto bg-white/80 backdrop-blur-2xl shadow-[0_20px_60px_rgba(36,32,24,0.18)] rounded-[1.25rem] border border-[#ddd4c8]/60 h-[68px] flex flex-row items-center justify-between w-full max-w-[420px] px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.path === "/profile"
              ? ["/profile", "/login", "/register", "/admin"].some((path) =>
                  activePath.startsWith(path),
                )
              : activePath === item.path;

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="relative flex flex-col cursor-pointer items-center justify-center flex-1 h-full touch-manipulation group gap-1"
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              <div className="relative flex items-center justify-center w-[58px] h-[34px]">
                {isActive && (
                  <motion.div
                    layoutId="navIconBackground"
                    className="absolute inset-0 bg-[#8a6b47] rounded-[1.25rem]"
                    transition={{ type: "spring", stiffness: 500, damping: 32 }}
                  />
                )}

                <div className="relative flex items-center justify-center w-full h-full z-10">
                  <Icon
                    size={21}
                    strokeWidth={isActive ? 2 : 1.6}
                    className={`transition-colors duration-300 ${
                      isActive
                        ? "text-white"
                        : "text-[#8a8a8a] group-hover:text-[#4f4a43]"
                    }`}
                  />
                </div>
              </div>

              <motion.span
                animate={{
                  color: isActive ? "#8a6b47" : "#8a8a8a",
                  y: isActive ? -1 : 0,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="text-[10px] font-semibold tracking-[0.12em]"
              >
                {item.label}
              </motion.span>

              {isActive && (
                <motion.span
                  layoutId="navDot"
                  className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-[#8a6b47]"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
