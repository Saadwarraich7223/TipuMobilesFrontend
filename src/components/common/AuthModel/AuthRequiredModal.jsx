import { motion, AnimatePresence } from "framer-motion";
import { IoClose, IoCheckmarkCircleOutline } from "react-icons/io5";

const benefits = [
  "Track your orders in real-time",
  "Save multiple delivery addresses",
  "Faster checkout next time",
  "Exclusive offers & discounts",
];

const AuthRequiredModal = ({ isOpen, onClose, onLogin, onRegister }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            className="fixed z-50 inset-0 flex items-center justify-center px-4"
          >
            <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-6 relative">
              {/* Close */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <IoClose size={20} />
              </button>

              {/* Header */}
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                Create an account to continue
              </h2>
              <p className="text-sm text-gray-500 mb-5">
                You need an account to place an order. It only takes a minute!
              </p>

              {/* Benefits */}
              <div className="space-y-2 mb-6">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-sm text-gray-700"
                  >
                    <IoCheckmarkCircleOutline className="text-green-500" />
                    {benefit}
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button
                  onClick={onRegister}
                  className="w-full py-2.5 rounded-md bg-primary text-white font-semibold hover:bg-primary/90 transition"
                >
                  Create Account
                </button>

                <button
                  onClick={onLogin}
                  className="w-full py-2.5 rounded-md border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition"
                >
                  Already have an account? Login
                </button>

                <button
                  onClick={onClose}
                  className="w-full py-2 text-sm text-gray-500 hover:underline"
                >
                  Continue shopping
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AuthRequiredModal;
