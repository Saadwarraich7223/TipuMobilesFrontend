const OrderItemPreview = ({ item }) => {
  return (
    <div className="flex items-center gap-4 p-3 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
      <img
        src={item.image}
        alt={item.title}
        className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border border-gray-100"
      />
      <div className="flex-1">
        <p className="font-semibold text-gray-900 text-sm sm:text-base">
          {item.title}
        </p>
        <p className="text-gray-500 text-xs sm:text-sm mt-1">
          Quantity: {item.quantity}
        </p>
      </div>
      <p className="font-semibold text-gray-800 text-sm sm:text-base">
        Rs {item.subTotal}
      </p>
    </div>
  );
};

export default OrderItemPreview;
