import {
  FiPackage,
  FiTruck,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiRefreshCw,
} from "react-icons/fi";

export const ORDER_STATUSES = {
  all: {
    label: "All Orders",
    icon: FiPackage,
    bg: "bg-gray-100",
    text: "text-gray-700",
  },
  pending: {
    label: "Pending",
    icon: FiClock,
    bg: "bg-yellow-100",
    text: "text-yellow-700",
  },
  processing: {
    label: "Processing",
    icon: FiRefreshCw,
    bg: "bg-blue-100",
    text: "text-blue-700",
  },
  shipped: {
    label: "Shipped",
    icon: FiTruck,
    bg: "bg-purple-100",
    text: "text-purple-700",
  },
  delivered: {
    label: "Delivered",
    icon: FiCheckCircle,
    bg: "bg-green-100",
    text: "text-green-700",
  },
  cancelled: {
    label: "Cancelled",
    icon: FiXCircle,
    bg: "bg-red-100",
    text: "text-red-700",
  },
};

export const normalizeStatus = (status = "all") => status.toLowerCase().trim();
