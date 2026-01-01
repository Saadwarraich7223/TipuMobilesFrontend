import { useEffect, useState } from "react";

import {
  ChevronLeft,
  Camera,
  CreditCard,
  CheckCircle,
  Clock,
  XCircle,
  Heart,
  User,
  MapPin,
  ChevronRight,
  LogOut,
  Grid,
  Plane,
  LockKeyhole,
} from "lucide-react";
import { useAppContext } from "../../context/AppContext";
import EditProfile from "../../components/user/EditProfile/EditProfile";
import ChangePassword from "../../components/user/ChangePassword/ChangePassword";

import UserOrders from "../../components/user/UserOrders/UserOrders";
import Wishlist from "../../components/user/WishList/WishList";
import { useAuthContext } from "../../context/AuthContext";
import ClipLoader from "react-spinners/ClipLoader";
import toast from "react-hot-toast";
import { useCart } from "../../context/CartContext";
import ShippingAddresses from "./ShippingAddresses";
import ProfileSkeleton from "../../components/layout/ShimmerSkeltons/ProfileSkeleton";

export default function ProfilePage() {
  const { navigate } = useAppContext();
  const { initializeCart } = useCart();
  const { user, loadingUser, logout, updateAvatar, setLoadingUser } =
    useAuthContext();
  const [selectedOrderStatus, setSelectedOrderStatus] = useState("All");
  const [selectedSection, setSelectedSection] = useState(null);

  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    setLoadingUser(true);
    if (user) {
      if (user.avatar?.url) setImagePreview(user.avatar.url);
    }
    setLoadingUser(false);
  }, [user]);
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);

      await handleAvatarUpdate(file);
    }
  };

  const logoutHandler = async () => {
    try {
      await logout();
      await initializeCart();
      navigate("/");
      toast.success("Logged out successfully");
    } catch (err) {
      toast.error(err.message || "Logout failed");
    }
  };
  const handleAvatarUpdate = async (file) => {
    setLoading(true);
    const data = await updateAvatar(file);
    setImagePreview(data.avatar.url);
    toast.success(data.message);
    setLoading(false);
  };

  const handleOrderClick = (status) => {
    if (window.innerWidth < 768) {
      // Mobile: navigate to orders page
      navigate(`/profile/orders?order-status=${status.toLowerCase()}`);
    } else {
      // Desktop / larger screen: show in side panel
      setSelectedOrderStatus(status);

      setSelectedSection("Orders");
    }
  };

  const handleMenuClick = (item) => {
    if (window.innerWidth < 768) {
      navigate(`/profile/${item.toLowerCase().replace(" ", "-")}`);
    } else {
      setSelectedSection(item);
    }
  };
  const orderStatus = [
    { icon: Grid, label: "All Orders", color: "bg-indigo-400" },
    { icon: CreditCard, label: "Pending", color: "bg-cyan-400" },
    { icon: Plane, label: "Being Shipped", color: "bg-teal-400" },
    { icon: CheckCircle, label: "Delivered", color: "bg-yellow-400" },
    { icon: Clock, label: "Processing", color: "bg-pink-400" },
    { icon: XCircle, label: "Cancelled", color: "bg-green-400" },
  ];

  const menuItems = [
    { icon: Heart, label: "Wishlist" },
    { icon: User, label: "Edit Profile" },
    { icon: LockKeyhole, label: "Change Password" },
    { icon: MapPin, label: "Shipping Address" },
  ];
  // return null;
  return (
    <div className="min-h-screen md:px-8   ">
      {loadingUser ? (
        <ProfileSkeleton />
      ) : (
        <div className="lg:grid lg:grid-cols-3 lg:gap-6 lg:p-6 lg:max-w-7xl lg:mx-auto">
          {/* Profile Card - Takes 1 column on large screens */}
          <div className="lg:col-span-1">
            <div className="  flex items-center justify-center lg:block">
              <div className="w-full max-w-md bg-white shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl lg:sticky lg:top-6">
                {/* Header */}
                <div className="relative ">
                  <div className="relative flex items-center justify-center w-full p-4 border-b border-gray-100">
                    {/* Back Button (left-aligned) */}
                    <button
                      onClick={() => navigate(-1)}
                      className="absolute cursor-pointer left-4 text-gray-700 hover:text-primary transition-colors duration-300"
                    >
                      <ChevronLeft size={24} />
                    </button>

                    {/* Centered Title */}
                    <h1 className="text-gray-700 text-md md:text-lg font-semibold transition-colors duration-300 hover:text-primary">
                      Profile
                    </h1>
                  </div>

                  {/* Profile Image */}
                  <div className="flex justify-center my-2">
                    <div className="relative group">
                      <div className="md:w-32 w-20 h-20 md:h-32 rounded-full overflow-hidden border-4 border-primary shadow-lg transform  transition-transform duration-300 group-hover:scale-105">
                        {loadingUser || loading ? (
                          <div className="w-full h-full flex items-center justify-center">
                            <ClipLoader size={20} color="#ff5252" />
                          </div>
                        ) : (
                          <img
                            src={imagePreview}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <button
                        onClick={() => {
                          document.getElementById("avatar-upload").click();
                        }}
                        className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md hover:bg-primary hover:text-white  transition-all cursor-pointer duration-300"
                      >
                        <Camera
                          size={20}
                          className="text-gray-600 group-hover:text-white transition-colors"
                        />
                      </button>
                      <input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </div>
                  </div>

                  {/* Name and Title */}
                  <div className="text-center md:border-b border-gray-200 md:pb-6 pb-15">
                    <h2 className="md:text-2xl text-lg font-semibold text-gray-800 transition-colors duration-300 hover:text-primary">
                      {user.name}
                    </h2>
                    <p className="text-xs text-gray-500 mb-2">{user.email}</p>
                  </div>

                  {/* Decorative Wave */}
                  <div className="absolute md:hidden -bottom-0 left-0 right-0 h-24">
                    <svg viewBox="0 0 500 100" className="w-full h-full">
                      <defs>
                        <linearGradient
                          id="waveGradient4"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="0%"
                        >
                          <stop offset="0%" stopColor="#f472b6" />
                          <stop offset="100%" stopColor="#ec4899" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M0,60 Q50,20 150,50 Q250,80 350,40 Q450,0 500,50 L500,100 L0,100 Z"
                        fill="url(#waveGradient4)"
                      />
                    </svg>
                  </div>
                </div>

                {/* My Orders Section */}
                <div className="md:px-6 px-4 z-50 py- md:pt-6 ">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    My Orders
                  </h3>

                  <div className="grid grid-cols-3 ">
                    {orderStatus.map((status, index) => (
                      <button
                        onClick={() => {
                          handleOrderClick(status.label.toLowerCase());
                        }}
                        key={index}
                        className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gray-50 transition-all duration-300 cursor-pointer "
                      >
                        <div
                          className={`${status.color} md:w-12 w-10 h-10 md:h-12 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110 hover:ring-4 hover:ring-pink-100`}
                        >
                          <status.icon
                            size={24}
                            className="text-white transition-transform duration-300 hover:rotate-12"
                          />
                        </div>
                        <span className="text-[10px] md:text-xs text-gray-700 text-center leading-tight transition-colors duration-300 hover:text-primary">
                          {status.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Menu Items */}

                <div className="px-4">
                  {menuItems.map((item, index) => (
                    <button
                      onClick={() => handleMenuClick(item.label)}
                      key={index}
                      className="
        w-full flex items-center justify-between p-4 mb-2 
        rounded-xl bg-gray-50 cursor-pointer 
        hover:bg-primary/10 hover:scale-105 
        transition-all duration-300
      "
                    >
                      <div className="flex items-center gap-3">
                        <item.icon
                          size={22}
                          className="text-gray-500 group-hover:text-primary transition-colors duration-300"
                        />
                        <span className="text-gray-700 text-sm md:text-base font-medium group-hover:text-primary transition-colors duration-300">
                          {item.label}
                        </span>
                      </div>
                      <ChevronRight
                        size={20}
                        className="text-gray-400 transition-colors duration-300 group-hover:text-primary"
                      />
                    </button>
                  ))}
                </div>

                {/* Logout Button */}
                <div className="px-4 py-6">
                  <button
                    onClick={() => logoutHandler()}
                    className="w-full bg-primary/90  rounded-xl flex items-center justify-center gap-2 py-3 text-white hover:bg-primary-dull cursor-pointer transition-all duration-300 hover:scale-105"
                  >
                    <LogOut size={20} />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Orders Data section - Only on Large Screens - Takes 2 columns */}
          <div className=" col-span-2 max-h-[900px] hidden md:block border border-gray-100  bg-white shadow-xl  overflow-auto">
            {/* Depending on the selected section, we show dynamic content */}
            {selectedSection === "Orders" && (
              <UserOrders status={selectedOrderStatus} />
            )}
            {selectedSection === "Edit Profile" && <EditProfile />}
            {selectedSection === "Change Password" && <ChangePassword />}
            {selectedSection === "Shipping Address" && <ShippingAddresses />}
            {selectedSection === "Wishlist" && <Wishlist />}
          </div>
        </div>
      )}
    </div>
  );
}
