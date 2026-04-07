import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Camera, Save } from "lucide-react";
import { format } from "date-fns";
import toast from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";

import ProfileSkeleton from "../../../components/layout/ShimmerSkeletons/ProfileSkeleton";
import { updateProfile } from "../../auth/store/authSlice";

export default function EditProfile() {
  const dispatch = useDispatch();
  const { user, loading: authLoading } = useSelector((state) => state.auth);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    avatar: null,
  });
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        avatar: null,
      });
      if (user.avatar?.url) setImagePreview(user.avatar.url);
    }
  }, [user]);

  if (authLoading) {
    return <ProfileSkeleton />;
  }

  const validateProfile = () => {
    if (!profile.name?.trim()) return "Name is required";
    if (!profile.email?.trim()) return "Email is required";
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(profile.email)) return "Invalid email address";
    if (!profile.phone?.trim()) return "Phone number is required";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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

      await dispatch(updateProfile(formData)).unwrap();
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error(err || "Failed to update profile");
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
    setProfile({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      avatar: null,
    });
    setImagePreview(user.avatar?.url || null);
  };

  const memberSince = user?.createdAt
    ? format(new Date(user.createdAt), "MMMM yyyy")
    : "—";

  return (
    <div className="space-y-6">
      <h1 className="text-xl sm:text-2xl md:text-3xl text-[#171717]">
        Edit Profile
      </h1>

      <div className="surface-raised rounded-2xl border-[#ddd4c8]/60 p-4 sm:p-6 md:p-8">
        <div className="mb-8 pb-8 border-b">
          <h2 className="text-lg sm:text-xl mb-4 text-[#171717]">
            Profile Photo
          </h2>
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="relative group">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border border-[#ddd4c8]/70 bg-white/70 shadow-[0_12px_24px_rgba(23,23,23,0.08)]">
                <img
                  src={
                    imagePreview ||
                    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
                  }
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <label className="absolute bottom-0 right-0 p-2 bg-[#171717] text-white rounded-full shadow-lg hover:bg-black transition-colors cursor-pointer">
                <Camera className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  ref={fileInputRef}
                  className="hidden"
                />
              </label>
            </div>
            <div>
              <button
                type="button"
                className="mb-2 px-3 sm:px-4 py-2 rounded-xl border border-[#ddd4c8]/70 text-[#4f4a43] hover:bg-white/70 text-sm"
                onClick={() => fileInputRef.current?.click()}
              >
                Upload New Photo
              </button>
              <p className="text-xs sm:text-sm text-[#6b5e54]">
                JPG, PNG or GIF. Max size 2MB.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h2 className="text-lg sm:text-xl mb-4 text-[#171717]">
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label htmlFor="name" className="text-xs sm:text-sm text-[#6b5e54]">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  value={profile.name}
                  onChange={handleInputChange}
                  required
                  className="w-full mt-2 px-3 py-2.5 border border-[#ddd4c8]/70 rounded-xl bg-white/70 focus:outline-none focus:ring-1 focus:ring-[#8a6b47]/40 text-sm"
                />
              </div>
              <div>
                <label htmlFor="email" className="text-xs sm:text-sm text-[#6b5e54]">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={profile.email}
                  onChange={handleInputChange}
                  required
                  className="w-full mt-2 px-3 py-2.5 border border-[#ddd4c8]/70 rounded-xl bg-white/70 focus:outline-none focus:ring-1 focus:ring-[#8a6b47]/40 text-sm"
                />
              </div>
              <div>
                <label htmlFor="phone" className="text-xs sm:text-sm text-[#6b5e54]">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={profile.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full mt-2 px-3 py-2.5 border border-[#ddd4c8]/70 rounded-xl bg-white/70 focus:outline-none focus:ring-1 focus:ring-[#8a6b47]/40 text-sm"
                />
              </div>
            </div>
          </div>

          <div className="pt-6 border-t">
            <h2 className="text-lg sm:text-xl mb-4 text-[#171717]">
              Account Details
            </h2>
            <div className="bg-white/70 border border-[#ddd4c8]/60 rounded-2xl p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-xs sm:text-sm text-[#6b5e54]">
                  Member Since
                </span>
                <span className="text-xs sm:text-sm text-[#171717]">
                  {memberSince}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs sm:text-sm text-[#6b5e54]">
                  Account Type
                </span>
                <span className="text-xs sm:text-sm text-[#171717]">
                  Customer
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-6">
            <button
              type="button"
              className="flex-1 md:flex-none px-4 py-2.5 rounded-xl border border-[#ddd4c8]/70 text-[#4f4a43] hover:bg-white/70 text-sm"
              onClick={handleReset}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-[#171717] text-white hover:bg-black text-sm"
            >
              {loading ? (
                <ClipLoader size={16} color="#fff" />
              ) : (
                <>
                  <Save className="w-4 h-4 inline-block mr-2" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
