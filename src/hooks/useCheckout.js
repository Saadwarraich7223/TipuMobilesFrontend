import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import orderApi from "../api/orderApi";

export const useCheckout = () => {
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    const loadCheckout = async () => {
      try {
        const res = await orderApi.fetchCheckoutPreview();

        setCart(res.cart);
        setAddresses(res.addresses);
        setSelectedAddress(res.defaultAddressId);
      } catch {
        toast.error("Failed to load checkout");
      } finally {
        setLoading(false);
      }
    };

    loadCheckout();
  }, []);

  return {
    loading,
    cart,
    addresses,
    selectedAddress,
    setSelectedAddress,
    setAddresses,
  };
};
