import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../api/authApi";
import { toast } from "react-hot-toast";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [wishList, setWishList] = useState([]);

  const fetchProfile = async () => {
    try {
      setLoadingUser(true);
      const data = await authApi.getProfile();
      setUser(data.user || data);
      setIsLoggedIn(true);
    } catch (error) {
      setUser(null);
      setIsLoggedIn(false);
    } finally {
      setLoadingUser(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const register = async (userData) => {
    try {
      const data = await authApi.register(userData);
      localStorage.setItem("access_token", data.accessToken);
      await fetchProfile();
      navigate("/");
    } catch (err) {
      console.error(
        "Register failed:",
        err.response?.data?.message || err.message
      );
      throw err;
    }
  };

  const login = async (userData) => {
    const data = await authApi.login(userData);
    localStorage.setItem("access_token", data.accessToken);
    await fetchProfile();
    navigate("/");
  };

  const updateProfile = async (userData) => {
    try {
      const data = await authApi.updateProfile(userData);
      await fetchProfile();
      return data;
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateAvatar = async (avatarFile) => {
    try {
      const formData = new FormData();
      formData.append("avatar", avatarFile);
      const data = await authApi.updateAvatar(formData);

      await fetchProfile();
      return data;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  };
  const updatePassword = async (passwords) => {
    try {
      const data = await authApi.ChangePassword(passwords);
      await fetchProfile();
      return data;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  };

  const logout = async () => {
    await authApi.logout().catch(() => {});
    localStorage.removeItem("access_token");
    localStorage.removeItem("cartToken");
    setUser(null);
    setIsLoggedIn(false);
    navigate("/");
  };

  const getWishList = async () => {
    try {
      const res = await authApi.getWishList();
      setWishList(res.wishList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWishList();
  }, [user]);

  const addOrRemoveFromWishList = async (productId) => {
    try {
      const res = await authApi.addOrRemoveProductToWishList(productId);
      toast.success(res.message);
      setWishList(res.wishList);
      console.log(wishList);
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    user,
    isLoggedIn,
    loadingUser,
    register,
    login,
    updateProfile,
    updateAvatar,
    logout,
    fetchProfile,
    updatePassword,
    navigate,
    wishList,
    addOrRemoveFromWishList,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
