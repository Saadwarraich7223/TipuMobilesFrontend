import { Eye, Truck, Package } from "lucide-react";

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

export default function OrderCard({ order, onView }) {
  const firstItem = order.orderItems?.[0];
  const status = order.orderStatus || "processing";

  return (
    <div className="surface-raised rounded-2xl border-[#ddd4c8]/60 p-4 sm:p-6 hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <img
          src={firstItem?.image || "/image.png"}
          alt={firstItem?.title || "Order item"}
          className="w-full sm:w-24 h-24 object-cover rounded-xl border border-white/70 bg-white/60"
        />
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
            <div>
              <h3 className="mb-1">{firstItem?.title || "Order item"}</h3>
              <p className="text-sm text-gray-600">Order ID: {order.orderId}</p>
              <p className="text-sm text-gray-600">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="text-left sm:text-right">
              <p className="mb-2 text-sm sm:text-base text-[#171717] font-semibold">
                Rs {order.grandTotal}
              </p>
              <span
                className={`inline-block px-2.5 py-1 rounded-full text-[10px] sm:text-xs ${statusStyles(
                  status,
                )}`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-3 sm:mt-4">
            <button
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-[#ddd4c8]/70 text-xs sm:text-sm text-[#4f4a43] hover:bg-white/70"
              onClick={() => onView(order)}
            >
              <Eye className="w-4 h-4" />
              View Details
            </button>
            {(status === "shipped" || status === "delivered") && (
              <button className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-[#ddd4c8]/70 text-xs sm:text-sm text-[#4f4a43] hover:bg-white/70">
                <Truck className="w-4 h-4" />
                Track Order
              </button>
            )}
            {status === "delivered" && (
              <button className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-[#ddd4c8]/70 text-xs sm:text-sm text-[#4f4a43] hover:bg-white/70">
                <Package className="w-4 h-4" />
                Reorder
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
