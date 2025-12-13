export default function AddressSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm animate-pulse">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gray-200 rounded-lg" />
        <div className="h-4 bg-gray-200 rounded w-32" />
      </div>

      <div className="space-y-2">
        <div className="h-3 bg-gray-200 rounded w-40" />
        <div className="h-3 bg-gray-200 rounded w-48" />
        <div className="h-3 bg-gray-200 rounded w-56" />
        <div className="h-3 bg-gray-200 rounded w-32" />
      </div>

      <div className="mt-5 space-y-2">
        <div className="h-9 bg-gray-200 rounded" />
        <div className="h-9 bg-gray-200 rounded" />
      </div>
    </div>
  );
}
