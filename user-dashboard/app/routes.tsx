import { createBrowserRouter } from "react-router";
import RootLayout from "./components/layout/RootLayout";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Wishlist from "./pages/Wishlist";
import ShippingAddresses from "./pages/ShippingAddresses";
import ChangePassword from "./pages/ChangePassword";
import EditProfile from "./pages/EditProfile";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "orders", Component: Orders },
      { path: "orders/:status", Component: Orders },
      { path: "wishlist", Component: Wishlist },
      { path: "addresses", Component: ShippingAddresses },
      { path: "change-password", Component: ChangePassword },
      { path: "edit-profile", Component: EditProfile },
    ],
  },
]);
