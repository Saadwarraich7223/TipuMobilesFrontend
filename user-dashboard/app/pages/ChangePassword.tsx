import { Lock, Eye, EyeOff, CheckCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

export default function ChangePassword() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle password change
    console.log("Password change requested");
    toast.success("Password updated successfully");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Calculate password strength for new password
    if (name === "newPassword") {
      let strength = 0;
      if (value.length >= 8) strength++;
      if (value.match(/[a-z]/) && value.match(/[A-Z]/)) strength++;
      if (value.match(/[0-9]/)) strength++;
      if (value.match(/[^a-zA-Z0-9]/)) strength++;
      setPasswordStrength(strength);
    }
  };

  const getStrengthColor = () => {
    if (passwordStrength === 0) return "bg-gray-200";
    if (passwordStrength === 1) return "bg-red-500";
    if (passwordStrength === 2) return "bg-orange-500";
    if (passwordStrength === 3) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getStrengthText = () => {
    if (passwordStrength === 0) return "";
    if (passwordStrength === 1) return "Weak";
    if (passwordStrength === 2) return "Fair";
    if (passwordStrength === 3) return "Good";
    return "Strong";
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl md:text-3xl">Change Password</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Password Change Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Lock className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl">Update Your Password</h2>
                <p className="text-sm text-gray-600">
                  Keep your account secure with a strong password
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Current Password */}
              <div>
                <Label htmlFor="currentPassword">Current Password</Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    name="currentPassword"
                    type={showCurrentPassword ? "text" : "password"}
                    value={formData.currentPassword}
                    onChange={handleChange}
                    required
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showCurrentPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <Label htmlFor="newPassword">New Password</Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    value={formData.newPassword}
                    onChange={handleChange}
                    required
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showNewPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {formData.newPassword && (
                  <div className="mt-2">
                    <div className="flex gap-1 mb-1">
                      {[1, 2, 3, 4].map((level) => (
                        <div
                          key={level}
                          className={`h-1 flex-1 rounded-full ${
                            level <= passwordStrength
                              ? getStrengthColor()
                              : "bg-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-gray-600">
                      Password strength: {getStrengthText()}
                    </p>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {formData.confirmPassword &&
                  formData.newPassword !== formData.confirmPassword && (
                    <p className="text-xs text-red-600 mt-1">
                      Passwords do not match
                    </p>
                  )}
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 md:flex-none"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 md:flex-none bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={
                    !formData.currentPassword ||
                    !formData.newPassword ||
                    formData.newPassword !== formData.confirmPassword
                  }
                >
                  Update Password
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Password Requirements */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="mb-4">Password Requirements</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle
                  className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                    formData.newPassword.length >= 8
                      ? "text-green-600"
                      : "text-gray-400"
                  }`}
                />
                <span>At least 8 characters long</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle
                  className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                    formData.newPassword.match(/[a-z]/) &&
                    formData.newPassword.match(/[A-Z]/)
                      ? "text-green-600"
                      : "text-gray-400"
                  }`}
                />
                <span>Contains uppercase and lowercase letters</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle
                  className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                    formData.newPassword.match(/[0-9]/)
                      ? "text-green-600"
                      : "text-gray-400"
                  }`}
                />
                <span>Contains at least one number</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle
                  className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                    formData.newPassword.match(/[^a-zA-Z0-9]/)
                      ? "text-green-600"
                      : "text-gray-400"
                  }`}
                />
                <span>Contains at least one special character</span>
              </li>
            </ul>
          </div>

          <div className="bg-blue-50 rounded-xl p-6 mt-6">
            <h3 className="mb-2">Security Tip</h3>
            <p className="text-sm text-gray-700">
              Use a unique password that you don't use for other websites or
              apps. Consider using a password manager to keep track of your
              passwords.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}