import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import AddressForm from "../../components/user/ShippingAddresses/AddressForm";
import AddressCard from "../../components/user/ShippingAddresses/AddressCard";
import AddressEmptyState from "../../components/user/ShippingAddresses/AddressEmptyState";
import initialForm from "../../components/user/ShippingAddresses/initialForm";
import { addressApi } from "../../api/addressApi";
import { useAppContext } from "../../context/AppContext";
import { useAuthContext } from "../../context/AuthContext";
import SlideOver from "../../components/user/ShippingAddresses/SlideOver";
import AddressSkeleton from "../../components/layout/ShimmerSkeltons/AddressSkeleton";
import { ChevronLeft, Plus } from "lucide-react";

export default function ShippingAddresses() {
  const { navigate } = useAppContext();
  const { user } = useAuthContext();

  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(initialForm);

  // Fetch Addresses
  const fetchAddresses = async () => {
    try {
      const res = await addressApi.getAddressesByUser({ id: user._id });
      setAddresses(res);
    } catch (err) {
      console.log("Error fetching addresses", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  // Handlers
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

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        <AddressSkeleton />
        <AddressSkeleton />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6  px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        {!showForm && (
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => navigate("/profile")}
              className="md:hidden p-2 rounded hover:bg-gray-100"
            >
              <ChevronLeft size={24} className="text-gray-700" />
            </button>

            <h1 className="flex-1 text-center text-xl md:text-2xl font-semibold text-gray-800">
              Shipping Addresses
            </h1>

            <button
              onClick={handleAddNew}
              className="hidden md:flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-md hover:bg-pink-600"
            >
              <Plus /> Add New
            </button>
          </div>
        )}

        {/* Add New Button (Mobile) */}
        {!showForm && (
          <button
            onClick={handleAddNew}
            className="md:hidden w-full flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-md mb-6 hover:bg-pink-600"
          >
            <Plus /> Add New Address
          </button>
        )}

        {/* Address Form */}
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

        {/* Address List or Empty State */}
        {!showForm && (
          <>
            {addresses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {addresses.map((addr) => (
                  <div key={addr._id} className="h-full">
                    <AddressCard
                      address={addr}
                      onEdit={() => handleEdit(addr)}
                      onDelete={() => handleDelete(addr._id)}
                      onSetDefault={() => handleSetDefault(addr._id)}
                      className="h-full"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-10">
                <AddressEmptyState onAddNew={handleAddNew} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
