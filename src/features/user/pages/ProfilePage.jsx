import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Heart, MapPin, Package, ShoppingCart } from "lucide-react";

import orderApi from "../api/orderApi";
import { addressApi } from "../api/addressApi";

const statusStyles = (status = "") => {
  switch (status.toLowerCase()) {
    case "delivered":
      return "bg-[#f4f1e4] text-[#7b6a2f]";
    case "shipped":
      return "bg-[#eaf4f0] text-[#3d6b5a]";
    case "processing":
      return "bg-[#eaf1f6] text-[#446b8a]";
    case "pending":
      return "bg-[#f6f1e7] text-[#8a6b47]";
    case "cancelled":
      return "bg-[#f7e9e9] text-[#8a3f3f]";
    default:
      return "bg-white/70 text-[#4f4a43]";
  }
};

export default function ProfilePage() {
  const { user, wishList } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        setLoading(true);
        const [ordersRes, addressRes] = await Promise.all([
          orderApi.getUserOrders(),
          user?._id ? addressApi.getAddressesByUser({ id: user._id }) : [],
        ]);

        if (!mounted) return;
        setOrders(ordersRes?.orders || []);
        setAddresses(addressRes || []);
      } catch {
        if (!mounted) return;
        setOrders([]);
        setAddresses([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, [user?._id]);

  const recentOrders = useMemo(() => {
    return [...orders]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 3);
  }, [orders]);

  const stats = [
    {
      title: "Total Orders",
      value: orders.length,
      icon: Package,
      color: "bg-[#e6f1f6]",
      link: "/profile/orders",
    },
    {
      title: "Wishlist Items",
      value: wishList?.length || 0,
      icon: Heart,
      color: "bg-[#f6e7e7]",
      link: "/profile/wishlist",
    },
    {
      title: "Saved Addresses",
      value: addresses.length,
      icon: MapPin,
      color: "bg-[#e7f1ee]",
      link: "/profile/shipping-address",
    },
    {
      title: "Cart Items",
      value: cart?.items?.length || 0,
      icon: ShoppingCart,
      color: "bg-[#f1e7f1]",
      link: "/cart",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.title}
              to={stat.link}
              className="surface-raised rounded-2xl border-[#ddd4c8]/60 p-4 sm:p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`${stat.color} p-3 rounded-2xl border border-white/70`}
                >
                  <Icon className="w-6 h-6 text-[#4f4a43]" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-[#6b5e54]">
                    {stat.title}
                  </p>
                  <p className="text-xl sm:text-2xl mt-1 text-[#171717]">
                    {stat.value}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="surface-raised rounded-2xl border-[#ddd4c8]/60 overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-[#e6ded4] flex items-center justify-between">
          <h2 className="text-lg sm:text-xl text-[#171717]">Recent Orders</h2>
          <Link
            to="/profile/orders"
            className="text-[#8a6b47] hover:text-[#171717] text-xs sm:text-sm font-semibold"
          >
            View All
          </Link>
        </div>

        {loading ? (
          <div className="p-4 sm:p-6 text-sm text-[#6b5e54]">
            Loading orders...
          </div>
        ) : recentOrders.length === 0 ? (
          <div className="p-4 sm:p-6 text-sm text-[#6b5e54]">
            No recent orders found.
          </div>
        ) : (
          <div className="divide-y">
            {recentOrders.map((order) => {
              const firstItem = order.orderItems?.[0];
              return (
                <div
                  key={order._id}
                  className="p-4 sm:p-6 hover:bg-white/70 transition-colors"
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <img
                      src={firstItem?.image || "/image.png"}
                      alt={firstItem?.title || "Order item"}
                      className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-xl border border-white/70 bg-white/60"
                    />
                    <div className="flex-1">
                      <h3 className="mb-1 text-[#171717]">
                        {firstItem?.title || "Order item"}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#6b5e54]">
                        Order ID: {order.orderId} •{" "}
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                      {order.orderItems?.length > 1 && (
                        <p className="text-[11px] sm:text-xs text-[#8a6b47]/70">
                          + {order.orderItems.length - 1} more items
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="mb-1 text-sm sm:text-base text-[#171717] font-semibold">
                        Rs {order.grandTotal}
                      </p>
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[10px] sm:text-xs ${statusStyles(
                          order.orderStatus,
                        )}`}
                      >
                        {(order.orderStatus || "processing").replace(
                          /^./,
                          (c) => c.toUpperCase(),
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div className="surface-raised rounded-2xl border-[#ddd4c8]/60 p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl mb-2">Shop New Arrivals</h3>
          <p className="text-sm sm:text-base text-[#6b5e54] mb-4">
            Discover the latest products and exclusive deals
          </p>
          <Link
            to="/products"
            className="inline-block bg-[#171717] text-white px-4 py-2 rounded-xl hover:bg-black transition-colors text-sm sm:text-base"
          >
            Browse Now
          </Link>
        </div>
        <div className="surface-raised rounded-2xl border-[#ddd4c8]/60 p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl mb-2">Premium Membership</h3>
          <p className="text-sm sm:text-base text-[#6b5e54] mb-4">
            Enjoy free shipping and exclusive member benefits
          </p>
          <Link
            to="/profile/edit-profile"
            className="inline-block bg-white/70 text-[#4f4a43] px-4 py-2 rounded-xl border border-[#ddd4c8]/70 hover:bg-white transition-colors text-sm sm:text-base"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
}
