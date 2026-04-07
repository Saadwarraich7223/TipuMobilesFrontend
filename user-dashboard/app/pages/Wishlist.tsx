import { Heart, ShoppingCart, X } from "lucide-react";
import { Button } from "../components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "Wireless Headphones",
      image: "https://images.unsplash.com/photo-1695634463848-4db4e47703a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGhlYWRwaG9uZXMlMjB3aGl0ZXxlbnwxfHx8fDE3NzU0NDY4Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      price: "$89.99",
      inStock: true,
    },
    {
      id: 2,
      name: "MacBook Pro 14\"",
      image: "https://images.unsplash.com/photo-1759668358660-0d06064f0f84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsYXB0b3AlMjBjb21wdXRlcnxlbnwxfHx8fDE3NzU0OTc5NTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      price: "$1,999.00",
      inStock: true,
    },
    {
      id: 3,
      name: "Smart Watch Series 8",
      image: "https://images.unsplash.com/photo-1668069225941-37356a72faac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMHdhdGNoJTIwYmxhY2t8ZW58MXx8fHwxNzc1NDg5NTk1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      price: "$399.00",
      inStock: true,
    },
    {
      id: 4,
      name: "Running Shoes",
      image: "https://images.unsplash.com/photo-1695459468644-717c8ae17eed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydW5uaW5nJTIwc2hvZXMlMjBzbmVha2Vyc3xlbnwxfHx8fDE3NzU0MjYzNzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      price: "$129.99",
      inStock: false,
    },
    {
      id: 5,
      name: "Professional Camera",
      image: "https://images.unsplash.com/photo-1751107996077-aee030806ca5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1lcmElMjBkc2xyJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3NTQ5Nzk1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      price: "$899.00",
      inStock: true,
    },
    {
      id: 6,
      name: "Travel Backpack",
      image: "https://images.unsplash.com/photo-1763700613623-f00355b1cb7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWNrcGFjayUyMGJsYWNrJTIwbW9kZXJufGVufDF8fHx8MTc3NTQ5Nzk1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      price: "$79.99",
      inStock: true,
    },
  ]);

  const removeFromWishlist = (id: number) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id));
    toast.success("Item removed from wishlist");
  };

  const moveToCart = (id: number) => {
    // In a real app, this would add to cart
    console.log("Moving to cart:", id);
    toast.success("Item added to cart");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl">My Wishlist</h1>
        <div className="text-sm text-gray-600">
          {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"}
        </div>
      </div>

      {wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden group hover:shadow-md transition-shadow"
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                >
                  <X className="w-4 h-4 text-red-500" />
                </button>
                {!item.inStock && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs">
                    Out of Stock
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="mb-2 line-clamp-1">{item.name}</h3>
                <p className="text-xl text-blue-600 mb-4">{item.price}</p>
                <div className="flex gap-2">
                  <Button
                    onClick={() => moveToCart(item.id)}
                    disabled={!item.inStock}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl mb-2">Your Wishlist is Empty</h3>
          <p className="text-gray-600 mb-6">
            Start adding items to your wishlist to save them for later
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Continue Shopping
          </Button>
        </div>
      )}
    </div>
  );
}