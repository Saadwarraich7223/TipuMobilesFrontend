import { Link } from "react-router-dom";
import { useAppContext } from "../../../context/AppContext";

const CategorySlider = () => {
  const { categories } = useAppContext();

  return (
    <section className="px-4 md:px-10 md:py-4 py-2 select-none">
      <div className="max-w-7xl mx-auto">
        {/* Scrollable Categories Row */}
        <div
          className="flex lg:items-center lg:justify-center gap-3 md:gap-5 overflow-x-auto scrollbar-hide pb-2"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {categories?.map((item, index) => (
            <Link
              to={`/products/${item.slug}`}
              key={index}
              className="scroll-snap-align-start flex-shrink-0"
            >
              <div
                className="group bg-white border border-gray-200 rounded-lg 
                shadow-sm hover:shadow-md transition-all duration-300 
                flex flex-col items-center justify-center
                p-3 md:p-4 w-[90px] h-[90px] sm:w-[100px] sm:h-[100px] md:w-[120px] md:h-[120px]
                hover:-translate-y-[2px]"
              >
                <img
                  src={item.image.url}
                  alt={item.name}
                  className="w-12 h-12 rounded-full md:w-10 md:h-10 object-contain mb-2 transition-transform duration-300 group-hover:scale-105"
                />
                <h3 className="text-[11px] sm:text-[12px] md:text-sm text-gray-700 font-medium text-center group-hover:text-primary transition">
                  {item.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySlider;
