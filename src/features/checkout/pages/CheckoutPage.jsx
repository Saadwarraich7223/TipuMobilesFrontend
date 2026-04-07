import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

import orderApi from "../../user/api/orderApi";
import OrderSummary from "../components/OrderSummary";
import AddressCard from "../components/AddressCard";
import AddAddressModal from "../components/AddAddressModal";
import CheckoutSkeleton from "../../../components/layout/ShimmerSkeletons/ChechkoutSkeleton";
import { fetchCart } from "../../cart/store/cartSlice";
import Navbar from "../../../components/layout/Navbar/Navbar";
import { addressApi } from "../../user/api/addressApi";

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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
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

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [loading, setLoading] = useState(false);
  const [placingOrderLoading, setPlacingOrderLoading] = useState(false);

  useEffect(() => {
    const fetchCheckoutData = async () => {
      try {
        setLoading(true);
        const res = await orderApi.fetchCheckoutPreview();
        setCart(res.cart || []);

        let addressList = res.addresses || [];
        if ((!addressList || addressList.length === 0) && user?._id) {
          try {
            const fallback = await addressApi.getAddressesByUser({
              id: user._id,
            });
            addressList = fallback?.addresses || fallback || [];
          } catch {
            addressList = [];
          }
        }

        setAddresses(addressList);
        const defaultId =
          res.defaultAddressId ||
          addressList.find((addr) => addr.isDefault)?._id ||
          null;
        setSelectedAddress(defaultId);

        const defaultAddr = addressList.find((a) => a._id === defaultId);
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
    if (step === 1 && !selectedAddress) {
      toast.error("Please select or add a shipping address.");
      return;
    }

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
            `Please fill the field ${field.replace(/([A-Z])/g, " $1")}`,
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
      const {
        _id,
        userId,
        createdAt,
        updatedAt,
        __v,
        isDefault,
        ...shippingSnapshot
      } = shippingInfo;
      const res = await orderApi.placeOrder({
        shippingInfo: shippingSnapshot,
        paymentInfo,
        paymentMethod,
      });
      toast.success("Order placed successfully!");
      dispatch(fetchCart());
      navigate("/order-submitted", {
        state: {
          order: res.order,
        },
        replace: true,
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
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#8a6b47]/70 font-semibold">
                Step 1
              </p>
              <h2 className="text-xl sm:text-2xl font-bold text-[#171717]">
                Shipping Information
              </h2>
              <p className="text-sm text-[#6b5e54] mt-1">
                Choose a saved address or add a new one.
              </p>
            </div>

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
                  className="text-[#8a6b47] font-medium underline hover:text-[#171717] transition-colors mt-2"
                >
                  + Add New Address
                </button>
              </div>
            ) : (
              <div className="surface-raised rounded-2xl border-[#ddd4c8]/60 p-4 sm:p-6 text-center">
                <p className="text-sm text-[#6b5e54]">
                  No saved addresses yet.
                </p>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="mt-3 inline-flex items-center justify-center rounded-xl border border-[#ddd4c8]/70 bg-white/70 px-4 py-2 text-sm font-semibold text-[#171717] hover:bg-white transition"
                >
                  Add your first address
                </button>
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#8a6b47]/70 font-semibold">
                Step 2
              </p>
              <h2 className="text-xl sm:text-2xl font-bold text-[#171717] mb-1">
                Payment Information
              </h2>
              <p className="text-sm text-[#6b5e54]">
                Select a payment method.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  value: "card",
                  label: "Credit / Debit Card",
                  helper: "Visa, Mastercard, UnionPay",
                },
                {
                  value: "cod",
                  label: "Cash on Delivery",
                  helper: "Pay with cash at your door",
                },
              ].map((method) => (
                <label
                  key={method.value}
                  className={`cursor-pointer p-4 rounded-2xl border transition-shadow duration-200 ${
                    paymentMethod === method.value
                      ? "border-[#8a6b47]/50 bg-white/80 shadow-[0_10px_24px_rgba(36,32,24,0.08)]"
                      : "border-[#ddd4c8]/60 bg-white/70 hover:shadow-sm"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.value}
                      checked={paymentMethod === method.value}
                      onChange={() => setPaymentMethod(method.value)}
                      className="mt-1 w-4 h-4"
                    />
                    <div>
                      <p className="text-sm font-semibold text-[#171717]">
                        {method.label}
                      </p>
                      <p className="text-xs text-[#6b5e54]">
                        {method.helper}
                      </p>
                    </div>
                  </div>
                </label>
              ))}
            </div>

            {paymentMethod === "card" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
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
                    className="w-full border border-[#ddd4c8]/70 rounded-xl p-3 text-[#4f4a43] placeholder-[#a0978d] focus:ring-1 focus:ring-[#8a6b47]/40 outline-none hover:shadow-sm transition-shadow duration-200 bg-white/70 text-sm"
                  />
                ))}
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#8a6b47]/70 font-semibold">
                Step 3
              </p>
              <h2 className="text-xl sm:text-2xl font-bold text-[#171717]">
                Review Your Order
              </h2>
              <p className="text-sm text-[#6b5e54] mt-1">
                Confirm shipping and payment before placing the order.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 sm:p-6 bg-white/70 rounded-2xl border border-[#ddd4c8]/60">
                <h3 className="text-base sm:text-lg font-semibold text-[#4f4a43] mb-3 border-b border-[#e6ded4] pb-2">
                  Shipping Information
                </h3>
                <div className="text-[#6b5e54] space-y-1 text-xs sm:text-sm">
                  <p className="font-medium text-[#171717]">
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
                  <p className="text-[#8a6b47]/70 text-xs mt-1">
                    Email: {shippingInfo.email}
                  </p>
                  <p className="text-[#8a6b47]/70 text-xs">
                    Phone: {shippingInfo.phone}
                  </p>
                </div>
              </div>

              <div className="p-4 sm:p-6 bg-white/70 rounded-2xl border border-[#ddd4c8]/60">
                <h3 className="text-base sm:text-lg font-semibold text-[#4f4a43] mb-3 border-b border-[#e6ded4] pb-2">
                  Payment Information
                </h3>
                <div className="text-[#6b5e54] space-y-1 text-xs sm:text-sm">
                  {paymentMethod === "card" ? (
                    <>
                      <p className="font-medium text-[#171717]">
                        Card ending with {paymentInfo.cardNumber.slice(-4)}
                      </p>
                      <p>Name on Card: {paymentInfo.nameOnCard}</p>
                    </>
                  ) : (
                    <p className="font-medium text-[#171717]">
                      Cash on Delivery
                    </p>
                  )}
                </div>
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
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pb-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="surface-raised rounded-3xl border-[#ddd4c8]/60 p-4 sm:p-6 mt-4 sm:mt-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#8a6b47]/70 font-semibold">
                  Secure Checkout
                </p>
                <h1 className="text-xl sm:text-2xl font-bold text-[#171717]">
                  Complete your order
                </h1>
                <p className="text-sm text-[#6b5e54] mt-1">
                  Fast, secure, and protected payments.
                </p>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                {steps.map((label, index) => {
                  const isActive = step === index + 1;
                  const isCompleted = step > index + 1;
                  return (
                    <div
                      key={label}
                      className={`flex items-center gap-2 rounded-full px-3 py-1.5 border text-[11px] font-semibold transition ${
                        isActive
                          ? "bg-white/80 border-[#ddd4c8]/70 text-[#171717]"
                          : isCompleted
                            ? "bg-[#f6f1e7] border-[#eadfce] text-[#8a6b47]"
                            : "bg-white/60 border-[#ddd4c8]/50 text-[#6b5e54]"
                      }`}
                    >
                      <span
                        className={`inline-flex h-2 w-2 rounded-full ${
                          isActive
                            ? "bg-[#171717]"
                            : isCompleted
                              ? "bg-[#8a6b47]"
                              : "bg-[#cbbfb0]"
                        }`}
                      />
                      {label}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mt-6">
            <div className="lg:col-span-2">
              <div className="surface-raised p-4 sm:p-6 rounded-2xl border-[#ddd4c8]/60 overflow-hidden">
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

                <div className="flex justify-between mt-6 sm:mt-8">
                  {step > 1 && (
                    <button
                      onClick={handleBack}
                      className="px-5 py-2.5 border border-[#ddd4c8]/70 rounded-xl text-sm text-[#4f4a43] hover:bg-white/70"
                    >
                      Back
                    </button>
                  )}

                  {step < 3 ? (
                    <button
                      onClick={handleNext}
                      className="ml-auto px-6 py-2.5 bg-[#171717] text-white rounded-xl text-sm hover:bg-black"
                    >
                      Continue
                    </button>
                  ) : (
                    <button
                      onClick={handlePlaceOrder}
                      disabled={placingOrderLoading}
                      className="ml-auto px-6 py-2.5 bg-[#171717] text-white rounded-xl disabled:opacity-50 text-sm hover:bg-black"
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

            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-24">
                <OrderSummary cart={cart} />
              </div>
            </div>
          </div>
        </div>

        {showAddModal && (
          <AddAddressModal
            onClose={() => setShowAddModal(false)}
            onAddressAdded={(newAddressId) => {
              orderApi.fetchCheckoutPreview().then((res) => {
                const addressList = res.addresses || [];
                setAddresses(addressList);
                const selectedId =
                  newAddressId ||
                  res.defaultAddressId ||
                  addressList.find((addr) => addr.isDefault)?._id ||
                  addressList[0]?._id ||
                  null;
                setSelectedAddress(selectedId);
                const newAddr = addressList.find((a) => a._id === selectedId);
                if (newAddr) setShippingInfo(newAddr);
              });
              setShowAddModal(false);
            }}
          />
        )}
      </motion.div>
    </>
  );
};

export default CheckoutPage;
