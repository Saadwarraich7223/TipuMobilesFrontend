import { useParams, Link } from "react-router";
import { Eye, Truck, Package } from "lucide-react";
import { Button } from "../components/ui/button";

export default function Orders() {
  const { status } = useParams();

  const allOrders = [
    {
      id: "ORD-2024-001",
      product: "Wireless Headphones",
      image: "https://images.unsplash.com/photo-1695634463848-4db4e47703a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGhlYWRwaG9uZXMlMjB3aGl0ZXxlbnwxfHx8fDE3NzU0NDY4Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      date: "April 2, 2026",
      price: "$89.99",
      status: "delivered",
    },
    {
      id: "ORD-2024-002",
      product: "MacBook Pro 14\"",
      image: "https://images.unsplash.com/photo-1759668358660-0d06064f0f84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsYXB0b3AlMjBjb21wdXRlcnxlbnwxfHx8fDE3NzU0OTc5NTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      date: "April 1, 2026",
      price: "$1,999.00",
      status: "shipped",
    },
    {
      id: "ORD-2024-003",
      product: "Smart Watch Series 8",
      image: "https://images.unsplash.com/photo-1668069225941-37356a72faac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMHdhdGNoJTIwYmxhY2t8ZW58MXx8fHwxNzc1NDg5NTk1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      date: "March 30, 2026",
      price: "$399.00",
      status: "processing",
    },
    {
      id: "ORD-2024-004",
      product: "Running Shoes",
      image: "https://images.unsplash.com/photo-1695459468644-717c8ae17eed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydW5uaW5nJTIwc2hvZXMlMjBzbmVha2Vyc3xlbnwxfHx8fDE3NzU0MjYzNzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      date: "March 28, 2026",
      price: "$129.99",
      status: "pending",
    },
    {
      id: "ORD-2024-005",
      product: "Professional Camera",
      image: "https://images.unsplash.com/photo-1751107996077-aee030806ca5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1lcmElMjBkc2xyJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3NTQ5Nzk1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      date: "March 25, 2026",
      price: "$899.00",
      status: "cancelled",
    },
    {
      id: "ORD-2024-006",
      product: "Travel Backpack",
      image: "https://images.unsplash.com/photo-1763700613623-f00355b1cb7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWNrcGFjayUyMGJsYWNrJTIwbW9kZXJufGVufDF8fHx8MTc3NTQ5Nzk1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      date: "March 20, 2026",
      price: "$79.99",
      status: "delivered",
    },
  ];

  const filteredOrders = status
    ? allOrders.filter((order) => order.status === status)
    : allOrders;

  const getStatusColor = (orderStatus: string) => {
    switch (orderStatus) {
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

  const tabs = [
    { value: "all", label: "All Orders", path: "/orders" },
    { value: "pending", label: "Pending", path: "/orders/pending" },
    { value: "processing", label: "Processing", path: "/orders/processing" },
    { value: "shipped", label: "Shipped", path: "/orders/shipped" },
    { value: "delivered", label: "Delivered", path: "/orders/delivered" },
    { value: "cancelled", label: "Cancelled", path: "/orders/cancelled" },
  ];

  const OrderCard = ({ order }: { order: typeof allOrders[0] }) => (
    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row gap-4">
        <img
          src={order.image}
          alt={order.product}
          className="w-full sm:w-24 h-24 object-cover rounded-lg"
        />
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
            <div>
              <h3 className="mb-1">{order.product}</h3>
              <p className="text-sm text-gray-600">Order ID: {order.id}</p>
              <p className="text-sm text-gray-600">{order.date}</p>
            </div>
            <div className="text-left sm:text-right">
              <p className="mb-2">{order.price}</p>
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs ${getStatusColor(
                  order.status
                )}`}
              >
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              View Details
            </Button>
            {(order.status === "shipped" || order.status === "delivered") && (
              <Button variant="outline" size="sm">
                <Truck className="w-4 h-4 mr-2" />
                Track Order
              </Button>
            )}
            {order.status === "delivered" && (
              <Button variant="outline" size="sm">
                <Package className="w-4 h-4 mr-2" />
                Reorder
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl">My Orders</h1>
        <div className="text-sm text-gray-600">
          {filteredOrders.length} {filteredOrders.length === 1 ? "order" : "orders"}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-xl shadow-sm p-2">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <Link
              key={tab.value}
              to={tab.path}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                (status === tab.value || (!status && tab.value === "all"))
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => <OrderCard key={order.id} order={order} />)
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl mb-2">No Orders Found</h3>
            <p className="text-gray-600">
              You don't have any {status} orders at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
