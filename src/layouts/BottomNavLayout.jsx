import React from "react";
import { Outlet } from "react-router-dom";
import MobileBottomNav from "../components/layout/MobileBottomNav/MobileBottomNav";

const BottomNavLayout = () => {
  return (
    <div className="relative mb-20 overflow-hidden">
      <Outlet />
      <MobileBottomNav />
    </div>
  );
};

export default BottomNavLayout;
