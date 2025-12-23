import React, { useEffect, useState } from "react";
import { FiUser, FiPhone, FiMail, FiCamera, FiSave, FiX } from "react-icons/fi";
import { IoChevronBack } from "react-icons/io5";
import { useAuthContext } from "../../../context/AuthContext";
import ClipLoader from "react-spinners/ClipLoader";
import toast from "react-hot-toast";
import ProfileSkeleton from "../../layout/ShimmerSkeltons/ProfileSkeleton";

export default function EditProfile() {
  const { navigate, user, loadingUser, updateProfile } = useAuthContext();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    avatar: null,
  });
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  // Load user data
  useEffect(() => {
    if (user) {
      setProfile(user);
      if (user.avatar?.url) setImagePreview(user.avatar.url);
    }
  }, [user]);

  if (loadingUser) {
    return <ProfileSkeleton />;
  }

  // Validations
  const validateProfile = () => {
    if (!profile.name.trim()) return "Name is required";
    if (!profile.email.trim()) return "Email is required";
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(profile.email)) return "Invalid email address";
    if (!profile.phone.trim()) return "Phone number is required";
    return null;
  };

  const handleSubmit = async () => {
    const error = validateProfile();
    if (error) {
      toast.error(error);
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", profile.name);
      formData.append("email", profile.email);
      formData.append("phone", profile.phone);
      if (profile.avatar instanceof File) {
        formData.append("avatar", profile.avatar);
      }

      await updateProfile(formData);
      toast.success("Profile updated successfully");
      navigate("/profile");
    } catch (err) {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setProfile((prev) => ({ ...prev, avatar: file }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    if (!user) return;
    setProfile(user);
    setImagePreview(user.avatar?.url || null);
  };

  return (
    <div className="max-w-2xl mx-auto    bg-white rounded-xl shadow-md overflow-hidden p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate("/profile")}
          className="md:hidden p-2 rounded-full hover:bg-gray-100 transition"
        >
          <IoChevronBack size={24} />
        </button>
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Edit Profile</h1>
        </div>
      </div>

      {/* Avatar Upload */}
      <div className="flex justify-center mb-6 relative">
        <div className="relative group">
          <img
            src={
              imagePreview ||
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
            }
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
          />
          <label
            htmlFor="avatar-upload"
            className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
          >
            <FiCamera size={16} />
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-5">
        {/* Name */}
        <div className="relative">
          <FiUser
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleInputChange}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none text-gray-700 placeholder-transparent"
            placeholder="Full Name"
          />
          <label className="absolute left-10 -top-2 text-gray-500 text-sm bg-white px-1">
            Full Name *
          </label>
        </div>

        {/* Email */}
        <div className="relative">
          <FiMail
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleInputChange}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none text-gray-700 placeholder-transparent"
            placeholder="Email"
          />
          <label className="absolute left-10 -top-2 text-gray-500 text-sm bg-white px-1">
            Email Address *
          </label>
        </div>

        {/* Phone */}
        <div className="relative">
          <FiPhone
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="tel"
            name="phone"
            value={profile.phone}
            onChange={handleInputChange}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none text-gray-700 placeholder-transparent"
            placeholder="Phone"
          />
          <label className="absolute left-10 -top-2 text-gray-500 text-sm bg-white px-1">
            Phone Number *
          </label>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`flex-1 bg-primary text-white py-2 rounded-md font-medium hover:bg-primary/90 cursor-pointer transition-all flex items-center justify-center gap-2 ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? (
            <ClipLoader size={20} color="#fff" />
          ) : (
            <>
              <FiSave /> Save Changes
            </>
          )}
        </button>

        <button
          onClick={handleReset}
          className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-md font-medium hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
        >
          <FiX /> Reset
        </button>
      </div>
    </div>
  );
}
