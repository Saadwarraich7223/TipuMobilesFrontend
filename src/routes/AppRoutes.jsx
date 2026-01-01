import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import BottomNavLayout from "../layouts/BottomNavLayout";
import AuthLayout from "../layouts/AuthLayout";
import ProtectedRoute from "../components/common/ProtectedRoute/ProtectedRoute";

/* 🔥 Lazy Pages */
const HomePage = lazy(() => import("../pages/home/HomePage"));
const ProductDetailsPage = lazy(() =>
  import("../pages/product/ProductDetailsPage")
);
const ProductsListingPage = lazy(() =>
  import("../pages/product/ProductsListingPage")
);
const CartPage = lazy(() => import("../pages/cart/CartPage"));
const CheckoutPage = lazy(() => import("../pages/checkout/CheckoutPage"));
const OrderSubmitted = lazy(() => import("../pages/checkout/OrderSubmitted"));

const ProfilePage = lazy(() => import("../pages/user/ProfilePage"));
const EditProfilePage = lazy(() => import("../pages/user/EditProfilePage"));
const ChangePasswordPage = lazy(() =>
  import("../pages/user/ChangePasswordPage")
);
const ShippingAddresses = lazy(() => import("../pages/user/ShippingAddresses"));
const UserOrdersPage = lazy(() => import("../pages/user/UserOrdersPage"));
const WishListPage = lazy(() => import("../pages/user/WishListPage"));

const LoginPage = lazy(() => import("../pages/auth/LoginPage"));
const RegisterPage = lazy(() => import("../pages/auth/RegisterPage"));
const VerifyAccount = lazy(() => import("../pages/auth/VerifyAccount"));
const ChangePassword = lazy(() => import("../pages/auth/Changepassword"));

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
        </Route>

        {/* Bottom Nav Layout */}
        <Route element={<BottomNavLayout />}>
          <Route path="/cart" element={<CartPage />} />
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
            path="/profile"
            element={
              <ProtectedRoute authOnly>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/edit-profile"
            element={
              <ProtectedRoute authOnly>
                <EditProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/change-password"
            element={
              <ProtectedRoute authOnly>
                <ChangePasswordPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/shipping-address"
            element={
              <ProtectedRoute authOnly>
                <ShippingAddresses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/orders"
            element={
              <ProtectedRoute authOnly>
                <UserOrdersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/wishlist"
            element={
              <ProtectedRoute authOnly>
                <WishListPage />
              </ProtectedRoute>
            }
          />
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
