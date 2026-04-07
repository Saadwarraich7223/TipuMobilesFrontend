import { useState } from "react";
import AddAddressModal from "./AddAddressModal";

const AddressList = ({
  addresses,
  selectedAddress,
  setSelectedAddress,
  setAddresses,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="bg-white rounded-lg shadow p-5">
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-semibold">Delivery Address</h2>
          <button onClick={() => setOpen(true)} className="text-blue-600">
            + Add Address
          </button>
        </div>

        <div className="space-y-3">
          {addresses.map((addr) => (
            <label key={addr._id} className="block border p-3 rounded">
              <input
                type="radio"
                checked={selectedAddress === addr._id}
                onChange={() => setSelectedAddress(addr._id)}
                className="mr-2"
              />
              {addr.fullName}, {addr.city}, {addr.state}
            </label>
          ))}
        </div>
      </div>

      <AddAddressModal
        isOpen={open}
        onClose={() => setOpen(false)}
        setAddresses={setAddresses}
        setSelectedAddress={setSelectedAddress}
      />
    </>
  );
};

export default AddressList;
