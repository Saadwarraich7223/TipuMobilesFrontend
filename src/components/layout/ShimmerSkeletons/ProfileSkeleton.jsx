const ProfileSkeleton = () => {
  return (
    <div className="lg:grid lg:grid-cols-3 lg:gap-6 lg:p-6 lg:max-w-7xl lg:mx-auto">
      {/* Profile Card */}
      <div className="lg:col-span-1">
        <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 animate-pulse space-y-4">
          <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto" />
          <div className="h-5 bg-gray-200 rounded w-3/4 mx-auto" />
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
          <div className="space-y-2 mt-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-8 bg-gray-200 rounded w-full" />
            ))}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="col-span-2 space-y-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-20 bg-white shadow rounded-xl animate-pulse w-full"
          />
        ))}
      </div>
    </div>
  );
};

export default ProfileSkeleton;
