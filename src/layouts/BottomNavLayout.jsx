import React from "react";
import { Outlet } from "react-router-dom";
import MobileBottomNav from "../components/layout/MobileBottomNav/MobileBottomNav";

const BottomNavLayout = () => {
  return (
    <>
      <div className="pb-[72px] sm:pb-0">
        <Outlet />
      </div>
      <MobileBottomNav />
    </>
  );
};

export default BottomNavLayout;
