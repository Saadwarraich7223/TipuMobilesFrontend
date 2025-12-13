import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Pagination, Autoplay } from "swiper/modules";

const MainBanner = () => {
  const images = [
    "https://api.spicezgold.com/download/file_1734524985581_NewProject(11).jpg",
    "https://api.spicezgold.com/download/file_1734525014348_NewProject(7).jpg",
    "https://api.spicezgold.com/download/file_1734524930884_NewProject(6).jpg",
    "https://api.spicezgold.com/download/file_1734524971122_NewProject(8).jpg",
    "https://api.spicezgold.com/download/file_1734525002307_1723967638078_slideBanner1.6bbeed1a0c8ffb494f7c.jpg",
  ];
  return (
    <div className="homeslider py-2 select-none">
      <div className="container">
        <Swiper
          spaceBetween={15}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
        >
          {images.map((src, i) => (
            <SwiperSlide key={i}>
              <div className="item rounded-2xl overflow-hidden shadow-lg transition-transform duration-500 hover:scale-[1.02]">
                <img
                  src={src}
                  alt={`banner-${i}`}
                  className="w-full h-[150px]  md:h-[300px] object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default MainBanner;
