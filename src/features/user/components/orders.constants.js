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
    bg: "bg-white/70 border-[#ddd4c8]/70",
    text: "text-[#4f4a43]",
  },
  pending: {
    label: "Pending",
    icon: Clock,
    bg: "bg-[#f6f1e7] border-[#eadfce]",
    text: "text-[#8a6b47]",
  },
  processing: {
    label: "Processing",
    icon: RefreshCw,
    bg: "bg-[#eaf1f6] border-[#d7e3ec]",
    text: "text-[#446b8a]",
  },
  shipped: {
    label: "Shipped",
    icon: Truck,
    bg: "bg-[#eaf4f0] border-[#d6e8df]",
    text: "text-[#3d6b5a]",
  },
  delivered: {
    label: "Delivered",
    icon: CheckCircle,
    bg: "bg-[#f4f1e4] border-[#e7ddc0]",
    text: "text-[#7b6a2f]",
  },
  cancelled: {
    label: "Cancelled",
    icon: XCircle,
    bg: "bg-[#f7e9e9] border-[#ecd2d2]",
    text: "text-[#8a3f3f]",
  },
};

export const normalizeStatus = (status = "all") => status.toLowerCase().trim();
