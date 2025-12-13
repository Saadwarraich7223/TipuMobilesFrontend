import React from "react";
import { Link } from "react-router-dom";

const TopStrip = () => {
  return (
    <div className="hidden md:flex top-strip py-2 text-[13px] border-b border-gray-200">
      <div className="container">
        <div className="flex items-center justify-between">
          <div className="py-1 w-[50%]">
            <p className=" text-gray-600 font-medium">
              Get up to 50% off new season styles, limited time only
            </p>
          </div>
          <ul className="flex text-gray-700  items-center gap-4 font-medium ">
            <Link to={"#"}>
              <li className="cursor-pointer hover:text-gray-800 transition">
                Help Center
              </li>
            </Link>
            <Link to={"#"}>
              <li className="cursor-pointer">Order Tracking</li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TopStrip;
