import { MapPin, Plus } from "lucide-react";

export default function AddressEmptyState({ onAddNew }) {
  return (
    <div className="flex flex-col items-center text-center py-10 sm:py-16 surface-raised rounded-3xl border-[#ddd4c8]/60">
      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-white/70 border border-[#ddd4c8]/70 flex items-center justify-center mb-4 sm:mb-5">
        <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-[#8a6b47]" />
      </div>

      <h2 className="text-lg sm:text-xl mb-2 text-[#171717]">
        No Addresses Saved
      </h2>

      <p className="text-sm sm:text-base text-[#6b5e54] max-w-xs mb-4 sm:mb-6">
        Add a shipping address to make checkout faster.
      </p>

      <button
        onClick={onAddNew}
        className="flex items-center gap-2 bg-[#171717] text-white px-4 sm:px-5 py-2.5 rounded-xl hover:bg-black transition text-sm"
      >
        <Plus size={16} /> Add New Address
      </button>
    </div>
  );
}
