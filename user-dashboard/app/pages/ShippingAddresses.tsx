import { MapPin, Plus, Edit, Trash2, CheckCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

interface Address {
  id: number;
  name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

export default function ShippingAddresses() {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 1,
      name: "Sarah Anderson",
      phone: "+1 (555) 123-4567",
      street: "123 Main Street, Apt 4B",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      isDefault: true,
    },
    {
      id: 2,
      name: "Sarah Anderson",
      phone: "+1 (555) 987-6543",
      street: "456 Oak Avenue",
      city: "Brooklyn",
      state: "NY",
      zipCode: "11201",
      isDefault: false,
    },
    {
      id: 3,
      name: "Office - Sarah Anderson",
      phone: "+1 (555) 456-7890",
      street: "789 Business Plaza, Suite 200",
      city: "Manhattan",
      state: "NY",
      zipCode: "10022",
      isDefault: false,
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  const deleteAddress = (id: number) => {
    setAddresses(addresses.filter((addr) => addr.id !== id));
    toast.success("Address deleted successfully");
  };

  const setDefaultAddress = (id: number) => {
    setAddresses(
      addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
    toast.success("Default address updated");
  };

  const openEditDialog = (address: Address) => {
    setEditingAddress(address);
    setIsDialogOpen(true);
  };

  const openNewDialog = () => {
    setEditingAddress(null);
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission
    toast.success(
      editingAddress ? "Address updated successfully" : "Address added successfully"
    );
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl">Shipping Addresses</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={openNewDialog}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Address
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingAddress ? "Edit Address" : "Add New Address"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  defaultValue={editingAddress?.name}
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  defaultValue={editingAddress?.phone}
                  placeholder="+1 (555) 123-4567"
                  required
                />
              </div>
              <div>
                <Label htmlFor="street">Street Address</Label>
                <Input
                  id="street"
                  defaultValue={editingAddress?.street}
                  placeholder="123 Main St, Apt 4B"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    defaultValue={editingAddress?.city}
                    placeholder="New York"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    defaultValue={editingAddress?.state}
                    placeholder="NY"
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="zipCode">ZIP Code</Label>
                <Input
                  id="zipCode"
                  defaultValue={editingAddress?.zipCode}
                  placeholder="10001"
                  required
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {editingAddress ? "Update" : "Add"} Address
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((address) => (
          <div
            key={address.id}
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow relative"
          >
            {address.isDefault && (
              <div className="absolute top-4 right-4 flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                <CheckCircle className="w-3 h-3" />
                Default
              </div>
            )}
            <div className="flex items-start gap-3 mb-4">
              <div className="p-2 bg-blue-50 rounded-lg">
                <MapPin className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="mb-1">{address.name}</h3>
                <p className="text-sm text-gray-600">{address.phone}</p>
              </div>
            </div>
            <div className="text-sm text-gray-700 mb-4 pl-11">
              <p>{address.street}</p>
              <p>
                {address.city}, {address.state} {address.zipCode}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {!address.isDefault && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDefaultAddress(address.id)}
                >
                  Set as Default
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => openEditDialog(address)}
              >
                <Edit className="w-3 h-3 mr-1" />
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => deleteAddress(address.id)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="w-3 h-3 mr-1" />
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      {addresses.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl mb-2">No Addresses Saved</h3>
          <p className="text-gray-600 mb-6">
            Add a shipping address to make checkout faster
          </p>
        </div>
      )}
    </div>
  );
}