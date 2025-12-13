import React from "react";
import { IoClose } from "react-icons/io5";

export default function SlideOver({ open, title, children, onClose }) {
  return (
    <>
      {/* BACKDROP */}
      <div
        className={`fixed inset-0 bg-black/30 transition-opacity duration-300 z-40 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* PANEL */}
      <div
        className={`fixed right-0 top-0 h-full w-full sm:w-[450px] bg-white z-50 shadow-xl transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-md p-2 hover:bg-gray-100"
          >
            <IoClose size={22} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto h-[calc(100%-64px)] px-5 py-4">
          {children}
        </div>
      </div>
    </>
  );
}
