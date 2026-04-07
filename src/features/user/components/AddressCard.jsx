import { Edit2, Trash2, CheckCircle, Home, Briefcase, MapPin } from "lucide-react";

export default function AddressCard({
  address,
  onEdit,
  onDelete,
  onSetDefault,
}) {
  const Icon =
    address.addressType === "Work"
      ? Briefcase
      : address.addressType === "Home"
      ? Home
      : Home;

  return (
    <div className="surface-raised rounded-2xl border-[#ddd4c8]/60 p-4 sm:p-6 hover:shadow-md transition-shadow relative">
      {address.isDefault && (
        <div className="absolute top-3 sm:top-4 right-3 sm:right-4 flex items-center gap-1 bg-[#f4f1e4] text-[#7b6a2f] px-2.5 py-1 rounded-full text-[10px] sm:text-xs border border-[#e7ddc0]">
          <CheckCircle className="w-3 h-3" />
          Default
        </div>
      )}

      <div className="flex items-start gap-3 mb-3 sm:mb-4">
        <div className="p-2 bg-white/70 border border-[#ddd4c8]/70 rounded-xl">
          <Icon className="w-5 h-5 text-[#8a6b47]" />
        </div>
        <div className="flex-1">
          <h3 className="mb-1 text-[#171717] text-sm sm:text-base">
            {address.fullName}
          </h3>
          <p className="text-xs sm:text-sm text-[#6b5e54]">
            {address.phone}
          </p>
          {address.email && (
            <p className="text-xs sm:text-sm text-[#6b5e54]">
              {address.email}
            </p>
          )}
        </div>
      </div>

      <div className="text-xs sm:text-sm text-[#4f4a43] mb-3 sm:mb-4 pl-11">
        <p>
          {address.addressLine1}
          {address.addressLine2 && `, ${address.addressLine2}`}
        </p>
        <p>
          {address.city}, {address.state} {address.postalCode}
        </p>
        <p>{address.country}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {!address.isDefault && (
          <button
            onClick={onSetDefault}
            className="px-3 py-1.5 text-[11px] sm:text-sm rounded-xl border border-[#ddd4c8]/70 bg-white/70 hover:bg-white transition text-[#4f4a43]"
          >
            Set as Default
          </button>
        )}
        <button
          onClick={onEdit}
          className="px-3 py-1.5 text-[11px] sm:text-sm rounded-xl border border-[#ddd4c8]/70 bg-white/70 hover:bg-white transition inline-flex items-center gap-2 text-[#4f4a43]"
        >
          <Edit2 className="w-3 h-3" />
          Edit
        </button>
        <button
          onClick={onDelete}
          className="px-3 py-1.5 text-[11px] sm:text-sm rounded-xl border border-red-200 text-red-600 hover:bg-red-50 transition inline-flex items-center gap-2"
        >
          <Trash2 className="w-3 h-3" />
          Delete
        </button>
      </div>
    </div>
  );
}
