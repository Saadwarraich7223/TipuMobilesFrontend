import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import OrderCard from "./OrderCard";
import OrderDetailsModal from "./OrderDetailsModal";
import { normalizeStatus } from "./orders.constants";
import orderApi from "../../../api/orderApi";
import { IoChevronBack } from "react-icons/io5";

export default function UserOrders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const { search } = useLocation();
  const navigate = useNavigate();

  const status = normalizeStatus(
    new URLSearchParams(search).get("order-status") || "all"
  );

  useEffect(() => {
    orderApi.getUserOrders().then((res) => {
      setOrders(res.orders || []);
    });
  }, []);

  const filtered =
    status === "all orders"
      ? orders
      : orders.filter((o) => o.orderStatus === status);

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <IoChevronBack size={20} className="text-gray-700" />
          </button>

          <div className="flex-1 text-center">
            <h1 className="text-xl font-semibold tracking-tight text-gray-900">
              Your Orders
            </h1>
            <p className="mt-1 text-gray-500 text-sm sm:text-base">
              Everything you’ve purchased, in one place
            </p>
          </div>

          {/* Placeholder to keep header centered */}
          <div className="w-10" />
        </div>

        {/* Orders List */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <p className="text-gray-400 text-sm">No orders found.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filtered.map((order) => (
              <OrderCard
                key={order._id}
                order={order}
                onView={setSelectedOrder}
              />
            ))}
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      <OrderDetailsModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </>
  );
}
