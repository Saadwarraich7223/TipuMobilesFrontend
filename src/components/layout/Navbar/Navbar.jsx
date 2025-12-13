import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { IoClose, IoNotificationsOutline } from "react-icons/io5";

import { BiSearch } from "react-icons/bi";
import { HiMenu } from "react-icons/hi";
import { GoHeart } from "react-icons/go";

import { useAppContext } from "../../../context/AppContext";
import { useAuthContext } from "../../../context/AuthContext";
import { LuShoppingCart } from "react-icons/lu";
import toast from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";
import CetgorySideBar from "../CategorySidebar/CetgorySideBar";
import { CgOptions } from "react-icons/cg";

// ---------------- COMPONENTS ------------------

const DropdownItem = ({ icon: Icon, label, onClick, isLogout }) => (
  <li
    onClick={onClick}
    className={`md:flex hidden items-center gap-3 px-4 py-2.5 cursor-pointer text-sm rounded-md transition 
      ${
        isLogout
          ? "text-red-600 hover:bg-red-100"
          : "text-gray-700 hover:bg-gray-100"
      }`}
  >
    <Icon size={17} />
    {label}
  </li>
);

const UserMenu = ({ user, navigate, logout }) => {
  const [open, setOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      setOpen(false);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return user ? (
    <div className="relative">
      {/* User Button */}
      <button
        onClick={() => setOpen(!open)}
        className="md:flex hidden items-center gap-2 px-3 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
      >
        <span className="font-medium text-gray-700 hidden md:block">
          {user.name}
        </span>
      </button>

      {/* Dropdown */}
      {open && (
        <ul className="absolute top-12 right-0 bg-white w-48 shadow-lg rounded-lg border z-50">
          <Link to="/profile">
            <DropdownItem
              icon={FiHeart}
              label="My Account"
              onClick={() => setOpen(false)}
            />
          </Link>

          <DropdownItem
            icon={IoNotificationsOutline}
            label="Orders"
            onClick={() => setOpen(false)}
          />

          <DropdownItem
            icon={FiHeart}
            label="My Wishlist"
            onClick={() => setOpen(false)}
          />

          <DropdownItem
            icon={IoClose}
            label="Logout"
            isLogout
            onClick={logoutHandler}
          />
        </ul>
      )}
    </div>
  ) : (
    <button
      onClick={() => navigate("/login")}
      className="px-5 py-2 rounded-full bg-black text-white text-sm font-semibold hover:bg-gray-900 transition"
    >
      Login
    </button>
  );
};

const MobileSidebar = ({ isOpen, setIsOpen }) => (
  <>
    <div
      onClick={() => setIsOpen(false)}
      className={`fixed inset-0 bg-black/40 duration-300 ${
        isOpen ? "visible opacity-100" : "invisible opacity-0"
      } z-40`}
    />

    <div
      className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 duration-300 
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      <CetgorySideBar setIsSideBarOpen={setIsOpen} />
    </div>
  </>
);

// ---------------- NAVBAR ------------------

const Navbar = () => {
  const {
    setShowCartSidebar,
    navigate,
    isSideBarOpen,
    setIsSideBarOpen,
    setShowMobileFilterBox,
  } = useAppContext();
  const { user, loadingUser, logout } = useAuthContext();
  const { setSearchQuery } = useAppContext();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const location = useLocation().pathname.includes("products");

  useEffect(() => {
    const listen = () => setIsScrolled(window.scrollY > 5);
    window.addEventListener("scroll", listen);
    return () => window.removeEventListener("scroll", listen);
  }, []);

  return (
    <header
      className={`w-full sticky px-1 top-0 z-50 bg-white transition shadow-sm 
        ${isScrolled ? "shadow-md" : ""}`}
    >
      <div className="md:px-4 py-3 flex items-center justify-between">
        {/* LEFT — Menu + Logo */}
        <div className="flex items-center gap-3">
          <button
            title="Shop By Categories"
            onClick={() => setIsSideBarOpen(!isSideBarOpen)}
            className="cursor-pointer text-gray-700"
          >
            {isSideBarOpen ? <IoClose size={24} /> : <HiMenu size={24} />}
          </button>

          <MobileSidebar isOpen={isSideBarOpen} setIsOpen={setIsSideBarOpen} />

          {/* Gradient Logo */}
          <Link
            to="/"
            className="font-bold text-xl bg-gradient-to-r from-gray-900 via-purple-500 to-purple-400 bg-clip-text text-transparent"
          >
            Tipu Mobiles
          </Link>
        </div>
        <div
          className="
      md:flex items-center min-w-[30%] hidden bg-white border border-gray-300 rounded-lg px-4 py-2
      w-[40%]] 
    "
        >
          <BiSearch size={20} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search here"
            className=" px-3 outline-none text-sm text-gray-700"
          />
        </div>

        {/* RIGHT — Icons */}
        <div className="flex items-center gep-2 md:gap-4">
          <div
            className="hidden md:flex
          "
          >
            {loadingUser ? (
              <ClipLoader size={22} color="#000" />
            ) : (
              <UserMenu user={user} navigate={navigate} logout={logout} />
            )}
          </div>

          <button
            title="Favorite Items"
            className="  text-gray-700 mr-2 cursor-pointer transition-all active:scale-95"
          >
            <Link to="/profile/wishlist">
              <GoHeart size={21} />
            </Link>
          </button>

          {/* Cart Primary */}
          <button
            title="Your Cart"
            onClick={() => {
              if (window.innerWidth < 768) {
                navigate("/cart"); // Mobile → Navigate
              } else {
                setShowCartSidebar(true); // Desktop → Open sidebar
              }
            }}
            className="text-gray-700 cursor-pointer active:scale-95"
          >
            <LuShoppingCart size={24} />
          </button>
        </div>
      </div>
      {/* Search Bar */}
      {location && (
        <div className="md:px-4 pb-4 flex md:hidden items-center w-full justify-center gap-2">
          <div className="flex items-center bg-white w-full border border-gray-300 rounded-lg py-2 px-4  transition-all duration-300">
            {/* Icon disappears and frees space */}
            {!isFocused && (
              <BiSearch
                size={20}
                className="text-gray-500 mr-2 transition-opacity duration-200"
              />
            )}

            <input
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
              placeholder="Search here"
              className="outline-none text-sm text-gray-700 w-full"
            />
          </div>

          <button
            title="Filter Products"
            onClick={() => setShowMobileFilterBox((prev) => !prev)}
            className="bg-white border border-gray-300 cursor-pointer p-2 rounded-lg text-gray-700 flex-shrink-0"
          >
            <CgOptions className="text-xl text-[#f75e5e]" />
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
