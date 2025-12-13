import React from "react";
import { FiPlus, FiMapPin } from "react-icons/fi";

export default function AddressEmptyState({ onAddNew }) {
  return (
    <div className="flex flex-col items-center text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-200">
      {/* Icon instead of Illustration */}
      <FiMapPin className="w-20 h-20 mb-6 text-gray-400 opacity-90" />

      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        No Addresses Added
      </h2>

      <p className="text-gray-600 max-w-xs mb-6">
        Add your shipping address to quickly checkout and receive your orders.
      </p>

      <button
        onClick={onAddNew}
        className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-md hover:bg-primary/90 transition"
      >
        <FiPlus size={16} /> Add New Address
      </button>
    </div>
  );
}
