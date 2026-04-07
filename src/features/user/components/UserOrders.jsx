import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Package } from "lucide-react";

import OrderCard from "./OrderCard";
import OrderDetailsModal from "./OrderDetailsModal";
import orderApi from "../api/orderApi";
import OrderCardSkeleton from "../../../components/layout/ShimmerSkeletons/OrderCardSkeleton";

const TABS = [
  { value: "all", label: "All Orders" },
  { value: "pending", label: "Pending" },
  { value: "processing", label: "Processing" },
  { value: "shipped", label: "Shipped" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
];

export default function UserOrders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const { search } = useLocation();

  const statusParam =
    new URLSearchParams(search).get("order-status") || "all";

  useEffect(() => {
    setLoading(true);
    orderApi
      .getUserOrders()
      .then((res) => {
        setOrders(res.orders || []);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredOrders = useMemo(() => {
    if (statusParam === "all") return orders;
    return orders.filter((order) => order.orderStatus === statusParam);
  }, [orders, statusParam]);

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl md:text-3xl text-[#171717]">
            My Orders
          </h1>
          <div className="text-xs sm:text-sm text-[#6b5e54]">
            {filteredOrders.length}{" "}
            {filteredOrders.length === 1 ? "order" : "orders"}
          </div>
        </div>

        <div className="surface-raised rounded-2xl border-[#ddd4c8]/60 p-1.5 sm:p-2">
          <div className="flex flex-wrap gap-2">
            {TABS.map((tab) => {
              const isActive =
                tab.value === "all"
                  ? statusParam === "all"
                  : statusParam === tab.value;
              const tabLink =
                tab.value === "all"
                  ? "/profile/orders"
                  : `/profile/orders?order-status=${tab.value}`;

              return (
                <Link
                  key={tab.value}
                  to={tabLink}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-sm transition-colors ${
                    isActive
                      ? "bg-[#171717] text-white"
                      : "text-[#6b5e54] hover:bg-white/70"
                  }`}
                >
                  {tab.label}
                </Link>
              );
            })}
          </div>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <OrderCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredOrders.length > 0 ? (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <OrderCard key={order._id} order={order} onView={setSelectedOrder} />
            ))}
          </div>
        ) : (
          <div className="surface-raised rounded-2xl border-[#ddd4c8]/60 p-8 sm:p-12 text-center">
            <Package className="w-12 h-12 sm:w-16 sm:h-16 text-[#8a6b47]/60 mx-auto mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl mb-2 text-[#171717]">
              No Orders Found
            </h3>
            <p className="text-sm sm:text-base text-[#6b5e54]">
              You don't have any {statusParam} orders at the moment.
            </p>
          </div>
        )}
      </div>

      <OrderDetailsModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </>
  );
}
