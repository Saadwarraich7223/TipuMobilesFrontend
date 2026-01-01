import { useState } from "react";

import { useAppContext } from "../../../context/AppContext";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { Eye, EyeOff, Globe } from "lucide-react";

const SignUpForm = ({ mode, formData, onSubmit, isLoading, setFormData }) => {
  const { navigate } = useAppContext();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center   bg-gray-50 md:py-10 md:px-4">
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 bg-white rounded-3xl md:shadow-lg overflow-hidden">
        {/* Left Side - Form */}
        <div className="p-6 lg:p-12 flex flex-col justify-between">
          {/* Back Button */}
          <button
            onClick={() => navigate("/")}
            className="text-sm text-gray-500 hover:text-gray-700 font-medium mb-4 flex items-center gap-1"
          >
            ← Back to Home
          </button>

          {/* Heading */}
          <div className="mb-6 text-center lg:text-left">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Tipu Mobiles
            </h1>
            <p className="mt-2 text-gray-600 text-sm lg:text-base">
              {mode === "login"
                ? "Welcome back! Sign in to your account."
                : "Create your account — it’s quick & easy!"}
            </p>
          </div>

          {/* Form */}
          <form
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}
          >
            {/* Name */}
            {mode === "register" && (
              <div>
                <label
                  className="block text-sm text-gray-700 mb-1"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-300 focus:outline-none text-gray-900 text-sm bg-white transition"
                />
              </div>
            )}

            {/* Email */}
            <div>
              <label
                className="block text-sm text-gray-700 mb-1"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-300 focus:outline-none text-gray-900 text-sm bg-white transition"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="password" className="text-sm text-gray-700">
                  Password
                </label>
                {mode === "login" && (
                  <button
                    type="button"
                    onClick={() => navigate("/verifyAccount")}
                    className="text-xs text-green-500 hover:underline"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-300 focus:outline-none text-gray-900 text-sm pr-10 bg-white transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-primary text-white font-semibold rounded-xl shadow hover:bg-primary-dull flex justify-center items-center gap-2 transition-all duration-200"
            >
              {isLoading ? (
                <ClipLoader size={20} color="#fff" />
              ) : mode === "login" ? (
                "Sign In"
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          {/* Social Login */}
          <div className="mt-6">
            <p className="text-center text-sm text-gray-500 mb-3">
              Or continue with
            </p>

            <button
              type="button"
              title="Sign up with Google"
              aria-label="Sign up with Google"
              className="flex items-center text-primary justify-center w-full gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-xl border border-gray-300 hover:shadow-md transition-all duration-200 bg-white  font-medium text-sm sm:text-base"
            >
              <Globe className="text-blue-500" size={24} /> {/* Google icon */}
              Sign up with Google
            </button>

            <p className="text-center text-sm text-gray-500 mt-4">
              {mode === "login"
                ? "Don’t have an account?"
                : "Already have an account?"}{" "}
              <Link to={mode === "login" ? "/register" : "/login"}>
                <span className="text-green-600 font-medium hover:underline cursor-pointer">
                  {mode === "login" ? "Sign up" : "Sign in"}
                </span>
              </Link>
            </p>
          </div>
        </div>

        {/* Right Side - Illustration */}
        <div className="hidden lg:flex items-center justify-center bg-indigo-50 p-8 relative">
          <div className="w-full max-w-xs flex flex-col items-center space-y-6">
            <div className="w-56 h-36 bg-indigo-300 rounded-2xl shadow-lg transform rotate-[-6deg]"></div>
            <div className="w-56 h-36 bg-indigo-400 rounded-2xl shadow-lg transform rotate-[6deg] -translate-y-4 opacity-80"></div>
            <div className="w-16 h-16 bg-indigo-500 rounded-full shadow-md border-4 border-white z-20"></div>
            <p className="text-center text-gray-700 text-base font-medium">
              {mode === "login"
                ? "Nice to see you again! Welcome back 🌸"
                : "Hello there! Let’s get started 🚀"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
