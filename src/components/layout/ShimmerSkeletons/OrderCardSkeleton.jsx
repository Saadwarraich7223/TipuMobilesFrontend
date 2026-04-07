const OrderCardSkeleton = () => (
  <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
    <div className="flex justify-between items-center">
      <div className="space-y-2">
        <Shimmer className="h-4 w-32" />
        <Shimmer className="h-3 w-20 mt-1" />
      </div>
      <Shimmer className="h-5 w-12" />
    </div>

    <div className="space-y-3 mt-4">
      {[1, 2].map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <Shimmer className="w-14 h-14 rounded-xl" />
          <div className="flex-1 space-y-2">
            <Shimmer className="h-4 w-2/3" />
            <Shimmer className="h-3 w-1/3" />
          </div>
          <Shimmer className="h-4 w-12" />
        </div>
      ))}
    </div>

    <div className="flex justify-between items-center mt-4">
      <Shimmer className="h-8 w-24" />
      <Shimmer className="h-8 w-20" />
    </div>
  </div>
);
export default OrderCardSkeleton;

const Shimmer = ({ className }) => {
  return (
    <div
      className={`bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded ${className}`}
      style={{
        backgroundSize: "200% 100%",
        animation: "shimmer 1.5s infinite linear",
      }}
    />
  );
};

// Include this style somewhere global (index.css or tailwind.css)
<style>
  {`
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
`}
</style>;
