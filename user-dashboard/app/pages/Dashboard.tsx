import { Package, Heart, MapPin, ShoppingCart } from "lucide-react";
import { Link } from "react-router";
import { motion } from "motion/react";

export default function Dashboard() {
  const stats = [
    {
      title: "Total Orders",
      value: "24",
      icon: Package,
      color: "bg-blue-500",
      link: "/orders",
    },
    {
      title: "Wishlist Items",
      value: "8",
      icon: Heart,
      color: "bg-pink-500",
      link: "/wishlist",
    },
    {
      title: "Saved Addresses",
      value: "3",
      icon: MapPin,
      color: "bg-green-500",
      link: "/addresses",
    },
    {
      title: "Cart Items",
      value: "5",
      icon: ShoppingCart,
      color: "bg-purple-500",
      link: "#",
    },
  ];

  const recentOrders = [
    {
      id: "ORD-2024-001",
      product: "Wireless Headphones",
      date: "April 2, 2026",
      status: "Delivered",
      price: "$89.99",
      image: "https://images.unsplash.com/photo-1695634463848-4db4e47703a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGhlYWRwaG9uZXMlMjB3aGl0ZXxlbnwxfHx8fDE3NzU0NDY4Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: "ORD-2024-002",
      product: "MacBook Pro 14\"",
      date: "April 1, 2026",
      status: "Shipped",
      price: "$1,999.00",
      image: "https://images.unsplash.com/photo-1759668358660-0d06064f0f84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsYXB0b3AlMjBjb21wdXRlcnxlbnwxfHx8fDE3NzU0OTc5NTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: "ORD-2024-003",
      product: "Smart Watch Series 8",
      date: "March 30, 2026",
      status: "Processing",
      price: "$399.00",
      image: "https://images.unsplash.com/photo-1668069225941-37356a72faac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMHdhdGNoJTIwYmxhY2t8ZW58MXx8fHwxNzc1NDg5NTk1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-700";
      case "shipped":
        return "bg-blue-100 text-blue-700";
      case "processing":
        return "bg-yellow-100 text-yellow-700";
      case "pending":
        return "bg-orange-100 text-orange-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.title}
              to={stat.link}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl mt-1">{stat.value}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b flex items-center justify-between">
          <h2 className="text-xl">Recent Orders</h2>
          <Link
            to="/orders"
            className="text-blue-600 hover:text-blue-700 text-sm"
          >
            View All
          </Link>
        </div>
        <div className="divide-y">
          {recentOrders.map((order) => (
            <div
              key={order.id}
              className="p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <img
                  src={order.image}
                  alt={order.product}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="mb-1">{order.product}</h3>
                  <p className="text-sm text-gray-600">
                    Order ID: {order.id} • {order.date}
                  </p>
                </div>
                <div className="text-right">
                  <p className="mb-1">{order.price}</p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-sm p-6 text-white">
          <h3 className="text-xl mb-2">Shop New Arrivals</h3>
          <p className="text-blue-100 mb-4">
            Discover the latest products and exclusive deals
          </p>
          <button className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
            Browse Now
          </button>
        </div>
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl shadow-sm p-6 text-white">
          <h3 className="text-xl mb-2">Get Premium Membership</h3>
          <p className="text-purple-100 mb-4">
            Enjoy free shipping and exclusive member benefits
          </p>
          <button className="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50 transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </motion.div>
  );
}