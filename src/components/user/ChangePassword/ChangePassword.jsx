import { useState } from "react";

import {
  Eye,
  X,
  EyeOff,
  Check,
  AlertCircle,
  ChevronLeft,
  Lock,
} from "lucide-react";
import { useAuthContext } from "../../../context/AuthContext";
import toast from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";

export default function ChangePassword() {
  const { navigate, updatePassword } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [error, setError] = useState("");

  const passwordRequirements = [
    { text: "At least 8 characters", test: (pwd) => pwd.length >= 8 },
    { text: "One uppercase letter", test: (pwd) => /[A-Z]/.test(pwd) },
    { text: "One lowercase letter", test: (pwd) => /[a-z]/.test(pwd) },
    { text: "One number", test: (pwd) => /[0-9]/.test(pwd) },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async () => {
    if (!passwords.current)
      return setError("Please enter your current password");
    if (!passwords.new) return setError("Please enter a new password");

    const allRequirementsMet = passwordRequirements.every((req) =>
      req.test(passwords.new)
    );
    if (!allRequirementsMet)
      return setError("New password does not meet all requirements");

    if (passwords.new !== passwords.confirm)
      return setError("Passwords do not match");

    if (passwords.current === passwords.new)
      return setError("New password must be different from current password");

    setLoading(true);
    try {
      const res = await updatePassword({
        oldPassword: passwords.current,
        newPassword: passwords.new,
      });

      // Success
      toast.success(res.message || "Password updated successfully");
      setPasswords({ current: "", new: "", confirm: "" });
      navigate("/profile");
    } catch (error) {
      // Handle Axios error
      if (error.response) {
        // Server responded with a status code outside 2xx
        const msg = error.response.data?.message || "Failed to update password";
        setError(msg);
        toast.error(msg);
      } else if (error.request) {
        // No response received
        setError("Server did not respond. Please try again later.");
        toast.error("Server did not respond. Please try again later.");
      } else {
        // Other errors
        setError("An unexpected error occurred");
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setPasswords({ current: "", new: "", confirm: "" });
    setError("");
  };

  return (
    <div className="max-w-md mx-auto mt-6 bg-white rounded-xl  p-2">
      <div className="flex items-center mb-2">
        <button
          onClick={() => navigate("/profile")}
          className="text-gray-700 md:hidden mr-3 hover:text-primary transition"
        >
          <ChevronLeft size={24} />
        </button>
        <div>
          <h1 className="text-xl font-semibold text-gray-800">
            Change Password
          </h1>
        </div>
      </div>
      {/* Error Message */}
      {error && (
        <div className="mx-4 mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle size={18} />
            <span className="text-sm">{error}</span>
          </div>
          <button
            onClick={() => setError("")}
            className="text-red-500 hover:text-red-700"
          >
            <X size={18} />
          </button>
        </div>
      )}

      {/* Password Form */}
      <div className="p-6 space-y-4">
        {/* Current Password */}
        <div>
          <label
            htmlFor="current"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Current Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type={showPassword.current ? "text" : "password"}
              id="current"
              name="current"
              value={passwords.current}
              onChange={handleInputChange}
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-primary focus:border-primary outline-none text-gray-700"
              placeholder="Enter current password"
            />
            <button
              onClick={() => togglePasswordVisibility("current")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              {showPassword.current ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div>
          <label
            htmlFor="new"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            New Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type={showPassword.new ? "text" : "password"}
              id="new"
              name="new"
              value={passwords.new}
              onChange={handleInputChange}
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-primary focus:border-primary outline-none text-gray-700"
              placeholder="Enter new password"
            />
            <button
              onClick={() => togglePasswordVisibility("new")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              {showPassword.new ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Password Requirements */}
          {passwords.new && (
            <div className="mt-3 bg-gray-50 rounded-md p-3">
              <p className="text-xs font-medium text-gray-600 mb-2">
                Password must include:
              </p>
              <ul className="space-y-1">
                {passwordRequirements.map((req, index) => {
                  const isMet = req.test(passwords.new);
                  return (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      {isMet ? (
                        <Check className="text-green-500" size={14} />
                      ) : (
                        <X className="text-gray-400" size={14} />
                      )}
                      <span
                        className={`${
                          isMet ? "text-green-700" : "text-gray-600"
                        } text-xs`}
                      >
                        {req.text}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="confirm"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Confirm New Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type={showPassword.confirm ? "text" : "password"}
              id="confirm"
              name="confirm"
              value={passwords.confirm}
              onChange={handleInputChange}
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-primary focus:border-primary outline-none text-gray-700"
              placeholder="Confirm new password"
            />
            <button
              onClick={() => togglePasswordVisibility("confirm")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              {showPassword.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Validation Texts */}
          {passwords.confirm && passwords.new !== passwords.confirm && (
            <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
              <AlertCircle size={12} /> Passwords do not match
            </p>
          )}
          {passwords.confirm && passwords.new === passwords.confirm && (
            <p className="mt-1 text-xs text-green-600 flex items-center gap-1">
              <Check size={12} /> Passwords match
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            onClick={handleSubmit}
            className="flex-1 cursor-pointer bg-primary text-white py-2 rounded-md font-medium hover:bg-pink-600 transition-all flex items-center justify-center"
          >
            {loading ? (
              <ClipLoader size={20} color="#ffff" />
            ) : (
              <div className="flex items-center justify-center gap-2">
                {" "}
                <Check size={18} /> Update Password{" "}
              </div>
            )}
          </button>
          <button
            onClick={handleReset}
            className="flex-1 cursor-pointer bg-gray-100 text-gray-700 py-2 rounded-md font-medium hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
          >
            <X size={18} />
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
