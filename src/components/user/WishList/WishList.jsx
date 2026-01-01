import { Heart, ShoppingCart, ChevronLeft } from "lucide-react";
import ProductCard from "../../common/ProductCard/ProductCard";
import ProductsList from "../../product/ProductList/ProductsList";

import { useAppContext } from "../../../context/AppContext";
import { useAuthContext } from "../../../context/AuthContext";

const Wishlist = () => {
  const { navigate } = useAppContext();
  const { wishList } = useAuthContext();

  return (
    <div className="min-h-screen p-4 ">
      <button
        onClick={() => {
          navigate("/profile");
        }}
        className="text-gray-700 md:hidden cursor-pointer hover:text-primary
                        rounded-full transition"
      >
        <ChevronLeft size={24} />
      </button>
      <div className=" mx-auto">
        {/* Wishlist Section */}
        <div className="mb-8">
          <h1 className="md:text-2xl text-lg font-bold text-gray-700 md:mb-2">
            My Wishlist
          </h1>
          <p className="text-gray-600">Save your favorite items for later</p>
        </div>

        {wishList.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
              <Heart className="text-gray-400" size={40} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Your Wishlist is Empty
            </h3>
            <p className="text-gray-600 mb-6">
              Start adding items you love to your wishlist
            </p>
            <button className="bg-gradient-to-r from-rose-600 to-pink-600 text-white py-3 px-8 rounded-lg font-semibold hover:from-rose-700 hover:to-pink-700 transition-all inline-flex items-center gap-2 shadow-lg hover:shadow-xl">
              <ShoppingCart size={20} />
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {wishList.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        )}

        {/* Recommended Products Section */}
        <div className="mt-12 w-full">
          <h2 className="md:text-2xl text-lg font-bold text-gray-700 mb-4">
            Recommended For You
          </h2>
          <div className="">
            <ProductsList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
