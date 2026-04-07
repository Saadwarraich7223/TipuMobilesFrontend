import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartApi from "../api/cartApi";
import { toast } from "react-hot-toast";

const initialState = {
  cart: null,
  cartToken: localStorage.getItem("cartToken") || null,
  loading: false,
  error: null,
};

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const res = await cartApi.getCart();
      if (res.cartToken) {
        localStorage.setItem("cartToken", res.cartToken);
      }
      return res.cart;
    } catch (error) {
      if (error.response?.status === 404) {
        localStorage.removeItem("cartToken");
        dispatch(initializeCart());
      }
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const initializeCart = createAsyncThunk(
  "cart/initializeCart",
  async (_, { rejectWithValue }) => {
    try {
      const res = await cartApi.createCart();
      if (res.cartToken) {
        localStorage.setItem("cartToken", res.cartToken);
      }
      return res.cart;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity = 1 }, { rejectWithValue }) => {
    try {
      const res = await cartApi.addToCart({ productId, quantity });
      if (res.cartToken) {
        localStorage.setItem("cartToken", res.cartToken);
      }
      toast.success(res.message);
      return res.cart;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to add to cart";
      toast.error(message);
      return rejectWithValue(message);
    }
  },
);

export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const res = await cartApi.updateCart({ productId, quantity });
      toast.success(res.message);
      return res.cart;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to update cart";
      toast.error(message);
      return rejectWithValue(message);
    }
  },
);

export const removeItem = createAsyncThunk(
  "cart/removeItem",
  async ({ productId }, { rejectWithValue }) => {
    try {
      const res = await cartApi.removeItem({ data: { productId } });
      toast.success(res.message);
      return res.cart;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to remove item";
      toast.error(message);
      return rejectWithValue(message);
    }
  },
);

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, { rejectWithValue }) => {
    try {
      const res = await cartApi.clearCart();
      toast.success(res.message);
      return res.cart;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to clear cart";
      toast.error(message);
      return rejectWithValue(message);
    }
  },
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartToken: (state, action) => {
      state.cartToken = action.payload;
      localStorage.setItem("cartToken", action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(initializeCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.cartToken = localStorage.getItem("cartToken");
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.loading = false;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.loading = false;
      })
      .addCase(removeItem.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.loading = false;
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.loading = false;
      });
  },
});

export const { setCartToken } = cartSlice.actions;
export default cartSlice.reducer;
