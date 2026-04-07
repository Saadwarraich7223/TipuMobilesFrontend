import { useState } from "react";

import { Check, Home, X } from "lucide-react";
import inputFields from "./inputs";
import toast from "react-hot-toast";

export default function AddressForm({
  formData,
  setFormData,
  editingId,
  onCancel,
  onSubmit,
}) {
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((p) => ({
      ...p,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    for (let field of inputFields) {
      if (!field.label.includes("(Optional)") && !formData[field.key]?.trim()) {
        toast.error(`${field.label} is required`);
        return false;
      }
    }

    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      toast.error("Invalid email address");
      return false;
    }

    if (formData.phone && !/^\d{7,15}$/.test(formData.phone)) {
      toast.error("Invalid phone number");
      return false;
    }

    if (formData.postalCode && !/^[A-Za-z0-9- ]+$/.test(formData.postalCode)) {
      toast.error("Invalid postal code");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      setSubmitting(true);
      await onSubmit();
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="surface-raised rounded-2xl border-[#ddd4c8]/60 p-4 sm:p-6">
      <h2 className="text-base sm:text-lg flex items-center gap-2 mb-4 sm:mb-6">
        <Home className="text-[#8a6b47]" />
        {editingId ? "Edit Address" : "Add New Address"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        {inputFields.map(({ key, label, type = "text" }) => (
          <div key={key} className="space-y-1">
            <label className="text-xs sm:text-sm text-[#6b5e54]">
              {label}{" "}
              {!label.includes("(Optional)") && (
                <span className="text-red-500">*</span>
              )}
            </label>
            <input
              type={type}
              name={key}
              value={formData[key]}
              onChange={handleChange}
              className="w-full px-3 py-2.5 border border-[#ddd4c8]/70 rounded-xl bg-white/70 focus:outline-none focus:ring-1 focus:ring-[#8a6b47]/40 text-sm"
            />
          </div>
        ))}

        <div className="space-y-1">
          <label className="text-xs sm:text-sm text-[#6b5e54]">
            Address Type
          </label>
          <select
            name="addressType"
            value={formData.addressType}
            onChange={handleChange}
            className="w-full px-3 py-2.5 border border-[#ddd4c8]/70 rounded-xl bg-white/70 focus:outline-none focus:ring-1 focus:ring-[#8a6b47]/40 text-sm"
          >
            <option value="Home">Home</option>
            <option value="Work">Work</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <label className="flex items-center gap-2 mt-2 md:mt-6 col-span-1 md:col-span-2 text-xs sm:text-sm text-[#6b5e54]">
          <input
            type="checkbox"
            name="isDefault"
            checked={formData.isDefault}
            onChange={handleChange}
            className="h-4 w-4 text-[#8a6b47] border-[#ddd4c8]/70 rounded"
          />
          Set as default
        </label>
      </div>

      <div className="flex flex-col md:flex-row gap-3 mt-4 sm:mt-6">
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="flex-1 bg-[#171717] text-white py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-black transition disabled:opacity-60 text-sm"
        >
          <Check size={16} /> {editingId ? "Update Address" : "Save Address"}
        </button>

        <button
          onClick={onCancel}
          disabled={submitting}
          className="flex-1 bg-white/70 text-[#4f4a43] border border-[#ddd4c8]/70 flex items-center justify-center gap-2 py-2.5 rounded-xl hover:bg-white transition disabled:opacity-60 text-sm"
        >
          <X size={16} /> Cancel
        </button>
      </div>
    </div>
  );
}
