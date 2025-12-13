import { useState } from "react";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineArrowRight,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaFacebookF } from "react-icons/fa";
import { useAppContext } from "../../../context/AppContext";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const SignUpForm = ({ mode, formData, onSubmit, isLoading, setFormData }) => {
  const { navigate } = useAppContext();

  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className=" bg-gradient-to-br mb-20 h-full min-h-screen   ">
      <div className=" w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 bg-white/30 backdrop-blur-2xl md:shadow-2xl rounded-3xl overflow-hidden md:border border-white/20 transition-all duration-500">
        {/* Left Side - Form */}
        <div className="p-6 lg:px-10 lg:py-6 flex flex-col justify-between gap-2">
          <div>
            <div className="mb-4">
              <button
                onClick={() => navigate("/")}
                className="text-sm text-primary cursor-pointer hover:underline font-medium flex items-center gap-1"
              >
                ← Back to Home
              </button>
            </div>

            <div className="mb-6 text-center">
              <h1 className="text-4xl font-extrabold bg-gradient-to-r from-pink-500 via-rose-400 to-yellow-400 bg-clip-text text-transparent drop-shadow-sm tracking-wide">
                Tipu Mobiles
              </h1>
              <p className="mt-2 text-gray-700 text-base font-medium">
                {mode === "login"
                  ? "Welcome back 👋 Let’s get you signed in"
                  : "Join us today — it’s quick & easy 🎉"}
              </p>
            </div>

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
                    htmlFor="name"
                    className="text-sm text-gray-700 block mb-1"
                  >
                    Name
                  </label>
                  <input
                    name="name"
                    type="name"
                    id="name"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                    }}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/30 focus:outline-none bg-white text-sm "
                    placeholder="Your Name"
                  />
                </div>
              )}
              {/* Email */}

              <div>
                <label
                  htmlFor="email"
                  className="text-sm text-gray-700 block mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                  }}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/30 focus:outline-none bg-white text-sm "
                  placeholder="you@example.com"
                />
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor="password" className="text-sm text-gray-700">
                    Password
                  </label>
                  <button
                    className="text-xs text-pink-400 hover:underline"
                    onClick={() => {
                      navigate("/verifyAccount");
                    }}
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={(e) => {
                      setFormData({ ...formData, password: e.target.value });
                    }}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/30 focus:outline-none bg-white text-sm pr-10 "
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible size={18} />
                    ) : (
                      <AiOutlineEye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full cursor-pointer py-2.5 bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white font-medium rounded-full shadow-md hover:shadow-lg hover:brightness-105 transition-all duration-200 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <ClipLoader size={20} color="#ffffff" />
                ) : mode === "login" ? (
                  "Sign In"
                ) : (
                  "Sign Up"
                )}
              </button>
            </form>
          </div>

          {/* Social Logins */}
          <div className="">
            <p className="text-center text-sm text-gray-500 mb-3">
              or continue with
            </p>
            <div className="flex justify-center gap-4">
              <button className="w-10 h-10 rounded-full border border-gray-200 bg-white shadow hover:shadow-md flex items-center justify-center transition hover:scale-105">
                <FcGoogle size={18} />
              </button>
              <button className="w-10 h-10 rounded-full border border-gray-200 bg-white shadow hover:shadow-md flex items-center justify-center transition hover:scale-105">
                <FaGithub size={18} className="text-gray-700" />
              </button>
              <button className="w-10 h-10 rounded-full border border-gray-200 bg-white shadow hover:shadow-md flex items-center justify-center transition hover:scale-105">
                <FaFacebookF size={18} className="text-blue-600" />
              </button>
            </div>

            <p className="text-center text-sm text-gray-500 mt-4">
              Don’t have an account?{" "}
              <Link to={mode === "login" ? "/register" : "/login"}>
                <button className="text-pink-500 cursor-pointer hover:underline font-medium">
                  {mode === "login" ? "Sign up" : "Sign in"}
                </button>
              </Link>
            </p>
          </div>
        </div>

        {/* Right Side - Illustration */}
        <div className="hidden lg:flex items-center justify-center relative overflow-hidden bg-gradient-to-tr from-[#f3e8ff] via-[#ffe4e6] to-[#dbeafe] p-8 rounded-3xl shadow-2xl">
          {/* Decorative Floating Circles */}
          <div className="absolute top-10 left-10 w-24 h-24 bg-pink-300 opacity-90 rounded-full blur-1xl animate-pulse" />

          {/* Central Content */}
          <div className="relative z-10 flex flex-col items-center space-y-4">
            {/* Card Stack */}
            <div className="w-56 h-36 bg-orange-300 rounded-2xl shadow-xl transform rotate-[-6deg] -translate-y-3"></div>
            <div className="w-56 h-36 bg-pink-300 rounded-2xl shadow-xl absolute top-0 left-0 transform rotate-[6deg] translate-x-4 translate-y-2 opacity-80"></div>

            {/* Avatar */}
            <div className="w-16 h-16 bg-orange-400 rounded-full shadow-md border-4 border-white z-20"></div>

            {/* Text */}
            <p className="text-base font-semibold text-gray-700 mt-2 text-center">
              {mode === "login" ? (
                <>
                  Nice to see you again! <br />
                  Welcome back 🌸
                </>
              ) : (
                <>
                  Hello there! <br />
                  Let’s get onChangeyou started 🚀
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
