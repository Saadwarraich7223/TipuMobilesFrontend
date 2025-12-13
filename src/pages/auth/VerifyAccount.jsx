import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const VerifyAccount = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.length === 6) {
      toast.success("OTP Verified 🎉");
      // Navigate to reset password or dashboard
      navigate("/reset-password");
    } else {
      toast.error("Please enter a valid 6-digit OTP");
    }
  };

  return (
    <section className="min-h-screen  flex items-center justify-center bg-gradient-to-br from-rose-100 via-pink-100 to-indigo-100 px-4">
      <div className="flex w-full max-w-5xl shadow-lg h-[450px] rounded-xl overflow-hidden bg-white">
        {/* Left Illustration */}
        <div className="hidden lg:flex w-1/2 rounded-xl shadow-sm bg-gradient-to-tr from-[#f3e8ff] via-[#ffe4e6] to-[#dbeafe] items-center justify-center p-6">
          <div className="relative">
            <div className="w-48 h-32 bg-orange-300 rounded-2xl shadow-xl mb-4"></div>
            <div className="w-12 h-12 bg-orange-400 rounded-full mx-auto -mt-10 shadow-md"></div>
            <p className="text-base font-semibold text-gray-700 mt-2 text-center">
              Enter your OTP <br />
              We just sent it 📩
            </p>
          </div>
        </div>

        {/* Right Form */}
        <div className="w-full lg:w-1/2 p-6 lg:px-10 lg:py-6 flex flex-col justify-between">
          {/* Go Back */}
          <div className="mb-4">
            <button
              onClick={() => navigate(-1)}
              className="text-sm text-pink-500 hover:underline font-medium flex items-center gap-1"
            >
              ← Go Back
            </button>
          </div>

          {/* Branding */}
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-pink-500 via-rose-400 to-yellow-400 bg-clip-text text-transparent drop-shadow-sm tracking-wide">
              Tipu Mobiles
            </h1>
            <p className="text-gray-600 text-sm mt-1">
              Verify Your Email to Continue
            </p>
          </div>

          {/* OTP Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label htmlFor="otp" className="text-sm font-medium text-gray-700">
              Enter the 6-digit OTP sent to your email
            </label>
            <input
              type="text"
              id="otp"
              maxLength={6}
              value={otp}
              onChange={(e) => {
                const numericValue = e.target.value.replace(/\D/g, "");
                setOtp(numericValue);
              }}
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 text-lg tracking-widest text-center"
              placeholder="••••••"
            />
            <button
              type="submit"
              className="mt-2 bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-lg text-sm font-semibold transition-all"
            >
              Verify OTP
            </button>
          </form>

          {/* Resend Option */}
          <p className="text-xs text-gray-500 mt-6 text-center">
            Didn’t receive the code?{" "}
            <button
              type="button"
              onClick={() => toast.success("OTP Resent 📩")}
              className="text-pink-500 font-medium hover:underline"
            >
              Resend
            </button>
          </p>
        </div>
      </div>
    </section>
  );
};

export default VerifyAccount;
