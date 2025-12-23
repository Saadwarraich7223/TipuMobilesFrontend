import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import {
  IoCheckmarkCircle,
  IoBagCheckOutline,
  IoDownloadOutline,
  IoLogoWhatsapp,
  IoCheckmarkCircleOutline,
} from "react-icons/io5";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

const STATUS_STEPS = ["confirmed", "processing", "shipped", "delivered"];

const OrderSubmitted = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const order = state?.order;
  const [secondsLeft, setSecondsLeft] = useState(8);

  useEffect(() => {
    if (!order) navigate("/");
  }, [order, navigate]);

  useEffect(() => {
    confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
  }, []);

  useEffect(() => {
    if (!order) return;
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate(`/profile/orders`);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [order]);

  if (!order) return null;

  const activeIndex = STATUS_STEPS.indexOf(order.status || "confirmed");

  const downloadInvoice = () => {
    window.open(
      `${import.meta.env.VITE_API_URL}/orders/${order._id}/invoice`,
      "_blank"
    );
  };

  const whatsappMessage = encodeURIComponent(
    `✅ Order Confirmed!\n\nOrder ID: ${order.orderId}\nTotal: Rs ${order.totalAmount}`
  );

  return (
    <div className="min-h-screen bg-neutral-100 flex items-center justify-center md:px-4 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-6xl bg-white rounded-3xl md:shadow-[0_30px_80px_rgba(0,0,0,0.08)] overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-5">
          {/* LEFT — SUCCESS + STATUS */}
          <div className="lg:col-span-3 p-8 sm:p-10 lg:p-14">
            <div className="flex justify-center mb-4">
              <IoCheckmarkCircleOutline size={70} className="text-green-500" />
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800">
              Order Confirmed!
            </h1>

            <p className="text-center text-gray-500 mt-2">
              Redirecting to order details in{" "}
              <span className="font-semibold text-green-600">
                {secondsLeft}s
              </span>
            </p>
            <div className="mt-6">
              <span className="inline-flex rounded-full bg-green-50 px-4 py-1.5 text-sm font-medium text-green-700">
                Order ID: #{order.orderId}
              </span>
            </div>

            {/* STATUS LINE */}
            <div className="mt-12">
              <div className="mt-8 space-y-4">
                {STATUS_STEPS.map((step, index) => (
                  <div key={step} className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        index <= activeIndex ? "bg-green-500" : "bg-gray-300"
                      }`}
                    />
                    <p
                      className={`text-sm sm:text-base capitalize ${
                        index <= activeIndex
                          ? "text-gray-800 font-medium"
                          : "text-gray-400"
                      }`}
                    >
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — SUMMARY */}
          <div className="lg:col-span-2 bg-neutral-50 p-8 sm:p-10 lg:p-12 flex flex-col">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Order Summary
            </h3>

            <div className="flex-1 space-y-4 text-sm text-gray-700">
              {order.orderItems.map((item) => (
                <div key={item.product} className="flex justify-between">
                  <span className="max-w-[70%]">
                    {item.title} × {item.quantity}
                  </span>
                  <span>Rs {item.subTotal}</span>
                </div>
              ))}

              <div className="border-t pt-4 flex justify-between text-base font-semibold text-gray-900">
                <span>Total</span>
                <span className="text-green-600">Rs {order.totalAmount}</span>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="mt-10 space-y-3">
              <button
                onClick={() => navigate(`/orders/${order._id}`)}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-white font-medium hover:opacity-90"
              >
                <IoBagCheckOutline />
                Track order
              </button>

              <button
                onClick={downloadInvoice}
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-4 py-3 font-medium hover:bg-white"
              >
                <IoDownloadOutline />
                Download invoice
              </button>

              <a
                href={`https://wa.me/?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-green-500 px-4 py-3 text-white font-medium hover:bg-green-600"
              >
                <IoLogoWhatsapp />
                WhatsApp confirmation
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderSubmitted;
