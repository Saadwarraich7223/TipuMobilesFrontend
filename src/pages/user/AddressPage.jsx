import React, { useState } from "react";

const AddressPage = () => {
  const [address, setAddress] = useState({
    fullName: "",
    street: "",
    city: "",
    province: "",
    postalCode: "",
    country: "Pakistan",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Address saved successfully!");
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary mb-2">Manage Address</h1>
        <p className="text-gray-600">
          Manage your saved addresses for faster and smoother checkouts
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["fullName", "street", "city", "province", "postalCode"].map(
            (field) => (
              <div key={field}>
                <label className="block mb-1 text-sm font-medium text-gray-600 capitalize">
                  {field === "postalCode" ? "Postal Code" : field}
                </label>
                <input
                  type={field === "postalCode" ? "number" : "text"}
                  name={field}
                  value={address[field]}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary/30"
                />
              </div>
            )
          )}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">
              Country
            </label>
            <input
              type="text"
              name="country"
              value={address.country}
              disabled
              className="w-full px-4 py-2 bg-gray-100 border rounded-md text-gray-500"
            />
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 transition font-semibold"
          >
            Save Address
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddressPage;
