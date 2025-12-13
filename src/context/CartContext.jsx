import { createContext, useContext, useEffect, useState } from "react";
import cartApi from "../api/cartApi";
import toast from "react-hot-toast";

const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [cartToken, setCartToken] = useState(localStorage.getItem("cartToken"));
  const [loading, setLoading] = useState(false);

  const saveCartToken = (token) => {
    if (!token) return;
    localStorage.setItem("cartToken", token);
    setCartToken(token);
  };

  const initializeCart = async () => {
    try {
      setLoading(true);
      const res = await cartApi.createCart();

      setCart(res.cart);
      saveCartToken(res.cartToken);
    } catch (error) {
      console.error("createCart error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await cartApi.getCart();
      setCart(res.cart);
      saveCartToken(res.cartToken);
    } catch (err) {
      console.error("Fetch cart error:", err);
      // If token is invalid, reset and create new cart
      if (err.response?.status === 404) {
        localStorage.removeItem("cartToken");
        initializeCart();
      }
    } finally {
      setLoading(false);
    }
  };
  const addToCart = async ({ productId, quantity = 1 }) => {
    try {
      setLoading(true);
      const res = await cartApi.addToCart({
        productId,
        quantity,
      });

      setCart(res.cart);
      saveCartToken(res.cartToken);
      return res;
    } catch (err) {
      console.error("Add to cart error:", err);
      toast.error(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  const updateCart = async ({ productId, quantity }) => {
    try {
      setLoading(true);
      const res = await cartApi.updateCart({
        productId,
        quantity,
      });

      toast.success(res.message);

      setCart(res.cart);
    } catch (err) {
      console.error("Update cart error:", err);
    } finally {
      setLoading(false);
    }
  };
  const removeItem = async ({ productId }) => {
    console.log(productId);
    try {
      setLoading(true);
      const res = await cartApi.removeItem({ data: { productId } });
      toast.success(res.message);
      setCart(res.cart);
    } catch (err) {
      console.error("Remove item error:", err);
    } finally {
      setLoading(false);
    }
  };
  const clearCart = async () => {
    try {
      setLoading(true);
      const res = await cartApi.clearCart();
      setCart(res.cart);
      toast.success(res.message);
    } catch (err) {
      console.error("Clear cart error:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!cartToken) {
      initializeCart();
    } else {
      fetchCart();
    }
  }, []);

  const value = {
    cart,
    loading,
    addToCart,
    updateCart,
    removeItem,
    clearCart,
    fetchCart,
    initializeCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContextProvider;
export const useCart = () => useContext(CartContext);
