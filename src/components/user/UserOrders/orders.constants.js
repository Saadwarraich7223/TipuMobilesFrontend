import {
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw,
} from "lucide-react";

export const ORDER_STATUSES = {
  all: {
    label: "All Orders",
    icon: Package,
    bg: "bg-gray-100",
    text: "text-gray-700",
  },
  pending: {
    label: "Pending",
    icon: Clock,
    bg: "bg-yellow-100",
    text: "text-yellow-700",
  },
  processing: {
    label: "Processing",
    icon: RefreshCw,
    bg: "bg-blue-100",
    text: "text-blue-700",
  },
  shipped: {
    label: "Shipped",
    icon: Truck,
    bg: "bg-purple-100",
    text: "text-purple-700",
  },
  delivered: {
    label: "Delivered",
    icon: CheckCircle,
    bg: "bg-green-100",
    text: "text-green-700",
  },
  cancelled: {
    label: "Cancelled",
    icon: XCircle,
    bg: "bg-red-100",
    text: "text-red-700",
  },
};

export const normalizeStatus = (status = "all") => status.toLowerCase().trim();
