import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { EffectFade, Pagination, Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";

const slidesData = [
  {
    image:
      "https://serviceapi.spicezgold.com/download/1742441193376_1737037654953_New_Project_45.jpg",
    title: "Big Savings On Sale Days",
    subtitle: "Sales On Mobile Phone Accessories",
    price: "Rs 499",
    path: "/products/accessories",
  },
  {
    image:
      "https://cdn.pixabay.com/photo/2017/12/04/06/00/watch-2996385_640.jpg",
    title: "Big Savings On Sale Days",
    subtitle: "Best Deals On Smart Watches",
    price: "Rs 999",
    path: "/products/watches",
  },
  {
    image:
      "https://cdn.pixabay.com/photo/2017/08/14/06/04/earphone-2639487_640.jpg",
    title: "Big Savings On Sale Days",
    subtitle: "Exclusive Offers On Earphones",
    price: "Rs 799",
    path: "/products/earphones",
  },
];

const Adds1 = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  return (
    <div className="px-4">
      <Swiper
        spaceBetween={30}
        effect="fade"
        loop
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        modules={[EffectFade, Pagination, Autoplay]}
        className="secondSlider h-[320px] sm:h-[380px] md:h-[350px]  rounded-xl overflow-hidden"
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {slidesData.map((slide, idx) => {
          const isActive = activeIndex === idx;

          return (
            <SwiperSlide key={idx}>
              <div className="relative w-full h-full">
                {/* Background Image */}
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Subtle Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-10 lg:px-16 text-white z-10">
                  <div
                    className={`transition-all duration-700 ${
                      isActive
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-6"
                    }`}
                  >
                    <h4 className="text-sm sm:text-base md:text-lg font-medium tracking-wide uppercase text-gray-200">
                      {slide.title}
                    </h4>

                    <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-extrabold leading-tight mt-2">
                      {slide.subtitle}
                    </h2>

                    <p className="text-base sm:text-lg md:text-xl font-semibold mt-2">
                      Starting From{" "}
                      <span className="text-primary text-xl sm:text-2xl md:text-2xl font-extrabold">
                        {slide.price}
                      </span>
                    </p>

                    <button
                      onClick={() => navigate(slide.path)}
                      className="mt-8 inline-block bg-primary hover:bg-primary/90 text-white font-semibold text-sm sm:text-base md:text-lg tracking-wide py-2.5 sm:py-3 px-6 sm:px-8 rounded-md shadow-lg hover:shadow-xl transition-all cursor-pointer duration-300"
                    >
                      Shop Now
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Adds1;
