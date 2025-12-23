import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";

import orderApi from "../../api/orderApi";
import OrderSummary from "../../components/checkout/OrderSummary";
import AddressCard from "../../components/checkout/AddressCard";
import AddAddressModal from "../../components/checkout/AddAddressModal";
import CheckoutSkeleton from "../../components/layout/ShimmerSkeltons/ChechkoutSkeleton";
import ClipLoader from "react-spinners/ClipLoader";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

const stepVariants = {
  initial: (direction) => ({
    opacity: 0,
    x: direction > 0 ? 40 : -40,
  }),
  animate: {
    opacity: 1,
    x: 0,
  },
  exit: (direction) => ({
    opacity: 0,
    x: direction > 0 ? -40 : 40,
  }),
};

const steps = ["Shipping", "Payment", "Review"];

const CheckoutPage = () => {
  const { fetchCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const [cart, setCart] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    nameOnCard: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("card"); // Added paymentMethod state
  const [loading, setLoading] = useState(false);
  const [placingOrderLoading, setPlacingOrderLoading] = useState(false);

  useEffect(() => {
    const fetchCheckoutData = async () => {
      try {
        setLoading(true);
        const res = await orderApi.fetchCheckoutPreview();
        setCart(res.cart || []);
        setAddresses(res.addresses || []);
        setSelectedAddress(res.defaultAddressId || null);

        // Prefill shipping info if default address exists
        const defaultAddr = res.addresses?.find(
          (a) => a._id === res.defaultAddressId
        );
        if (defaultAddr) setShippingInfo(defaultAddr);
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to load checkout");
      } finally {
        setLoading(false);
      }
    };
    fetchCheckoutData();
  }, []);

  const handleNext = () => {
    // Step 1: Shipping
    if (step === 1) {
      // If no addresses exist or user is adding a new one, validate all fields
      if (!selectedAddress) {
        const requiredFields = [
          "fullName",
          "email",
          "phone",
          "addressLine1",
          "city",
          "state",
          "postalCode",
          "country",
        ];
        for (let field of requiredFields) {
          if (!shippingInfo[field]) {
            toast.error(
              `Please fill the field ${field.replace(/([A-Z])/g, " $1")}`
            );
            return;
          }
        }
      }
    }

    // Step 2: Payment
    if (step === 2 && paymentMethod === "card") {
      const requiredPaymentFields = [
        "cardNumber",
        "expiry",
        "cvv",
        "nameOnCard",
      ];
      for (let field of requiredPaymentFields) {
        if (!paymentInfo[field]) {
          toast.error(
            `Please fill the field ${field.replace(/([A-Z])/g, " $1")}`
          );
          return;
        }
      }
    }

    setDirection(1);
    setStep(step + 1);
  };

  const handleBack = () => {
    setDirection(-1);
    setStep(step - 1);
  };

  const handlePlaceOrder = async () => {
    setPlacingOrderLoading(true);
    try {
      const res = await orderApi.placeOrder({
        shippingInfo,
        paymentInfo,
        paymentMethod,
      });
      toast.success("Order placed successfully!");
      fetchCart();
      navigate("/order-submitted", {
        state: {
          order: res.order, // or res depending on your API
        },
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to place order");
    } finally {
      setPlacingOrderLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Shipping Information
            </h2>

            {addresses.length > 0 ? (
              <div className="space-y-3">
                {addresses.map((address) => (
                  <AddressCard
                    key={address._id}
                    address={address}
                    selected={selectedAddress === address._id}
                    onSelect={() => {
                      setSelectedAddress(address._id);
                      setShippingInfo(address);
                    }}
                  />
                ))}

                <button
                  onClick={() => setShowAddModal(true)}
                  className="text-green-600 font-medium underline hover:text-green-500 transition-colors mt-2"
                >
                  + Add New Address
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {[
                  { label: "Full Name", key: "fullName" },
                  { label: "Email", key: "email", type: "email" },
                  { label: "Phone", key: "phone" },
                  { label: "Address Line 1", key: "addressLine1" },
                  { label: "Address Line 2", key: "addressLine2" },
                  { label: "City", key: "city" },
                  { label: "State", key: "state" },
                  { label: "Postal Code", key: "postalCode" },
                  { label: "Country", key: "country" },
                ].map((field) => (
                  <input
                    key={field.key}
                    type={field.type || "text"}
                    placeholder={field.label}
                    value={shippingInfo[field.key]}
                    onChange={(e) =>
                      setShippingInfo({
                        ...shippingInfo,
                        [field.key]: e.target.value,
                      })
                    }
                    className="w-full border text-sm border-gray-300 rounded-xl p-3 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-green-400 outline-none hover:shadow-sm transition-shadow duration-200"
                  />
                ))}
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Payment Information
            </h2>

            {/* Payment Method Options */}
            <div className="flex flex-col space-y-3 mb-4">
              <label className="flex items-center gap-3 cursor-pointer p-3 border rounded-xl hover:shadow-sm transition-shadow duration-200">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={() => setPaymentMethod("card")}
                  className=" w-5 h-5"
                />
                <span className="text-gray-700 font-medium">
                  Credit / Debit Card
                </span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer p-3 border rounded-xl hover:shadow-sm transition-shadow duration-200">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                  className="w-5 h-5"
                />
                <span className="text-gray-700 font-medium">
                  Cash on Delivery
                </span>
              </label>
            </div>

            {/* Card Details Form (only if card selected) */}
            {paymentMethod === "card" && (
              <div className="space-y-4">
                {[
                  { label: "Card Number", key: "cardNumber" },
                  { label: "Expiry (MM/YY)", key: "expiry" },
                  { label: "CVV", key: "cvv" },
                  { label: "Name on Card", key: "nameOnCard" },
                ].map((field) => (
                  <input
                    key={field.key}
                    placeholder={field.label}
                    value={paymentInfo[field.key]}
                    onChange={(e) =>
                      setPaymentInfo({
                        ...paymentInfo,
                        [field.key]: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-xl p-2 px-4 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-green-400 outline-none hover:shadow-sm transition-shadow duration-200"
                  />
                ))}
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Review Your Order
            </h2>

            <div className="p-6 bg-white rounded-xl border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-700 mb-3 border-b border-gray-200 pb-2">
                Shipping Information
              </h3>
              <div className="text-gray-600 space-y-1 text-sm sm:text-base">
                <p className="font-medium text-gray-800">
                  {shippingInfo.fullName}
                </p>
                <p>{shippingInfo.addressLine1}</p>
                {shippingInfo.addressLine2 && (
                  <p>{shippingInfo.addressLine2}</p>
                )}
                <p>
                  {shippingInfo.city}, {shippingInfo.state}{" "}
                  {shippingInfo.postalCode}
                </p>
                <p>{shippingInfo.country}</p>
                <p className="text-gray-500 text-sm mt-1">
                  Email: {shippingInfo.email}
                </p>
                <p className="text-gray-500 text-sm">
                  Phone: {shippingInfo.phone}
                </p>
              </div>
            </div>

            <div className="p-6 bg-white rounded-xl border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-700 mb-3 border-b border-gray-200 pb-2">
                Payment Information
              </h3>
              <div className="text-gray-600 space-y-1 text-sm sm:text-base">
                {paymentMethod === "card" ? (
                  <>
                    <p className="font-medium text-gray-800">
                      Card ending with {paymentInfo.cardNumber.slice(-4)}
                    </p>
                    <p>Name on Card: {paymentInfo.nameOnCard}</p>
                  </>
                ) : (
                  <p className="font-medium text-gray-800">Cash on Delivery</p>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };
  if (loading) return <CheckoutSkeleton />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl  mx-auto px-2 sm:px-6 lg:px-8 py-10"
    >
      {/* Stepper */}
      <div className="relative mb-5 max-w-3xl mx-auto">
        <div className="absolute top-3 left-0 w-full h-0.5 bg-gray-200">
          <motion.div
            className="h-0.5 bg-green-500"
            animate={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
          />
        </div>

        <div className="flex justify-between relative z-10">
          {steps.map((label, index) => {
            const isActive = step === index + 1;
            const isCompleted = step > index + 1;

            return (
              <div key={label} className="flex flex-col items-center">
                <div
                  className={`w-7 h-7 bg-white border-2 rounded-full flex items-center justify-center ${
                    isActive
                      ? "border-green-500 shadow-[0_0_0_4px_rgba(34,197,94,0.25)]"
                      : isCompleted
                      ? "border-green-500 shadow-[0_0_0_3px_rgba(34,197,94,0.18)]"
                      : "border-gray-300"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isActive || isCompleted ? "bg-green-500" : "bg-gray-300"
                    }`}
                  />
                </div>
                <span
                  className={`mt-2 text-xs font-medium ${
                    isActive || isCompleted ? "text-green-600" : "text-gray-500"
                  }`}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Form */}
        <div className="lg:col-span-2">
          <div className="bg-white  p-4 rounded-xl border border-gray-200 overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={step}
                custom={direction}
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.35, ease: "easeInOut" }}
              >
                {renderStepContent()}
              </motion.div>
            </AnimatePresence>

            {/* Buttons */}
            <div className="flex justify-between mt-8">
              {step > 1 && (
                <button
                  onClick={handleBack}
                  className="px-6 py-2 border rounded-lg"
                >
                  Back
                </button>
              )}

              {step < 3 ? (
                <button
                  onClick={handleNext}
                  className="ml-auto px-6 py-2 bg-primary text-white rounded-lg"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handlePlaceOrder}
                  disabled={placingOrderLoading}
                  className="ml-auto px-6 py-2 bg-green-600 text-white rounded-lg disabled:opacity-50"
                >
                  {placingOrderLoading ? (
                    <ClipLoader size={16} color="#ffff" className="mt-1" />
                  ) : (
                    "Confirm Order"
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right: Summary */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-24">
            <OrderSummary cart={cart} />
          </div>
        </div>
      </div>

      {/* Add Address Modal */}
      {showAddModal && (
        <AddAddressModal
          onClose={() => setShowAddModal(false)}
          onAddressAdded={(newAddressId) => {
            orderApi.fetchCheckoutPreview().then((res) => {
              setAddresses(res.addresses || []);
              setSelectedAddress(newAddressId);
              const newAddr = res.addresses.find((a) => a._id === newAddressId);
              if (newAddr) setShippingInfo(newAddr);
            });
            setShowAddModal(false);
          }}
        />
      )}
    </motion.div>
  );
};

export default CheckoutPage;
