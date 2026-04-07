const OrderItemPreview = ({ item }) => {
  return (
    <div className="flex items-center gap-3 sm:gap-4 p-3 rounded-2xl border border-[#ddd4c8]/60 bg-white/70">
      <img
        src={item.image}
        alt={item.title}
        className="w-14 h-14 sm:w-20 sm:h-20 rounded-xl object-cover border border-white/70 bg-white/60"
      />
      <div className="flex-1">
        <p className="font-semibold text-sm sm:text-base text-[#171717]">
          {item.title}
        </p>
        <p className="text-[#6b5e54] text-[11px] sm:text-sm mt-1">
          Quantity: {item.quantity}
        </p>
      </div>
      <p className="font-semibold text-sm sm:text-base text-[#4f4a43]">
        Rs {item.subTotal}
      </p>
    </div>
  );
};

export default OrderItemPreview;
