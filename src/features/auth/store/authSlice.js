import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "../api/authApi";
import { toast } from "react-hot-toast";

const initialState = {
  user: null,
  isLoggedIn: false,
  loading: true,
  wishList: [],
  error: null,
};

export const fetchProfile = createAsyncThunk(
  "auth/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const data = await authApi.getProfile();
      return data.user || data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const login = createAsyncThunk(
  "auth/login",
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      const data = await authApi.login(userData);
      localStorage.setItem("access_token", data.accessToken);
      await dispatch(fetchProfile());
      return data;
    } catch (error) {
      const message = error.response?.data?.message || "Login failed";
      toast.error(message);
      return rejectWithValue(message);
    }
  },
);

export const register = createAsyncThunk(
  "auth/register",
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      const data = await authApi.register(userData);
      localStorage.setItem("access_token", data.accessToken);
      await dispatch(fetchProfile());
      return data;
    } catch (error) {
      const message = error.response?.data?.message || "Registration failed";
      toast.error(message);
      return rejectWithValue(message);
    }
  },
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await authApi.logout();
      localStorage.removeItem("access_token");
      localStorage.removeItem("cartToken");
      return null;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const toggleWishlist = createAsyncThunk(
  "auth/toggleWishlist",
  async (productId, { rejectWithValue }) => {
    try {
      const res = await authApi.addOrRemoveProductToWishList(productId);
      toast.success(res.message);
      return res.wishList;
    } catch (error) {
      const message = error.response?.data?.message || "Wishlist update failed";
      toast.error(message);
      return rejectWithValue(message);
    }
  },
);

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (formData, { rejectWithValue }) => {
    try {
      const data = await authApi.updateProfile(formData);
      return data.user || data;
    } catch (error) {
      const message = error.response?.data?.message || "Profile update failed";
      return rejectWithValue(message);
    }
  },
);

export const updatePassword = createAsyncThunk(
  "auth/updatePassword",
  async (passwordData, { rejectWithValue }) => {
    try {
      const res = await authApi.ChangePassword(passwordData);
      return res;
    } catch (error) {
      const message = error.response?.data?.message || "Password update failed";
      return rejectWithValue(message);
    }
  },
);

export const updateAvatar = createAsyncThunk(
  "auth/updateAvatar",
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("avatar", file);
      const data = await authApi.updateAvatar(formData);
      return data.user || data;
    } catch (error) {
      const message = error.response?.data?.message || "Avatar update failed";
      return rejectWithValue(message);
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = !!action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.wishList = action.payload.wishList || [];
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchProfile.rejected, (state) => {
        state.user = null;
        state.isLoggedIn = false;
        state.loading = false;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      })
      .addCase(updateAvatar.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isLoggedIn = false;
        state.wishList = [];
      })
      .addCase(toggleWishlist.fulfilled, (state, action) => {
        state.wishList = action.payload;
      });
  },
});

export const { setUser, setLoading } = authSlice.actions;
export default authSlice.reducer;
