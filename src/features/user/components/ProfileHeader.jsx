import { Camera, Edit, Home } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import toast from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";

import { updateAvatar } from "../../auth/store/authSlice";

export default function ProfileHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (user?.avatar?.url) {
      setImagePreview(user.avatar.url);
    }
  }, [user]);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);

    try {
      setUploading(true);
      const res = await dispatch(updateAvatar(file)).unwrap();
      setImagePreview(res.avatar?.url || imagePreview);
      toast.success(res.message || "Avatar updated");
    } catch (error) {
      toast.error(error || "Failed to update avatar");
    } finally {
      setUploading(false);
    }
  };

  const memberSince = user?.createdAt
    ? format(new Date(user.createdAt), "MMMM yyyy")
    : "—";

  return (
    <div className="surface-raised rounded-3xl border-[#ddd4c8]/60 p-4 sm:p-6 md:p-8">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 sm:gap-6">
        <div className="relative group">
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full overflow-hidden border border-[#ddd4c8]/70 bg-white/70 flex items-center justify-center shadow-[0_12px_24px_rgba(23,23,23,0.08)]">
            {uploading ? (
              <ClipLoader size={18} color="#8a6b47" />
            ) : (
              <img
                src={
                  imagePreview ||
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
                }
                alt="Profile"
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-0 right-0 p-2 bg-[#171717] text-white rounded-full shadow-lg hover:bg-black transition-colors"
            aria-label="Upload photo"
          >
            <Camera className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        <div className="flex-1">
          <h1 className="text-xl sm:text-2xl md:text-3xl mb-1 text-[#171717]">
            {user?.name || "User"}
          </h1>
          <p className="text-sm sm:text-base text-[#6b5e54]">
            {user?.email || "—"}
          </p>
          <p className="text-xs sm:text-sm text-[#8a6b47]/70 mt-1">
            Member since {memberSince}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center border border-[#ddd4c8]/70 bg-white/70 text-[#171717] px-3.5 py-2 rounded-xl text-sm sm:text-base hover:border-[#171717]/40 hover:shadow-sm transition"
          >
            <Home className="w-4 h-4 mr-2" />
            Home
          </button>
          <button
            onClick={() => navigate("/profile/edit-profile")}
            className="inline-flex items-center bg-[#171717] hover:bg-black text-white px-4 py-2 rounded-xl text-sm sm:text-base"
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}
