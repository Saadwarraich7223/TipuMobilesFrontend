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

  // Validation
  const validate = () => {
    for (let field of inputFields) {
      if (!field.label.includes("(Optional)") && !formData[field.key]?.trim()) {
        toast.error(`${field.label} is required`);
        return false;
      }
    }

    // Email validation
    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      toast.error("Invalid email address");
      return false;
    }

    // Phone validation (digits only, 7-15)
    if (formData.phone && !/^\d{7,15}$/.test(formData.phone)) {
      toast.error("Invalid phone number");
      return false;
    }

    // Postal code validation (allow numbers/letters)
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
      await onSubmit(); // call parent submit function
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-2">
      <h2 className="text-lg font-semibold flex items-center gap-2 mb-6 text-gray-800">
        <Home className="text-primary" />
        {editingId ? "Edit Address" : "Add New Address"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {inputFields.map(({ key, label, type = "text" }) => (
          <div key={key} className="relative">
            <label
              className={`absolute left-3 top-3.5 text-gray-500 text-sm transition-all duration-200 pointer-events-none ${
                formData[key]
                  ? "top-10 bg-white  text-xs text-primary  px-1"
                  : ""
              }`}
            >
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
              className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition"
            />
          </div>
        ))}

        {/* Address Type */}
        <div className="relative">
          <label className=" left-3 top-3.5 text-gray-500 text-sm transition-all duration-200 pointer-events-none">
            Address Type
          </label>
          <select
            name="addressType"
            value={formData.addressType}
            onChange={handleChange}
            className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition"
          >
            <option value="Home">Home</option>
            <option value="Work">Work</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Default */}
        <label className="flex items-center gap-2 mt-2 md:mt-6 col-span-1 md:col-span-2">
          <input
            type="checkbox"
            name="isDefault"
            checked={formData.isDefault}
            onChange={handleChange}
            className="h-4 w-4 text-primary border-gray-300 rounded"
          />
          Set as default
        </label>
      </div>

      {/* Buttons */}
      <div className="flex flex-col md:flex-row gap-3 mt-6">
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="flex-1 bg-primary text-white py-3 rounded-md flex items-center justify-center gap-2 hover:bg-primary/90 transition disabled:opacity-60"
        >
          <Check /> {editingId ? "Update Address" : "Save Address"}
        </button>

        <button
          onClick={onCancel}
          disabled={submitting}
          className="flex-1 bg-gray-100 flex items-center justify-center gap-2 py-3 rounded-md hover:bg-gray-200 transition disabled:opacity-60"
        >
          <X /> Cancel
        </button>
      </div>
    </div>
  );
}
