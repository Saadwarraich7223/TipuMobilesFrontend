import { motion } from "framer-motion";
import StatusBadge from "./StatusBadge";
import { FiEye, FiDownload } from "react-icons/fi";

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: "easeOut" },
  },
};

const OrderCard = ({ order, onView }) => {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -4 }}
      className="
        group bg-white rounded-2xl p-6
        shadow-sm hover:shadow-lg
        transition-shadow duration-200
      "
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-400">Order</p>
          <h3 className="text-base sm:text-lg font-medium text-gray-900 tracking-tight">
            {order.orderId}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <StatusBadge status={order.orderStatus} />
          <p className="text-base sm:text-lg font-semibold text-gray-900">
            Rs {order.grandTotal}
          </p>
        </div>
      </div>

      {/* Items */}
      <div className="space-y-4 mb-6">
        {order.orderItems.slice(0, 2).map((item) => (
          <motion.div
            key={item.product}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex items-center gap-4"
          >
            <motion.img
              src={item.image}
              alt={item.title}
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.2 }}
              className="w-14 h-14 rounded-xl object-cover bg-gray-100"
            />

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {item.title}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                Qty {item.quantity}
              </p>
            </div>

            <p className="text-sm font-medium text-gray-900">
              Rs {item.subTotal}
            </p>
          </motion.div>
        ))}

        {order.orderItems.length > 2 && (
          <p className="text-xs text-gray-400">
            + {order.orderItems.length - 2} more items
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-gray-100">
        <motion.button
          onClick={() => onView(order)}
          whileTap={{ scale: 0.96 }}
          className="
            inline-flex items-center justify-center gap-2
            rounded-full px-5 py-2
            text-sm font-medium
            bg-gray-900 text-white
            hover:bg-gray-800
            transition-colors
          "
        >
          <FiEye size={16} />
          View order
        </motion.button>

        {order.orderStatus === "delivered" && (
          <motion.button
            whileHover={{ x: 2 }}
            transition={{ duration: 0.15 }}
            className="
              inline-flex items-center gap-2
              text-sm text-gray-500
              hover:text-gray-900
              transition-colors
            "
          >
            <FiDownload size={14} />
            Download invoice
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default OrderCard;
