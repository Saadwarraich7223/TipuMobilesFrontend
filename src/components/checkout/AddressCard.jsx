import React from "react";
import { FaHome, FaBuilding, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

// Map address type to icon and color
const getAddressTypeDetails = (type) => {
  switch (type) {
    case "Home":
      return { icon: <FaHome />, color: "bg-green-100 text-green-700" };
    case "Work":
      return { icon: <FaBuilding />, color: "bg-blue-100 text-blue-700" };
    case "Other":
      return { icon: <FaMapMarkerAlt />, color: "bg-gray-100 text-gray-700" };
    default:
      return { icon: <FaMapMarkerAlt />, color: "bg-gray-100 text-gray-700" };
  }
};

const AddressCard = ({ address, selected, onSelect }) => {
  const { icon, color } = getAddressTypeDetails(address.addressType);

  return (
    <div
      onClick={onSelect}
      className={`p-5 rounded-xl cursor-pointer border transition-shadow duration-200
        ${
          selected
            ? "border-indigo-500 bg-indigo-50 shadow-lg"
            : "border-gray-200 hover:shadow-md hover:bg-gray-50"
        }`}
    >
      {/* Header: Name + Type Badge */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-gray-900 font-semibold text-lg">
          {address.fullName}
        </h3>
        <span
          className={`flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full ${color}`}
        >
          {icon} {address.addressType}
        </span>
      </div>

      {/* Address Section */}
      <div className="text-gray-700 text-sm space-y-1 mb-3">
        <p>{address.addressLine1}</p>
        {address.addressLine2 && <p>{address.addressLine2}</p>}
        <p>
          {address.city}, {address.state} - {address.postalCode}
        </p>
        <p>{address.country}</p>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 mb-2"></div>

      {/* Contact Info */}
      <div className="flex items-center text-gray-600 text-sm gap-2">
        <FaPhoneAlt className="text-gray-400" />
        <span>{address.phone}</span>
      </div>
    </div>
  );
};

export default AddressCard;
