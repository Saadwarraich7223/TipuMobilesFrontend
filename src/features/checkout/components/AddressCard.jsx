import { BriefcaseBusiness, Home, MapPin, Phone } from "lucide-react";

const getAddressTypeDetails = (type) => {
  switch (type) {
    case "Home":
      return {
        icon: <Home size={14} />,
        color: "bg-[#f6f1e7] text-[#8a6b47] border-[#eadfce]",
      };
    case "Work":
      return {
        icon: <BriefcaseBusiness size={14} />,
        color: "bg-[#eaf1f6] text-[#446b8a] border-[#d7e3ec]",
      };
    case "Other":
      return {
        icon: <MapPin size={14} />,
        color: "bg-white/70 text-[#4f4a43] border-[#ddd4c8]/70",
      };
    default:
      return {
        icon: <MapPin size={14} />,
        color: "bg-white/70 text-[#4f4a43] border-[#ddd4c8]/70",
      };
  }
};

const AddressCard = ({ address, selected, onSelect }) => {
  const { icon, color } = getAddressTypeDetails(address.addressType);

  return (
    <div
      onClick={onSelect}
      className={`p-4 sm:p-5 rounded-2xl cursor-pointer border transition-shadow duration-200 ${
        selected
          ? "border-[#8a6b47]/50 bg-white/80 shadow-[0_10px_24px_rgba(36,32,24,0.08)]"
          : "border-[#ddd4c8]/60 hover:shadow-md hover:bg-white/70"
      }`}
    >
      {/* Header: Name + Type Badge */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-[#171717] font-semibold text-sm sm:text-base">
          {address.fullName}
        </h3>
        <span
          className={`flex items-center gap-1 text-[10px] sm:text-xs font-medium px-2 py-1 rounded-full border ${color}`}
        >
          {icon} {address.addressType}
        </span>
      </div>

      {/* Address Section */}
      <div className="text-[#4f4a43] text-xs sm:text-sm space-y-1 mb-3">
        <p>{address.addressLine1}</p>
        {address.addressLine2 && <p>{address.addressLine2}</p>}
        <p>
          {address.city}, {address.state} - {address.postalCode}
        </p>
        <p>{address.country}</p>
      </div>

      {/* Divider */}
      <div className="border-t border-[#e6ded4] mb-2"></div>

      {/* Contact Info */}
      <div className="flex items-center text-[#6b5e54] text-xs sm:text-sm gap-2">
        <Phone className="text-[#8a6b47]/70" size={12} />
        <span>{address.phone}</span>
      </div>
    </div>
  );
};

export default AddressCard;
