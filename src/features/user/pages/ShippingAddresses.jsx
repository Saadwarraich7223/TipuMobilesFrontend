import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";

import AddressForm from "../components/AddressForm";
import AddressCard from "../components/AddressCard";
import AddressEmptyState from "../components/AddressEmptyState";
import initialForm from "../components/initialForm";
import { addressApi } from "../api/addressApi";
import SlideOver from "../components/SlideOver";
import AddressSkeleton from "../../../components/layout/ShimmerSkeletons/AddressSkeleton";

export default function ShippingAddresses() {
  const { user } = useSelector((state) => state.auth);

  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(initialForm);

  const fetchAddresses = async () => {
    try {
      if (!user?._id) return;
      setLoading(true);
      const res = await addressApi.getAddressesByUser({ id: user._id });
      setAddresses(res);
    } catch (err) {
      console.error("Error fetching addresses", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, [user?._id]);

  const handleAddNew = () => {
    setFormData(initialForm);
    setEditingId(null);
    setShowForm(true);
  };

  const handleEdit = (address) => {
    const cleaned = {
      fullName: address.fullName || "",
      phone: address.phone || "",
      email: address.email || "",
      addressLine1: address.addressLine1 || "",
      addressLine2: address.addressLine2 || "",
      city: address.city || "",
      state: address.state || "",
      postalCode: address.postalCode || "",
      country: address.country || "Pakistan",
      landmark: address.landmark || "",
      isDefault: address.isDefault || false,
      addressType: address.addressType || "Home",
    };

    setFormData(cleaned);
    setEditingId(address._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this address?")) return;
    try {
      await addressApi.delete(id);
      setAddresses((prev) => prev.filter((addr) => addr._id !== id));
      toast.success("Address deleted");
    } catch {
      toast.error("Failed to delete address");
    }
  };

  const handleSetDefault = async (id) => {
    try {
      await addressApi.setDefault(id);
      toast.success("Default updated");
      fetchAddresses();
    } catch {
      toast.error("Failed");
    }
  };

  const handleSubmit = async () => {
    try {
      if (editingId) {
        await addressApi.update({ data: formData, id: editingId });
        toast.success("Address updated");
      } else {
        await addressApi.create({ ...formData, userId: user._id });
        toast.success("Address added");
      }

      fetchAddresses();
      setShowForm(false);
    } catch {
      toast.error("Failed to save");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl md:text-3xl text-[#171717]">
          Shipping Addresses
        </h1>
        <button
          onClick={handleAddNew}
          className="inline-flex items-center gap-2 bg-[#171717] text-white px-3 sm:px-4 py-2 rounded-xl hover:bg-black transition text-sm"
        >
          <Plus size={16} /> Add New Address
        </button>
      </div>

      <SlideOver
        open={showForm}
        title={editingId ? "Edit Address" : "Add New Address"}
        onClose={() => setShowForm(false)}
      >
        <AddressForm
          formData={formData}
          setFormData={setFormData}
          editingId={editingId}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
        />
      </SlideOver>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <AddressSkeleton />
          <AddressSkeleton />
        </div>
      ) : addresses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {addresses.map((addr) => (
            <AddressCard
              key={addr._id}
              address={addr}
              onEdit={() => handleEdit(addr)}
              onDelete={() => handleDelete(addr._id)}
              onSetDefault={() => handleSetDefault(addr._id)}
            />
          ))}
        </div>
      ) : (
        <AddressEmptyState onAddNew={handleAddNew} />
      )}
    </div>
  );
}
