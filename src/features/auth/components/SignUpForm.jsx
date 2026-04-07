import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { Eye, EyeOff, Globe, ArrowRight } from "lucide-react";

const SignUpForm = ({ mode, formData, onSubmit, isLoading, setFormData }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center md:px-4 md:py-10">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 surface-raised rounded-3xl border-[#ddd4c8]/60 overflow-hidden">
        <div className="p-6 lg:p-10 flex flex-col justify-between">
          <button
            onClick={() => navigate("/")}
            className="text-xs text-[#6b5e54] hover:text-[#171717] font-semibold mb-6 flex items-center gap-2"
          >
            <ArrowRight size={14} className="rotate-180" />
            Back to Home
          </button>

          <div className="mb-6 text-center lg:text-left">
            <p className="text-[11px] uppercase tracking-[0.18em] text-[#8a6b47]/70 font-semibold">
              Tipu Mobiles
            </p>
            <h1 className="text-3xl lg:text-4xl font-bold text-[#171717]">
              {mode === "login" ? "Welcome back" : "Create your account"}
            </h1>
            <p className="mt-2 text-[#6b5e54] text-sm lg:text-base">
              {mode === "login"
                ? "Sign in to continue your premium shopping experience."
                : "Join us for a refined shopping experience with curated tech."}
            </p>
          </div>

          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}
          >
            {mode === "register" && (
              <div>
                <label
                  className="block text-xs font-semibold text-[#6b5e54] mb-1"
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
                  className="w-full px-4 py-2.5 rounded-xl border border-[#ddd4c8]/70 bg-white/70 focus:ring-1 focus:ring-[#8a6b47]/40 focus:outline-none text-[#171717] text-sm transition"
                />
              </div>
            )}

            <div>
              <label
                className="block text-xs font-semibold text-[#6b5e54] mb-1"
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
                className="w-full px-4 py-2.5 rounded-xl border border-[#ddd4c8]/70 bg-white/70 focus:ring-1 focus:ring-[#8a6b47]/40 focus:outline-none text-[#171717] text-sm transition"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label
                  htmlFor="password"
                  className="text-xs font-semibold text-[#6b5e54]"
                >
                  Password
                </label>
                {mode === "login" && (
                  <button
                    type="button"
                    onClick={() => navigate("/verifyAccount")}
                    className="text-xs text-[#8a6b47] hover:underline"
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
                  className="w-full px-4 py-2.5 rounded-xl border border-[#ddd4c8]/70 bg-white/70 focus:ring-1 focus:ring-[#8a6b47]/40 focus:outline-none text-[#171717] text-sm pr-10 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8a6b47] hover:text-[#171717] transition"
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#171717] text-white font-semibold rounded-xl hover:bg-black flex justify-center items-center gap-2 transition-all duration-200"
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

          <div className="mt-6">
            <p className="text-center text-xs text-[#6b5e54] mb-3">
              Or continue with
            </p>

            <button
              type="button"
              title="Sign in with Google"
              aria-label="Sign in with Google"
              className="flex items-center text-[#171717] justify-center w-full gap-3 px-4 py-2.5 rounded-xl border border-[#ddd4c8]/70 hover:bg-white transition-all bg-white/70 font-semibold text-sm"
            >
              <Globe className="text-[#8a6b47]" size={20} />
              Continue with Google
            </button>

            <p className="text-center text-xs text-[#6b5e54] mt-4">
              {mode === "login"
                ? "Don't have an account?"
                : "Already have an account?"}{" "}
              <Link to={mode === "login" ? "/register" : "/login"}>
                <span className="text-[#8a6b47] font-semibold hover:underline">
                  {mode === "login" ? "Sign up" : "Sign in"}
                </span>
              </Link>
            </p>
          </div>
        </div>

        <div className="hidden lg:flex items-center justify-center p-10 relative bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.6),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.7),transparent_45%),linear-gradient(135deg,rgba(238,231,220,0.9),rgba(246,230,240,0.7))]">
          <div className="w-full max-w-sm">
            <div className="rounded-3xl border border-white/70 bg-white/70 p-6 shadow-[0_25px_60px_rgba(23,23,23,0.1)]">
              <p className="text-xs uppercase tracking-[0.18em] text-[#8a6b47]/70 font-semibold">
                Premium Experience
              </p>
              <h2 className="text-2xl font-bold text-[#171717] mt-2">
                {mode === "login" ? "Welcome back" : "Start your journey"}
              </h2>
              <p className="text-sm text-[#6b5e54] mt-3 leading-relaxed">
                {mode === "login"
                  ? "Pick up right where you left off with your saved items and orders."
                  : "Discover a curated collection of premium tech with a refined checkout flow."}
              </p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white/70 border border-white/70 p-4 text-center">
                <p className="text-xs text-[#8a6b47]/70 uppercase tracking-wide">
                  Fast
                </p>
                <p className="text-sm font-semibold text-[#171717] mt-1">
                  Secure Checkout
                </p>
              </div>
              <div className="rounded-2xl bg-white/70 border border-white/70 p-4 text-center">
                <p className="text-xs text-[#8a6b47]/70 uppercase tracking-wide">
                  Curated
                </p>
                <p className="text-sm font-semibold text-[#171717] mt-1">
                  Premium Devices
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
