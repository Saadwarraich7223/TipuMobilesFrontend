import { useState } from "react";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";

const ChangePassword = () => {
  const { navigate } = useAppContext();
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (form.newPassword.length < 6 && form.confirmPassword.length < 6) {
      toast.error("Password must be atleat 6 digits");
      return;
    }

    // Submit the new password (e.g., via API)
    toast.success("Password changed successfully");
    navigate("/login");
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 px-4">
      <div className="bg-white rounded-3xl shadow-xl min-h-[450px] grid grid-cols-1 lg:grid-cols-2 w-full max-w-4xl overflow-hidden">
        {/* Illustration Panel */}
        <div className="hidden lg:flex items-center rounded-3xl shadow-sm  justify-center bg-gradient-to-tr from-[#f3e8ff] via-[#ffe4e6] to-[#dbeafe] relative">
          <div className="scale-90 text-center">
            <div className="w-48 h-32 bg-indigo-300 rounded-2xl shadow-xl mb-4"></div>
            <div className="w-12 h-12 bg-indigo-400 rounded-full mx-auto -mt-10 shadow-md"></div>
            <p className="text-base font-semibold text-gray-700 mt-2">
              Keeping your account secure 🔐
            </p>
          </div>
        </div>

        {/* Form Panel */}
        <div className="p-6 lg:px-10 lg:py-8 flex flex-col justify-center w-full">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-extrabold text-pink-500">
              Tipu Mobiles
            </h1>
            <p className="text-gray-600 text-sm">Change your password below</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* New Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                type="text"
                name="newPassword"
                required
                value={form.newPassword}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <input
                type="text"
                name="confirmPassword"
                required
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-pink-500 mt-4 text-white py-2 rounded-lg hover:bg-pink-600 transition duration-300 font-semibold"
            >
              Change Password
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ChangePassword;
