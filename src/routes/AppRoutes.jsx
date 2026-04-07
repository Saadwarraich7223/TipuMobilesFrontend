import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import BottomNavLayout from "../layouts/BottomNavLayout";
import AuthLayout from "../layouts/AuthLayout";
import ProtectedRoute from "../features/auth/components/ProtectedRoute";
import UserDashboardLayout from "../features/user/components/UserDashboardLayout";

/*  Lazy Pages */
const HomePage = lazy(() => import("../features/home/pages/HomePage"));
const ProductDetailsPage = lazy(
  () => import("../features/product/pages/ProductDetailsPage"),
);
const ProductsListingPage = lazy(
  () => import("../features/product/pages/ProductsListingPage"),
);
const CartPage = lazy(() => import("../features/cart/pages/CartPage"));
const CheckoutPage = lazy(() => import("../features/checkout/pages/CheckoutPage"));
const OrderSubmitted = lazy(() => import("../features/checkout/pages/OrderSubmitted"));

const ProfilePage = lazy(() => import("../features/user/pages/ProfilePage"));
const EditProfilePage = lazy(() => import("../features/user/pages/EditProfilePage"));
const ChangePasswordPage = lazy(
  () => import("../features/user/pages/ChangePasswordPage"),
);
const ShippingAddresses = lazy(() => import("../features/user/pages/ShippingAddresses"));
const UserOrdersPage = lazy(() => import("../features/user/pages/UserOrdersPage"));
const WishListPage = lazy(() => import("../features/user/pages/WishListPage"));

const LoginPage = lazy(() => import("../features/auth/pages/LoginPage"));
const RegisterPage = lazy(() => import("../features/auth/pages/RegisterPage"));
const VerifyAccount = lazy(() => import("../features/auth/pages/VerifyAccount"));
const ChangePassword = lazy(() => import("../features/auth/pages/Changepassword"));

const AppRoutes = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <span className="text-gray-500 text-sm">Loading…</span>
        </div>
      }
    >
      <Routes>
        {/* Main Layout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/products/*" element={<ProductsListingPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Route>

        {/* Bottom Nav Layout */}
        <Route element={<BottomNavLayout />}>
          <Route
            path="/checkout"
            element={
              <ProtectedRoute authOnly>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order-submitted"
            element={
              <ProtectedRoute authOnly>
                <OrderSubmitted />
              </ProtectedRoute>
            }
          />

          <Route
            element={
              <ProtectedRoute authOnly>
                <UserDashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/edit-profile" element={<EditProfilePage />} />
            <Route
              path="/profile/change-password"
              element={<ChangePasswordPage />}
            />
            <Route
              path="/profile/shipping-address"
              element={<ShippingAddresses />}
            />
            <Route path="/profile/orders" element={<UserOrdersPage />} />
            <Route path="/profile/wishlist" element={<WishListPage />} />
          </Route>

          <Route
            path="/login"
            element={
              <ProtectedRoute authOnly={false}>
                <LoginPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <ProtectedRoute authOnly={false}>
                <RegisterPage />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Auth Layout */}
        <Route element={<AuthLayout />}>
          <Route path="/verifyAccount" element={<VerifyAccount />} />
          <Route path="/reset-password" element={<ChangePassword />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;

