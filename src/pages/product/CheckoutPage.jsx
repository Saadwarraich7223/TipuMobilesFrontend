import { useState } from "react";
import {
  FaLock,
  FaShippingFast,
  FaCreditCard,
  FaCheck,
  FaShieldAlt,
} from "react-icons/fa";
import { toast } from "react-hot-toast";

const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    country: "",
    shippingMethod: "",
    paymentMethod: "",
  });

  const [cartItems] = useState([
    { id: 1, name: "Pet Fish - Goldfish", price: 12.99, quantity: 2 },
    { id: 2, name: "Fish Tank Plant", price: 8.49, quantity: 1 },
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.address ||
      !formData.city ||
      !formData.zip ||
      !formData.country
    ) {
      return toast.error("Please fill in all required fields.");
    }

    // Final payload here
    const completeOrder = {
      ...formData,
      items: cartItems,
    };
    console.log("Placing Order:", completeOrder);
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="grid md:grid-cols-2">
          {/* Left Section */}
          <div className="p-6 md:p-10">
            <h1 className="text-xl md:text-2xl font-bold">Checkout</h1>
            <p className="text-gray-600 text-sm">Complete your purchase</p>

            {/* Personal Info */}
            <div className="mt-6">
              <h2 className="text-lg  font-semibold mb-4 flex items-center gap-2">
                <FaShieldAlt className="text-primary" /> Contact Info
              </h2>
              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full border px-4 py-2 text-sm rounded"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="w-full border px-4 py-2 text-sm rounded"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full border px-4 py-2 text-sm rounded"
                />
              </div>
            </div>

            {/* Address */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FaShippingFast className="text-primary" /> Shipping Address
              </h2>
              <div className="space-y-4">
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Street Address"
                  className="w-full border px-4 py-2 text-sm rounded"
                />
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="w-full border px-4 py-2 text-sm rounded"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="number"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    placeholder="ZIP Code"
                    className="w-full border px-4 py-2 text-sm rounded"
                  />
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="Country"
                    className="w-full border px-4 py-2 text-sm rounded"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Method */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FaShippingFast className="text-primary" /> Shipping Method
              </h2>
              <select
                name="shippingMethod"
                value={formData.shippingMethod}
                onChange={handleChange}
                className="w-full border px-4 py-2 text-sm rounded"
              >
                <option value="">Select Shipping</option>
                <option value="standard">Standard (3-5 days)</option>
                <option value="express">Express (1-2 days)</option>
              </select>
            </div>

            {/* Payment Method */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FaCreditCard className="text-primary" /> Payment Method
              </h2>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="w-full border px-4 py-2 text-sm rounded"
              >
                <option value="">Select Payment</option>
                <option value="card">Credit/Debit Card</option>
                <option value="cod">Cash on Delivery</option>
              </select>
            </div>
          </div>

          {/* Right Section (Order Summary) */}
          <div className="bg-gray-100 p-6 md:p-10">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <div>
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-gray-500 text-xs">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <span className="text-sm">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
              <div className="mt-4 space-y-2 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between font-semibold text-sm border-t pt-2">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Complete Order Button */}
              <button
                onClick={handleSubmit}
                className="mt-6 w-full py-3 bg-primary text-white font-semibold text-sm rounded-lg shadow hover:bg-primary-dull cursor-pointer transition-all flex items-center justify-center gap-2"
              >
                <FaCheck />
                Place Order
              </button>

              {/* Secure Checkout Notice */}
              <p className="text-center text-xs text-gray-500 mt-2 flex items-center justify-center gap-2">
                <FaLock /> 100% Secure Checkout
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
