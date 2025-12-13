import React from "react";
import BlogCard from "./BlogCard";

const BlogContainer = () => {
  return (
    <div className=" bg-gray-100 p-5 w-full m-2 rounded-md flex flex-col  gap-6">
      <div className="left-sec">
        <h2 className="text-[20px] font-[600]">Smart Picks & Insights</h2>
        <p className=" text-xs md:text-sm font-[400]">
          Explore expert tips, reviews, and buying guides on mobile accessories
          to enhance your tech lifestyle
        </p>
      </div>
      <section className=" bg-white">
        <div className="max-w-7xl mx-auto ">
          {/* Scrollable Product Row */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory ">
            {Array.from({ length: 20 }).map((_, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[80%] sm:w-[48%] md:w-[32%] lg:w-[22%] xl:w-[18%] snap-start"
              >
                <BlogCard />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogContainer;
