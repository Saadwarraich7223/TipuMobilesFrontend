import { X } from "lucide-react";

export default function SlideOver({ open, title, children, onClose }) {
  return (
    <>
      <div
        className={`fixed inset-0 bg-black/35 transition-opacity duration-300 z-40 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed right-0 top-0 h-full w-full sm:w-[460px] bg-white/90 backdrop-blur-xl z-50 shadow-[0_30px_80px_rgba(23,23,23,0.18)] border-l border-[#ddd4c8]/60 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#e6ded4]">
          <div>
            <h2 className="text-lg font-semibold text-[#171717]">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full border border-[#ddd4c8]/70 bg-white/70 hover:bg-white transition flex items-center justify-center"
          >
            <X size={18} />
          </button>
        </div>

        <div className="overflow-y-auto h-[calc(100%-72px)] px-5 py-4">
          {children}
        </div>
      </div>
    </>
  );
}
