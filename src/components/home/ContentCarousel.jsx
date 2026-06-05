import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Autoplay, Navigation } from "swiper/modules";

import DonutMockupImg1 from "../../assets/mockup/three-type-white-pink-chocolate-donuts-with-sprinkles-against-pink-background.webp";
import DonutMockupImg2 from "../../assets/mockup/tasty-donut-assortment-top-view.webp";
import DonutMockupImg3 from "../../assets/mockup/cute-filled-donuts-top-view.webp";
import DonutMockupImg4 from "../../assets/mockup/aerial-view-diverse-donut.webp";
import DonutMockupImg5 from "../../assets/mockup/delicious-cake-glass-assortment.webp";
import DonutMockupImg6 from "../../assets/mockup/view-delicious-glazed-donut.webp";
import DonutMockupImg7 from "../../assets/mockup/red-background-with-tasty-donut.webp";
import DonutMockupImg8 from "../../assets/mockup/bread-sandwich-with-ham.webp";


const ContentCarousel = () => {
  const mainBanners = [
    {
      url: DonutMockupImg1,
      alt: "โดนัท1",
    },
    {
      url: DonutMockupImg2,
      alt: "โดนัท2",
    },
    {
      url: DonutMockupImg3,
      alt: "โดนัท3",
    },
  ];

  const miniCollections = [
    {
      url: DonutMockupImg4,
      alt: "โดนัท4",
    },
    {
      url: DonutMockupImg5,
      alt: "โดนัท5",
    },
    {
      url: DonutMockupImg6,
      alt: "โดนัท6",
    },
    {
      url: DonutMockupImg7,
      alt: "โดนัท7",
    },
    {
     url: DonutMockupImg8,
      alt: "โดนัท8",
    },
  ];

  const clayBoxShadow =
    "shadow-[inset_6px_6px_12px_rgba(255,255,255,0.7),inset_-6px_-6px_12px_rgba(0,0,0,0.03)] shadow-[0_12px_24px_rgba(0,0,0,0.04)]";

  return (
    <div className="w-full bg-white/40 backdrop-blur-sm border-b-2 border-white/60 py-6 px-4">
      <div className="max-w-[1200px] mx-auto space-y-6">
        <Swiper
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Pagination, Autoplay, Navigation]}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          className={`h-48 sm:h-72 md:h-110 rounded-[32px] border-[4px] border-white overflow-hidden ${clayBoxShadow}`}
        >
          {mainBanners.map((item, i) => (
            <SwiperSlide key={i} className="relative w-full h-full">
              <img
                src={item.url}
                alt={item.alt}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </SwiperSlide>
          ))}
        </Swiper>

        <Swiper
          slidesPerView={2}
          spaceBetween={12}
          navigation={false}
          modules={[Autoplay]}
          autoplay={{
            delay: 2800,
            disableOnInteraction: false,
          }}
          breakpoints={{
            480: { slidesPerView: 3, spaceBetween: 12 },
            768: { slidesPerView: 4, spaceBetween: 16 },
            1024: { slidesPerView: 5, spaceBetween: 16 },
          }}
          className="h-20 sm:h-28 overflow-hidden"
        >
          {miniCollections.map((item, i) => (
            <SwiperSlide
              key={i}
              className="rounded-2xl border-2 border-white overflow-hidden shadow-sm hover:scale-[1.02] transition-transform"
            >
              <img
                className="w-full h-full object-cover object-center"
                src={item.url}
                alt={item.alt}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ContentCarousel;
