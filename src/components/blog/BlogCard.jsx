import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const BlogCard = () => {
  return (
    <div className="rounded-md shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col items-center border border-gray-200 bg-white">
      <div className="w-full h-[180px] sm:h-[220px] md:h-[250px] overflow-hidden">
        <img
          src="https://solvior.themejunction.net/wp-content/uploads/2025/04/tj-blog-8.webp"
          alt="Blog Post"
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
      </div>

      <div className="info w-full px-3 sm:px-5 py-4 flex flex-col gap-3 sm:gap-4">
        {/* Date */}
        <div className="flex items-center text-xs sm:text-[13px] text-gray-400 font-medium gap-2">
          <div className="h-[2px] w-[40px] sm:w-[50px] bg-gray-400"></div>
          Apr 16, 2025
        </div>

        {/* Title & Text */}
        <div className="flex flex-col gap-1 sm:gap-1">
          <h3 className="text-base sm:text-lg  font-semibold text-gray-900 leading-snug">
            How to make your website
          </h3>
          <p className="text-xs sm:text-sm md:text-sm text-gray-600 leading-relaxed line-clamp-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quod...
          </p>
        </div>

        {/* Button */}

        <Link to="/">
          <button className="text-[11px] cursor-pointer w-15 sm:text-[13px] md:text-[14px] font-semibold text-primary bg-white hover:bg-primary hover:text-white rounded-full group border border-primary capitalize px-4 sm:px-5 py-1.5 sm:py-2 relative  transition-all">
            <ArrowRight
              size={16}
              className="text-[14px] sm:text-[18px] group-hover:-rotate-45 group-hover:translate-x-1 transition-all duration-500"
            />
            <span className="absolute top-1/2 -translate-y-1/2 right-0 text-[11px] sm:text-[12px] transition-all duration-500 group-hover:right-[-70px] opacity-0 group-hover:opacity-100 font-medium text-gray-900">
              Read More
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
