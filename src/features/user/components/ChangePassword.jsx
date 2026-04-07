import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, CheckCircle, Lock } from "lucide-react";
import toast from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";

import { updatePassword } from "../../auth/store/authSlice";

export default function ChangePassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    { text: "At least 8 characters long", test: (pwd) => pwd.length >= 8 },
    {
      text: "Contains uppercase and lowercase letters",
      test: (pwd) => /[A-Z]/.test(pwd) && /[a-z]/.test(pwd),
    },
    { text: "Contains at least one number", test: (pwd) => /[0-9]/.test(pwd) },
    {
      text: "Contains at least one special character",
      test: (pwd) => /[^a-zA-Z0-9]/.test(pwd),
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!passwords.current)
      return setError("Please enter your current password");
    if (!passwords.new) return setError("Please enter a new password");

    const allRequirementsMet = passwordRequirements.every((req) =>
      req.test(passwords.new),
    );
    if (!allRequirementsMet)
      return setError("New password does not meet all requirements");

    if (passwords.new !== passwords.confirm)
      return setError("Passwords do not match");

    if (passwords.current === passwords.new)
      return setError("New password must be different from current password");

    setLoading(true);
    try {
      const res = await dispatch(
        updatePassword({
          oldPassword: passwords.current,
          newPassword: passwords.new,
        }),
      ).unwrap();

      toast.success(res.message || "Password updated successfully");
      setPasswords({ current: "", new: "", confirm: "" });
      navigate("/profile");
    } catch (err) {
      setError(err || "Failed to update password");
      toast.error(err || "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-xl sm:text-2xl md:text-3xl text-[#171717]">
        Change Password
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="surface-raised rounded-2xl border-[#ddd4c8]/60 p-4 sm:p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-white/70 border border-[#ddd4c8]/70 rounded-xl">
                <Lock className="w-6 h-6 text-[#8a6b47]" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl text-[#171717]">
                  Update Your Password
                </h2>
                <p className="text-xs sm:text-sm text-[#6b5e54]">
                  Keep your account secure with a strong password.
                </p>
              </div>
            </div>

            {error && (
              <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="current" className="text-xs sm:text-sm text-[#6b5e54]">
                  Current Password
                </label>
                <div className="relative mt-2">
                  <input
                    type={showPassword.current ? "text" : "password"}
                    id="current"
                    name="current"
                    value={passwords.current}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 border border-[#ddd4c8]/70 rounded-xl bg-white/70 focus:outline-none focus:ring-1 focus:ring-[#8a6b47]/40 pr-10 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("current")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8a6b47] hover:text-[#4f4a43]"
                  >
                    {showPassword.current ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="new" className="text-xs sm:text-sm text-[#6b5e54]">
                  New Password
                </label>
                <div className="relative mt-2">
                  <input
                    type={showPassword.new ? "text" : "password"}
                    id="new"
                    name="new"
                    value={passwords.new}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 border border-[#ddd4c8]/70 rounded-xl bg-white/70 focus:outline-none focus:ring-1 focus:ring-[#8a6b47]/40 pr-10 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("new")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8a6b47] hover:text-[#4f4a43]"
                  >
                    {showPassword.new ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="confirm" className="text-xs sm:text-sm text-[#6b5e54]">
                  Confirm New Password
                </label>
                <div className="relative mt-2">
                  <input
                    type={showPassword.confirm ? "text" : "password"}
                    id="confirm"
                    name="confirm"
                    value={passwords.confirm}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 border border-[#ddd4c8]/70 rounded-xl bg-white/70 focus:outline-none focus:ring-1 focus:ring-[#8a6b47]/40 pr-10 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("confirm")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8a6b47] hover:text-[#4f4a43]"
                  >
                    {showPassword.confirm ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex gap-4 pt-2">
                <button
                  type="button"
                  className="flex-1 md:flex-none px-4 py-2.5 rounded-xl border border-[#ddd4c8]/70 text-[#4f4a43] hover:bg-white/70 text-sm"
                  onClick={() =>
                    setPasswords({ current: "", new: "", confirm: "" })
                  }
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-[#171717] text-white hover:bg-black text-sm"
                  disabled={loading}
                >
                  {loading ? (
                    <ClipLoader size={16} color="#fff" />
                  ) : (
                    "Update Password"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="surface-raised rounded-2xl border-[#ddd4c8]/60 p-4 sm:p-6">
            <h3 className="mb-4 text-[#171717] text-base sm:text-lg">
              Password Requirements
            </h3>
            <ul className="space-y-3">
              {passwordRequirements.map((req) => {
                const isMet = req.test(passwords.new);
                return (
                  <li key={req.text} className="flex items-start gap-2 text-xs sm:text-sm">
                    <CheckCircle
                      className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                        passwords.new
                          ? isMet
                            ? "text-green-600"
                            : "text-[#8a6b47]/30"
                          : "text-[#8a6b47]/30"
                      }`}
                    />
                    <span className="text-[#6b5e54]">{req.text}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="surface-raised rounded-2xl border-[#ddd4c8]/60 p-4 sm:p-6 mt-6">
            <h3 className="mb-2 text-[#171717] text-base sm:text-lg">
              Security Tip
            </h3>
            <p className="text-xs sm:text-sm text-[#6b5e54]">
              Use a unique password that you don't use for other websites or
              apps.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
