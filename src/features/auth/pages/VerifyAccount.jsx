import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { ArrowRight, Mail, ShieldCheck } from "lucide-react";

const VerifyAccount = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.length === 6) {
      toast.success("OTP Verified!");
      navigate("/reset-password");
    } else {
      toast.error("Please enter a valid 6-digit OTP");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 surface-raised rounded-3xl border-[#ddd4c8]/60 overflow-hidden">
        <div className="hidden lg:flex items-center justify-center p-10 relative bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.6),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.7),transparent_45%),linear-gradient(135deg,rgba(238,231,220,0.9),rgba(246,230,240,0.7))]">
          <div className="w-full max-w-sm">
            <div className="rounded-3xl border border-white/70 bg-white/70 p-6 shadow-[0_25px_60px_rgba(23,23,23,0.1)]">
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#8a6b47]/70 font-semibold">
                Verify
              </p>
              <h2 className="text-2xl font-bold text-[#171717] mt-2">
                Check your inbox
              </h2>
              <p className="text-sm text-[#6b5e54] mt-3 leading-relaxed">
                We sent a one-time code to your email. Enter the 6-digit code to
                continue.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white/70 border border-white/70 p-4 text-center">
                <p className="text-xs text-[#8a6b47]/70 uppercase tracking-wide">
                  Secure
                </p>
                <p className="text-sm font-semibold text-[#171717] mt-1">
                  Account Protection
                </p>
              </div>
              <div className="rounded-2xl bg-white/70 border border-white/70 p-4 text-center">
                <p className="text-xs text-[#8a6b47]/70 uppercase tracking-wide">
                  Fast
                </p>
                <p className="text-sm font-semibold text-[#171717] mt-1">
                  Quick Verification
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 lg:p-10 flex flex-col justify-between">
          <button
            onClick={() => navigate(-1)}
            className="text-xs text-[#6b5e54] hover:text-[#171717] font-semibold mb-6 flex items-center gap-2"
          >
            <ArrowRight size={14} className="rotate-180" />
            Go Back
          </button>

          <div className="mb-6 text-center lg:text-left">
            <p className="text-[11px] uppercase tracking-[0.18em] text-[#8a6b47]/70 font-semibold">
              Tipu Mobiles
            </p>
            <h1 className="text-3xl font-bold text-[#171717]">
              Verify your email
            </h1>
            <p className="text-[#6b5e54] text-sm mt-2">
              Enter the 6-digit OTP sent to your email.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label htmlFor="otp" className="text-xs font-semibold text-[#6b5e54]">
              OTP Code
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-[#8a6b47]" size={18} />
              <input
                type="text"
                id="otp"
                maxLength={6}
                value={otp}
                onChange={(e) => {
                  const numericValue = e.target.value.replace(/\D/g, "");
                  setOtp(numericValue);
                }}
                className="w-full pl-10 pr-3 py-2.5 border border-[#ddd4c8]/70 rounded-xl bg-white/70 focus:outline-none focus:ring-1 focus:ring-[#8a6b47]/40 text-lg tracking-[0.4em] text-center"
                placeholder="••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full mt-2 bg-[#171717] hover:bg-black text-white py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck size={16} />
              Verify OTP
            </button>
          </form>

          <p className="text-xs text-[#6b5e54] mt-6 text-center">
            Didn’t receive the code?{" "}
            <button
              type="button"
              onClick={() => toast.success("OTP resent")}
              className="text-[#8a6b47] font-semibold hover:underline"
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
