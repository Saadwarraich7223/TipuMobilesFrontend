import React from "react";
import {
  FiEdit2,
  FiTrash2,
  FiCheck,
  FiHome,
  FiBriefcase,
  FiMapPin,
  FiPhone,
  FiMail,
} from "react-icons/fi";

export default function AddressCard({
  address,
  onEdit,
  onDelete,
  onSetDefault,
}) {
  const Icon =
    address.addressType === "Home"
      ? FiHome
      : address.addressType === "Work"
      ? FiBriefcase
      : FiHome;

  return (
    <div
      className={`bg-white rounded-xl border border-gray-200 shadow-sm p-5 transition-all duration-200 hover:shadow-md hover:border-gray-300 ${
        address.isDefault ? "ring-1 ring-primary/40 shadow-md" : ""
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="bg-gray-100 p-2 rounded-lg text-gray-700">
            <Icon size={18} />
          </span>
          <h3 className="text-lg font-semibold text-gray-900">
            {address.fullName}
          </h3>
        </div>

        {address.isDefault && (
          <span className="text-xs px-3 py-1 bg-primary/10 text-primary font-medium rounded-full flex items-center gap-1">
            <FiCheck size={12} /> Default
          </span>
        )}
      </div>

      {/* Body */}
      <div className="space-y-2 text-sm text-gray-700">
        <p className="flex items-center gap-2 text-gray-600">
          <FiPhone size={14} /> {address.phone}
        </p>

        {address.email && (
          <p className="flex items-center gap-2 text-gray-600">
            <FiMail size={14} /> {address.email}
          </p>
        )}

        <p className="flex items-center gap-2">
          <FiMapPin size={14} />
          <span>
            {address.addressLine1}
            {address.addressLine2 && `, ${address.addressLine2}`} <br />
            {address.city}, {address.state} {address.postalCode} <br />
            {address.country}
          </span>
        </p>
      </div>

      {/* Actions */}
      <div className="mt-5 flex flex-col gap-2">
        {/* Edit Button */}
        <button
          onClick={onEdit}
          className="flex items-center justify-center gap-2 py-2.5 rounded-md bg-primary text-white hover:bg-primary/90 transition"
        >
          <FiEdit2 size={14} /> Edit Address
        </button>

        {/* Delete Button */}
        <button
          onClick={onDelete}
          className="flex items-center justify-center gap-2 py-2.5 rounded-md bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition"
        >
          <FiTrash2 size={14} /> Delete
        </button>

        {/* Set Default Button */}
        {!address.isDefault && (
          <button
            onClick={onSetDefault}
            className="flex items-center justify-center gap-2 py-2.5 rounded-md border border-gray-200 hover:bg-gray-50 text-gray-700 transition"
          >
            <FiCheck size={14} /> Mark as Default
          </button>
        )}
      </div>
    </div>
  );
}
