import toast from "react-hot-toast";
// import { placeOrder } from "../../../api/order.api";

const PlaceOrderButton = ({ addressId }) => {
  const handlePlaceOrder = async () => {
    if (!addressId) return toast.error("Select address");

    try {
      await placeOrder({ addressId, paymentMethod: "COD" });
      toast.success("Order placed successfully 🎉");
    } catch {
      toast.error("Failed to place order");
    }
  };

  return (
    <button
      //   onClick={handlePlaceOrder}
      className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
    >
      Place Order
    </button>
  );
};

export default PlaceOrderButton;
