import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "../components/common/ProtectedRoute/ProtectedRoute";

import AuthLayout from "../layouts/AuthLayout";
import LoginPage from "../pages/auth/LoginPage";
import VerifyAccount from "../pages/auth/VerifyAccount";
import ChangePassword from "../pages/auth/Changepassword";

import RegisterPage from "../pages/auth/RegisterPage";
import CartPage from "../pages/cart/CartPage";
import HomePage from "../pages/home/HomePage";
import ProductDetailsPage from "../pages/product/ProductDetailsPage";
import ProductsListingPage from "../pages/product/ProductsListingPage";

import ProfilePage from "../pages/user/ProfilePage";
import BottomNavLayout from "../layouts/BottomNavLayout";

import SearchPage from "../pages/search/SearchPage";

import ChangePasswordPage from "../pages/user/ChangePasswordPage";

import UserOrdersPage from "../pages/user/UserOrdersPage";
import EditProfilePage from "../pages/user/EditProfilePage";
import WishListPage from "../pages/user/WishListPage";
import ShippingAddresses from "../pages/user/ShippingAddresses";
import CheckoutPage from "../pages/checkout/CheckoutPage";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Main Layout Route */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />

        <Route path={"/product/:id"} element={<ProductDetailsPage />} />

        <Route path="/products/*" element={<ProductsListingPage />} />
      </Route>
      <Route element={<BottomNavLayout />}>
        <Route path={"/cart"} element={<CartPage />} />
        <Route
          path={"/checkout"}
          element={
            <ProtectedRoute authOnly>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={"/profile"}
          element={
            <ProtectedRoute authOnly>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path={"/profile/edit-profile"}
          element={
            <ProtectedRoute authOnly>
              <EditProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path={"/profile/change-password"}
          element={
            <ProtectedRoute authOnly>
              <ChangePasswordPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={"/profile/shipping-address"}
          element={
            <ProtectedRoute authOnly>
              <ShippingAddresses />
            </ProtectedRoute>
          }
        />
        <Route
          path={"/profile/orders"}
          element={
            <ProtectedRoute authOnly>
              <UserOrdersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={"/profile/wishlist"}
          element={
            <ProtectedRoute authOnly>
              {" "}
              <WishListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={"/login"}
          element={
            <ProtectedRoute authOnly={false}>
              <LoginPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={"/register"}
          element={
            <ProtectedRoute authOnly={false}>
              <RegisterPage />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Auth Layout Route */}
      <Route element={<AuthLayout />}>
        <Route path={"/search"} element={<SearchPage />} />
        <Route path={"/verifyAccount"} element={<VerifyAccount />} />
        <Route path={"/reset-password"} element={<ChangePassword />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
