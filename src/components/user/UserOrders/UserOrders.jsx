import React, { useState } from "react";
import {
  FiPackage,
  FiTruck,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiEye,
  FiDownload,
  FiRefreshCw,
} from "react-icons/fi";
import { IoChevronBack } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import { useAppContext } from "../../../context/AppContext";

export default function UserOrders({ status }) {
  const { navigate } = useAppContext();
  const [selectedOrder, setSelectedOrder] = useState(null);

  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const statusFromURL = queryParams.get("order-status");
  const orderStatus = statusFromURL || status || "all orders";

  const allOrders = [
    {
      id: "ORD-2024-001",
      date: "2024-10-28",
      status: "processing",
      total: 299.99,
      items: [
        {
          name: "Wireless Headphones",
          quantity: 1,
          price: 149.99,
          image:
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&h=150&fit=crop",
        },
        {
          name: "Phone Case",
          quantity: 2,
          price: 75.0,
          image:
            "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=150&h=150&fit=crop",
        },
      ],
      shipping: {
        name: "John Doe",
        address: "123 Main Street, New York, NY 10001",
      },
    },
    {
      id: "ORD-2024-002",
      date: "2024-10-25",
      status: "delivered",
      total: 599.99,
      items: [
        {
          name: "Smart Watch",
          quantity: 1,
          price: 599.99,
          image:
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=150&h=150&fit=crop",
        },
      ],
      shipping: {
        name: "John Doe",
        address: "123 Main Street, New York, NY 10001",
      },
      deliveredDate: "2024-10-27",
    },
    {
      id: "ORD-2024-003",
      date: "2024-10-22",
      status: "shipped",
      total: 149.99,
      items: [
        {
          name: "Bluetooth Speaker",
          quantity: 1,
          price: 149.99,
          image:
            "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=150&h=150&fit=crop",
        },
      ],
      shipping: {
        name: "John Doe",
        address: "456 Oak Avenue, Los Angeles, CA 90001",
      },
      trackingNumber: "TRK123456789",
    },
    {
      id: "ORD-2024-004",
      date: "2024-10-20",
      status: "cancelled",
      total: 89.99,
      items: [
        {
          name: "USB Cable Pack",
          quantity: 3,
          price: 89.97,
          image:
            "https://images.unsplash.com/photo-1591290619762-4b3d0d4fa59f?w=150&h=150&fit=crop",
        },
      ],
      shipping: {
        name: "John Doe",
        address: "123 Main Street, New York, NY 10001",
      },
      cancelReason: "Customer requested cancellation",
    },
    {
      id: "ORD-2024-005",
      date: "2024-10-18",
      status: "pending",
      total: 1299.99,
      items: [
        {
          name: "Laptop",
          quantity: 1,
          price: 1299.99,
          image:
            "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=150&h=150&fit=crop",
        },
      ],
      shipping: {
        name: "John Doe",
        address: "123 Main Street, New York, NY 10001",
      },
    },
  ];

  const statusConfig = {
    all: {
      label: "All Orders",
      icon: FiPackage,
      color: "gray",
      bgColor: "bg-gray-100",
      textColor: "text-gray-700",
    },
    pending: {
      label: "Pending",
      icon: FiClock,
      color: "yellow",
      bgColor: "bg-yellow-100",
      textColor: "text-yellow-700",
    },
    processing: {
      label: "Processing",
      icon: FiRefreshCw,
      color: "blue",
      bgColor: "bg-blue-100",
      textColor: "text-blue-700",
    },
    shipped: {
      label: "Shipped",
      icon: FiTruck,
      color: "purple",
      bgColor: "bg-purple-100",
      textColor: "text-purple-700",
    },
    delivered: {
      label: "Delivered",
      icon: FiCheckCircle,
      color: "green",
      bgColor: "bg-green-100",
      textColor: "text-green-700",
    },
    cancelled: {
      label: "Cancelled",
      icon: FiXCircle,
      color: "red",
      bgColor: "bg-red-100",
      textColor: "text-red-700",
    },
  };

  const filteredOrders =
    orderStatus === "all orders"
      ? allOrders
      : allOrders.filter(
          (order) => order.status.toLowerCase() === orderStatus?.toLowerCase()
        );

  const getStatusBadge = (status) => {
    const config = statusConfig[status];
    const Icon = config.icon;
    return (
      <span
        className={`inline-flex items-center gap-1 ${config.bgColor} ${config.textColor} px-3 py-1 rounded-full text-xs font-semibold`}
      >
        <Icon size={14} />
        {config.label}
      </span>
    );
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
  };

  const closeModal = () => {
    setSelectedOrder(null);
  };

  return (
    <div className="min-h-screen md:mb-0 mb-20 p-4 sm:px-6 lg:px-8">
      <button
        onClick={() => {
          navigate("/profile");
        }}
        className="text-gray-700 md:hidden cursor-pointer hover:text-primary
                rounded-full transition"
      >
        <IoChevronBack size={24} />
      </button>
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-xl capitalize sm:text-2xl font-bold text-gray-900 mb-2">
            {orderStatus === "all orders" ? "All" : orderStatus} Orders
          </h1>
          <p className="text-gray-600 text-sm">
            Track and manage your purchases
          </p>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-xl  p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <FiPackage className="text-gray-400" size={36} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No Orders Found
            </h3>
            <p className="text-sm text-gray-600">
              You don't have any {orderStatus !== "all" ? orderStatus : ""}{" "}
              orders yet
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-lg  overflow-hidden border border-gray-200 transition-all"
              >
                <div className="p-6">
                  {/* Order Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 pb-4 border-b border-gray-200">
                    <div>
                      <h3 className=" text-sm md:text-base font-semibold text-gray-900 mb-1">
                        {order.id}
                      </h3>
                      <p className="md:text-sm text-xs text-gray-600">
                        Order Date:{" "}
                        {new Date(order.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="flex flex-col sm:items-end gap-2">
                      {getStatusBadge(order.status)}
                      <p className="md:text-lg text-sm font-semibold text-gray-700">
                        ${order.total.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Order Items Preview */}
                  <div className="space-y-4 mb-4">
                    {order.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2  md:gap-6"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-10 h-10 md:w-14 md:h-14 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-sm md:text-base  text-gray-700">
                            {item.name}
                          </h4>
                          <p className="text-xs md:text-sm text-gray-600">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                        <p className="font-semibold text-sm text-gray-900">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Additional Info */}
                  {order.trackingNumber && (
                    <div className="bg-purple-50 rounded-lg p-3 mb-4">
                      <p className="text-xs md:text-sm text-gray-700">
                        <span className="font-semibold">Tracking Number:</span>{" "}
                        {order.trackingNumber}
                      </p>
                    </div>
                  )}

                  {order.deliveredDate && (
                    <div className="bg-green-50 rounded-lg p-3 mb-4">
                      <p className="text-xs md:text-sm text-gray-700">
                        <span className="font-semibold">Delivered on:</span>{" "}
                        {new Date(order.deliveredDate).toLocaleDateString(
                          "en-US",
                          { year: "numeric", month: "long", day: "numeric" }
                        )}
                      </p>
                    </div>
                  )}

                  {order.cancelReason && (
                    <div className="bg-red-50 rounded-lg p-3 mb-4">
                      <p className="text-xs md:text-sm text-gray-700">
                        <span className="font-semibold">Cancel Reason:</span>{" "}
                        {order.cancelReason}
                      </p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => handleViewDetails(order)}
                      className="flex-1 text-xs md:text-sm bg-primary text-white py-2 px-4 rounded-lg font-semibold hover:bg-primary-dull  cursor-pointer  transition-all flex items-center justify-center gap-2"
                    >
                      <FiEye size={18} />
                      View Details
                    </button>
                    {order.status === "delivered" && (
                      <button className="flex-1 text-xs md:text-sm cursor-pointer  bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-semibold hover:bg-gray-200 transition-all flex items-center justify-center gap-2">
                        <FiDownload size={18} />
                        Download Invoice
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-gradient-to-r from-orange-600 to-amber-600 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Order Details</h2>
                <button
                  onClick={closeModal}
                  className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-full transition-all"
                >
                  <FiXCircle size={24} />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {selectedOrder.id}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {new Date(selectedOrder.date).toLocaleDateString(
                        "en-US",
                        { year: "numeric", month: "long", day: "numeric" }
                      )}
                    </p>
                  </div>
                  {getStatusBadge(selectedOrder.status)}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Order Items
                </h4>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-6 p-3 bg-gray-50 rounded-lg"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h5 className="font-medium text-gray-900">
                          {item.name}
                        </h5>
                        <p className="text-sm text-gray-600">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <p className="font-semibold text-gray-900">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Shipping Address
                </h4>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-900">
                    {selectedOrder.shipping.name}
                  </p>
                  <p className="text-gray-700">
                    {selectedOrder.shipping.address}
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-semibold text-gray-900">
                    Total Amount
                  </span>
                  <span className="text-2xl font-semibold text-orange-600">
                    ${selectedOrder.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
