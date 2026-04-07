import { useEffect, useState } from "react";
import { X } from "lucide-react";
import StatusBadge from "./StatusBadge";
import OrderItemPreview from "./OrderItemPreview";

const OrderDetailsModal = ({ order, onClose }) => {
  const [visible, setVisible] = useState(false);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 200);
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

  const shippingInfo = order.shippingInfo || {};

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4 transition-opacity duration-200 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleClose}
    >
      <div
        className={`w-full max-w-3xl bg-white/90 backdrop-blur-xl rounded-3xl shadow-[0_30px_80px_rgba(23,23,23,0.18)] max-h-[90vh] flex flex-col border border-[#ddd4c8]/60 transform transition-all duration-200 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-4 sm:px-6 py-4 sm:py-5 flex items-start justify-between border-b border-[#e6ded4]">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-wide text-[#8a6b47]/70">
              Order
            </p>
            <h2 className="text-base sm:text-lg font-semibold text-[#171717]">
              {order.orderId}
            </h2>
            <StatusBadge status={order.orderStatus} />
          </div>

          <button
            onClick={handleClose}
            className="rounded-full p-2 text-[#8a6b47] hover:bg-white/70 transition border border-[#ddd4c8]/60"
          >
            <X size={16} className="sm:w-[18px] sm:h-[18px]" />
          </button>
        </div>

        <div className="px-4 sm:px-6 py-4 sm:py-6 flex-1 overflow-y-auto space-y-6 sm:space-y-8">
          <section>
            <h3 className="text-sm font-semibold mb-3 sm:mb-4 text-[#171717]">
              Items in this order
            </h3>
            <div className="space-y-3 sm:space-y-4">
              {order.orderItems.map((item) => (
                <OrderItemPreview key={item.product} item={item} />
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-sm font-semibold mb-3 sm:mb-4 text-[#171717]">
              Shipping details
            </h3>
            <div className="rounded-2xl bg-white/70 border border-[#ddd4c8]/60 px-4 sm:px-5 py-3 sm:py-4">
              <p className="text-sm font-semibold text-[#171717]">
                {shippingInfo.fullName || "—"}
              </p>
              <p className="mt-1 text-xs sm:text-sm text-[#6b5e54] leading-relaxed">
                {shippingInfo.addressLine1 || "—"}
                {shippingInfo.addressLine2 && (
                  <>
                    <br />
                    {shippingInfo.addressLine2}
                  </>
                )}
              </p>
            </div>
          </section>
        </div>

        <div className="px-4 sm:px-6 py-4 sm:py-5 bg-white/70 border-t border-[#e6ded4] flex items-center justify-between">
          <p className="text-xs sm:text-sm text-[#6b5e54]">Total amount</p>
          <p className="text-base sm:text-lg font-bold text-[#171717]">
            Rs {order.grandTotal}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
