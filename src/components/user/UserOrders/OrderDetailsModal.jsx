import { useState, useEffect } from "react";
import StatusBadge from "./StatusBadge";
import OrderItemPreview from "./OrderItemPreview";
import { X } from "lucide-react";

const OrderDetailsModal = ({ order, onClose }) => {
  const [visible, setVisible] = useState(false);

  const handleClose = () => {
    setVisible(false);

    setTimeout(onClose, 300);
  };
  useEffect(() => {
    if (order) {
      setVisible(true);
      document.body.classList.add("overflow-hidden");
    } else {
      setVisible(false);
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [order]);
  if (!order) return null;

  return (
    <div
      className={`fixed  inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4 transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleClose}
    >
      <div
        className={`
          w-full max-w-3xl
          bg-white rounded-3xl shadow-xl max-h-[90vh] flex flex-col
          transform transition-all duration-300
          ${visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 sm:px-8 py-6 flex items-start justify-between flex-shrink-0">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-wide text-gray-400">
              Order
            </p>
            <h2 className="text-md  sm:text-lg font-medium text-gray-900">
              {order.orderId}
            </h2>
            <div className="mt-2">
              <StatusBadge status={order.orderStatus} />
            </div>
          </div>

          <button
            onClick={handleClose}
            className="rounded-full p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100 flex-shrink-0" />

        {/* Scrollable Content */}
        <div className="px-6 sm:px-8 py-6 flex-1 overflow-y-auto space-y-8">
          {/* Items */}
          <section>
            <h3 className="text-sm font-medium text-gray-900 mb-4">
              Items in this order
            </h3>
            <div className="space-y-4">
              {order.orderItems.map((item) => (
                <OrderItemPreview key={item.product} item={item} />
              ))}
            </div>
          </section>

          {/* Shipping */}
          <section>
            <h3 className="text-sm font-medium text-gray-900 mb-4">
              Shipping details
            </h3>
            <div className="rounded-2xl bg-gray-50 px-5 py-4">
              <p className="text-sm font-medium text-gray-900">
                {order.shippingInfo.fullName}
              </p>
              <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                {order.shippingInfo.addressLine1}
                {order.shippingInfo.addressLine2 && (
                  <>
                    <br />
                    {order.shippingInfo.addressLine2}
                  </>
                )}
              </p>
            </div>
          </section>
        </div>

        {/* Footer / Total */}
        <div className="px-6 sm:px-8 py-6 bg-gray-50 flex items-center justify-between flex-shrink-0">
          <p className="text-sm text-gray-600">Total amount</p>
          <p className="text-lg font-semibold text-gray-900">
            Rs {order.grandTotal}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
