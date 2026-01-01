import { Link } from "react-router-dom";
import { useAppContext } from "../../../context/AppContext";

const CategorySlider = () => {
  const { categories } = useAppContext();

  return (
    <section className="px-4 md:px-10 py-2 select-none">
      <div className="max-w-7xl mx-auto">
        <div
          className="flex pt-2 gap-4 md:gap-6 overflow-x-auto scrollbar-hide pb-3"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {categories?.map((item, index) => (
            <Link
              to={`/products/${item.slug}`}
              key={index}
              className="flex-shrink-0 scroll-snap-align-start"
            >
              <div
                className="
                  group
                  bg-white
                  border border-gray-200
                  rounded-xl
                  p-4
                  w-[96px] h-[110px]
                  sm:w-[110px] sm:h-[125px]
                  md:w-[130px] md:h-[145px]
                  flex flex-col items-center justify-between
                  transition-all duration-300 ease-out
                  hover:border-primary/30
                  hover:shadow-lg
                  hover:-translate-y-1
                "
              >
                <div
                  className="
                    w-12 h-12 md:w-14 md:h-14
                    rounded-full
                    bg-gray-50
                    flex items-center justify-center
                    transition-transform duration-300
                    group-hover:scale-105
                  "
                >
                  <img
                    src={`https://res.cloudinary.com/dti1kpfhi/image/upload/f_auto,q_auto,w_112,h_112,c_fill/${item.image.public_id}`}
                    alt={item.name}
                    className="w-12 h-12 md:w-14 md:h-14 object-contain rounded-full"
                    width="48" // Explicit width for smaller screens (12 * 4px = 48px)
                    height="48" // Explicit height for smaller screens (12 * 4px = 48px)
                  />
                </div>

                <h3
                  className="
                    text-xs md:text-sm
                    font-medium
                    text-gray-700
                    text-center
                    leading-tight
                    group-hover:text-primary
                    transition-colors
                  "
                >
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
