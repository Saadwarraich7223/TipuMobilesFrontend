import { motion } from "framer-motion";
import { Link } from "react-router-dom";

/**
 * Props:
 *  brands: [
 *    { id, name, logoUrl, link? },
 *    ...
 *  ]
 */

const brands = [
  {
    id: "1",
    name: "Apple",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    link: "/brands/apple",
  },
  {
    id: "2",
    name: "Samsung",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg",
    link: "/brands/samsung",
  },
  {
    id: "3",
    name: "Anker",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/9/9c/Anker_logo.svg",
    link: "/brands/anker",
  },
  {
    id: "4",
    name: "Baseus",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/5/53/Baseus_logo.png",
    link: "/brands/baseus",
  },
  {
    id: "5",
    name: "Joyroom",
    logoUrl:
      "https://seeklogo.com/images/J/joyroom-logo-7F1B0E5F7E-seeklogo.png",
    link: "/brands/joyroom",
  },
  {
    id: "6",
    name: "Sony",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/2/22/Sony_logo.svg",
    link: "/brands/sony",
  },
];

export default function FeaturedBrands() {
  // simple animation variants

  return (
    <section className="px-4 md:px-10 py-2 select-none">
      <div className="max-w-7xl mx-auto">
        <div
          className="flex pt-2 gap-4 md:gap-6 overflow-x-auto scrollbar-hide pb-3"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {brands?.map((item, index) => (
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
                    src={item.logoUrl}
                    alt={item.name}
                    className="w-10 h-q0 rounded-full md:w-9 md:h-9 object-contain"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
