import { useEffect, useState } from "react";
import bannersApi from "../../../api/bannersApi";
import { cld } from "../../../utlis/CloudinaryImageSizeReducer/cloudinary";

const FALLBACK_LCP_IMAGE =
  "https://res.cloudinary.com/dti1kpfhi/image/upload/f_auto,q_auto,w_1200/banner/rok6xnrhdqbvyo2ot8rc.webp";

const runWhenIdle = (cb) => {
  if ("requestIdleCallback" in window) {
    requestIdleCallback(cb);
  } else {
    setTimeout(cb, 1);
  }
};

const MainBanner = () => {
  const [banners, setBanners] = useState([]);
  const [Swiper, setSwiper] = useState(null);
  const [SwiperSlide, setSwiperSlide] = useState(null);
  const [swiperModules, setSwiperModules] = useState([]);

  useEffect(() => {
    runWhenIdle(() => {
      bannersApi
        .get("/", { params: { position: "top", isActive: true } })
        .then((res) => setBanners(res.data || []))
        .catch(console.error);
    });
  }, []);

  useEffect(() => {
    if (!banners.length) return;

    runWhenIdle(async () => {
      const swiperReact = await import("swiper/react");
      const swiperModules = await import("swiper/modules");

      await import("swiper/css");
      await import("swiper/css/pagination");

      setSwiper(() => swiperReact.Swiper);
      setSwiperSlide(() => swiperReact.SwiperSlide);
      setSwiperModules([swiperModules.Pagination, swiperModules.Autoplay]);
    });
  }, [banners]);

  return (
    <section className="px-2 py-2 overflow-hidden select-none">
      {!Swiper && (
        <div className="relative w-full aspect-[16/9] sm:aspect-[3/1] lg:aspect-[4/1] rounded-2xl overflow-hidden shadow-lg">
          <img
            src={FALLBACK_LCP_IMAGE}
            alt="Main Banner"
            width="1200"
            height="300"
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      )}

      {Swiper && SwiperSlide && banners.length > 0 && (
        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          loop={banners.length > 2}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true, dynamicBullets: true }}
          modules={swiperModules}
          className="mt-3"
        >
          {banners.map((banner, i) => (
            <SwiperSlide key={banner._id || i}>
              <div className="relative w-full aspect-[16/9] sm:aspect-[3/1] lg:aspect-[4/1] rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={cld(banner.image.url, "f_auto,q_auto,w_1200")}
                  srcSet={`
                       ${cld(banner.image.url, "f_auto,q_auto,w_480")} 480w,
                       ${cld(banner.image.url, "f_auto,q_auto,w_768")} 768w,
                       ${cld(banner.image.url, "f_auto,q_auto,w_1200")} 1200w
                       `}
                  sizes="(max-width: 768px) 100vw, 1200px"
                  alt={`banner-${i}`}
                  width="1200"
                  height="300"
                  loading={i === 0 ? "eager" : "lazy"}
                  fetchPriority={i === 0 ? "high" : "auto"}
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
};

export default MainBanner;
