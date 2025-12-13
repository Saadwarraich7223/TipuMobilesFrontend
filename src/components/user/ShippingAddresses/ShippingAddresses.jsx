import React, { useState, useEffect } from "react";
import { BiArrowBack } from "react-icons/bi";
import {
  FiMapPin,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiCheck,
  FiX,
  FiHome,
  FiBriefcase,
  FiPackage,
} from "react-icons/fi";
import { IoChevronBack } from "react-icons/io5";
import { useAppContext } from "../../../context/AppContext";

import toast from "react-hot-toast";
import { addressApi } from "../../../api/addressApi";
import { useAuthContext } from "../../../context/AuthContext";

export default function ShippingAddresses() {
  const { navigate } = useAppContext();
  const { user } = useAuthContext();

  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
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

  // -------------------------------
  // 🚀 1. FETCH ADDRESSES
  // -------------------------------
  const fetchAddresses = async () => {
    try {
      const res = await addressApi.getAddressesByUser({ id: user._id });
      setAddresses(res);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load addresses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  // -------------------------------
  // 🚀 Input Handler
  // -------------------------------
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // -------------------------------
  // 🚀 Add New
  // -------------------------------
  const handleAddNew = () => {
    setShowForm(true);
    setEditingId(null);
    setFormData({
      fullName: "",
      phone: "",
      email: "",
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
  };

  // -------------------------------
  // 🚀 Edit
  // -------------------------------
  const handleEdit = (address) => {
    setShowForm(true);
    setEditingId(address._id);
    setFormData(address);
  };

  // -------------------------------
  // 🚀 Delete (Backend)
  // -------------------------------
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this address?"))
      return;

    try {
      await addressApi.delete({ id });
      toast.success("Address deleted");
      fetchAddresses();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete");
    }
  };

  // -------------------------------
  // 🚀 Set Default (Backend)
  // -------------------------------
  const handleSetDefault = async (id) => {
    try {
      await addressApi.setDefault({ id });
      toast.success("Default address updated");
      fetchAddresses();
    } catch (err) {
      console.log(err);
      toast.error("Failed to set default");
    }
  };

  // -------------------------------
  // 🚀 Submit (Add + Update)
  // -------------------------------
  const handleSubmit = async () => {
    const required = [
      "fullName",
      "phone",
      "email",
      "addressLine1",
      "city",
      "state",
      "postalCode",
      "country",
    ];

    if (required.some((f) => !formData[f])) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      if (editingId) {
        await addressApi.update({ ...formData, id: editingId });
        toast.success("Address updated");
      } else {
        await addressApi.create({
          ...formData,
          userId: user._id,
        });
        toast.success("Address added");
      }

      fetchAddresses();
      setShowForm(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save address");
    }
  };

  const handleCancel = () => setShowForm(false);

  // ----------------------------------------------------------
  // UI STARTS HERE (unchanged except integrated logic)
  // ----------------------------------------------------------

  if (loading)
    return (
      <div className="text-center py-12 text-gray-500">
        Loading addresses...
      </div>
    );

  return (
    <div className="min-h-screen md:mb-0 mb-15 bg-gray-50 py-4 px-4 sm:px-6 lg:px-8">
      {!showForm && (
        <button
          onClick={() => navigate("/profile")}
          className="text-gray-700 md:hidden cursor-pointer hover:text-primary rounded-full transition"
        >
          <IoChevronBack size={24} />
        </button>
      )}

      {/* Header */}
      <div className="mb-8 flex gap-4 flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
            Shipping Addresses
          </h1>
          <p className="text-gray-500 text-sm">
            Manage your saved delivery addresses
          </p>
        </div>

        {!showForm ? (
          <button
            onClick={handleAddNew}
            className="flex md:text-base text-sm cursor-pointer items-center justify-center gap-2 bg-primary text-white font-medium px-6 py-2.5 rounded-md hover:bg-pink-600 transition-all"
          >
            <FiPlus size={18} />
            Add New Address
          </button>
        ) : (
          <button
            onClick={handleCancel}
            className="flex md:text-base text-sm cursor-pointer items-center justify-center gap-2 bg-primary text-white font-medium px-6 py-2.5 rounded-md hover:bg-pink-600 transition-all"
          >
            <BiArrowBack size={18} />
            Go Back
          </button>
        )}
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FiHome className="text-primary" />
            {editingId ? "Edit Address" : "Add New Address"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Basic Inputs */}
            {[
              ["fullName", "Full Name"],
              ["phone", "Phone Number"],
              ["email", "Email Address"],
              ["addressLine1", "Address Line 1"],
              ["addressLine2", "Address Line 2 (Optional)"],
              ["city", "City"],
              ["state", "State / Province"],
              ["postalCode", "Postal Code"],
              ["country", "Country"],
              ["landmark", "Landmark (Optional)"],
            ].map(([key, label]) => (
              <div key={key}>
                <label
                  htmlFor={key}
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {label}{" "}
                  {!label.includes("(Optional)") && (
                    <span className="text-red-500">*</span>
                  )}
                </label>

                <input
                  type="text"
                  id={key}
                  name={key}
                  value={formData[key]}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-primary focus:border-primary outline-none text-gray-700"
                  placeholder={`Enter ${label.toLowerCase()}`}
                />
              </div>
            ))}

            {/* Address Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address Type
              </label>
              <select
                name="addressType"
                value={formData.addressType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-primary focus:border-primary text-gray-700"
              >
                <option value="Home">Home</option>
                <option value="Work">Work</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Default Checkbox */}
            <div className="flex items-center gap-2 mt-3">
              <input
                type="checkbox"
                id="isDefault"
                name="isDefault"
                checked={formData.isDefault}
                onChange={handleInputChange}
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <label
                htmlFor="isDefault"
                className="text-sm font-medium text-gray-700"
              >
                Set as default address
              </label>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <button
              onClick={handleSubmit}
              className="flex-1 bg-primary text-white py-2 rounded-md font-medium hover:bg-pink-600 transition-all flex items-center justify-center gap-2"
            >
              <FiCheck size={18} />
              {editingId ? "Update Address" : "Save Address"}
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-md font-medium hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
            >
              <FiX size={18} /> Cancel
            </button>
          </div>
        </div>
      )}

      {/* Address Cards */}
      {!showForm && addresses.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {addresses.map((address) => (
            <div
              key={address._id}
              className={`bg-white border border-gray-100 rounded-xl shadow-sm p-5 transition-all hover:shadow-md ${
                address.isDefault ? "ring-1 ring-primary" : ""
              }`}
            >
              {address.isDefault && (
                <div className="inline-flex items-center gap-1 bg-pink-50 text-pink-700 px-3 py-1 rounded-full text-xs font-medium mb-3">
                  <FiCheck size={12} />
                  Default
                </div>
              )}

              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  {address.addressType === "Home" && (
                    <FiHome className="text-gray-400" />
                  )}
                  {address.addressType === "Work" && (
                    <FiBriefcase className="text-gray-400" />
                  )}
                  {address.fullName}
                </h3>

                <p className="text-sm text-gray-600">{address.phone}</p>
                <p className="text-sm text-gray-600">{address.email}</p>
                <p className="text-sm text-gray-700">{address.addressLine1}</p>
                {address.addressLine2 && (
                  <p className="text-sm text-gray-700">
                    {address.addressLine2}
                  </p>
                )}
                <p className="text-sm text-gray-700">
                  {address.city}, {address.state} {address.postalCode}
                </p>
                <p className="text-sm text-gray-700">{address.country}</p>
                {address.landmark && (
                  <p className="text-xs text-gray-500 italic">
                    Landmark: {address.landmark}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                <button
                  onClick={() => handleEdit(address)}
                  className="flex-1 bg-gray-50 text-gray-700 py-2 rounded-md text-sm font-medium hover:bg-gray-100 flex items-center justify-center gap-1"
                >
                  <FiEdit2 size={14} /> Edit
                </button>

                <button
                  onClick={() => handleDelete(address._id)}
                  className="flex-1 bg-red-50 text-red-700 py-2 rounded-md text-sm font-medium hover:bg-red-100 flex items-center justify-center gap-1"
                >
                  <FiTrash2 size={14} /> Delete
                </button>

                {!address.isDefault && (
                  <button
                    onClick={() => handleSetDefault(address._id)}
                    className="w-full bg-gray-50 text-gray-700 py-2 rounded-md text-sm font-medium hover:bg-gray-100 flex items-center justify-center gap-1"
                  >
                    <FiCheck size={14} /> Set Default
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!showForm && addresses.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-3">
            <FiPackage className="text-gray-400" size={28} />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            No Addresses Found
          </h3>
          <p className="text-gray-500 text-sm mb-4">
            Add a new shipping address to get started.
          </p>
          <button
            onClick={handleAddNew}
            className="bg-primary text-white py-2 px-6 rounded-md font-medium hover:bg-pink-600 transition-all inline-flex items-center gap-2"
          >
            <FiPlus size={18} />
            Add Address
          </button>
        </div>
      )}
    </div>
  );
}
