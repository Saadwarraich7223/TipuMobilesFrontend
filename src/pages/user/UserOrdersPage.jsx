import React from "react";
import UserOrders from "../../components/user/UserOrders/UserOrders";

const UserOrdersPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-2 sm:px-6 lg:px-8 py-4">
        <UserOrders />
      </div>
    </div>
  );
};

export default UserOrdersPage;
