import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useSelector } from "react-redux";

import { addressApi } from "../../user/api/addressApi";

const AddAddressModal = ({ onClose, onAddressAdded }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "Pakistan",
    landmark: "",
    isDefault: false,
    addressType: "Home",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!user?._id) {
      toast.error("Please log in to save an address.");
      setLoading(false);
      return;
    }
    try {
      const data = await addressApi.create({ ...form, userId: user?._id });
      toast.success("Address added successfully!");
      // Notify parent (PreviewCheckout) to refresh addresses
      onAddressAdded(data?.address?._id || data?._id || null);
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add address");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="surface-raised rounded-3xl border-[#ddd4c8]/60 p-5 sm:p-6 w-full max-w-md relative max-h-[85vh] overflow-hidden"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#8a6b47] hover:text-[#4f4a43]"
        >
          <X size={18} />
        </button>
        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-[#171717]">
          Add New Address
        </h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-2 overflow-y-auto pr-1 max-h-[70vh]"
        >
          <input
            type="text"
            name="fullName"
            placeholder="Name"
            value={form.fullName}
            onChange={handleChange}
            className="border border-[#ddd4c8]/70 bg-white/70 p-2 w-full rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#8a6b47]/40"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="border border-[#ddd4c8]/70 bg-white/70 p-2 w-full rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#8a6b47]/40"
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            className="border border-[#ddd4c8]/70 bg-white/70 p-2 w-full rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#8a6b47]/40"
            required
          />
          <input
            type="text"
            name="addressLine1"
            placeholder="Address Line 1"
            value={form.addressLine1}
            onChange={handleChange}
            className="border border-[#ddd4c8]/70 bg-white/70 p-2 w-full rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#8a6b47]/40"
            required
          />
          <input
            type="text"
            name="addressLine2"
            placeholder="Address Line 2"
            value={form.addressLine2}
            onChange={handleChange}
            className="border border-[#ddd4c8]/70 bg-white/70 p-2 w-full rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#8a6b47]/40"
          />
          <input
            type="text"
            name="landmark"
            placeholder="Landmark (Optional)"
            value={form.landmark}
            onChange={handleChange}
            className="border border-[#ddd4c8]/70 bg-white/70 p-2 w-full rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#8a6b47]/40"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            className="border border-[#ddd4c8]/70 bg-white/70 p-2 w-full rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#8a6b47]/40"
            required
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={form.state}
            onChange={handleChange}
            className="border border-[#ddd4c8]/70 bg-white/70 p-2 w-full rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#8a6b47]/40"
            required
          />
          <input
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            value={form.postalCode}
            onChange={handleChange}
            className="border border-[#ddd4c8]/70 bg-white/70 p-2 w-full rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#8a6b47]/40"
            required
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={form.country}
            onChange={handleChange}
            className="border border-[#ddd4c8]/70 bg-white/70 p-2 w-full rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#8a6b47]/40"
            required
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <select
              name="addressType"
              value={form.addressType}
              onChange={handleChange}
              className="border border-[#ddd4c8]/70 bg-white/70 p-2 w-full rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#8a6b47]/40"
            >
              <option value="Home">Home</option>
              <option value="Work">Work</option>
            </select>
            <label className="flex items-center gap-2 text-sm text-[#6b5e54]">
              <input
                type="checkbox"
                name="isDefault"
                checked={form.isDefault}
                onChange={handleChange}
                className="h-4 w-4"
              />
              Set as default
            </label>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-[#171717] text-white py-2.5 px-4 rounded-xl w-full mt-2 hover:bg-black text-sm"
          >
            {loading ? "Adding..." : "Add Address"}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AddAddressModal;
