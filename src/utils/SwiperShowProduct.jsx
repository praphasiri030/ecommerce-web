import { Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Autoplay, Navigation } from "swiper/modules";

const SwiperShowProduct = ({ children }) => {
  return (
    <Swiper
      slidesPerView={2}
      spaceBetween={12}
      pagination={{ clickable: true, dynamicBullets: true }}
      navigation={true}
      modules={[Pagination, Autoplay, Navigation]}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      breakpoints={{
        360: {
          slidesPerView: 2,
          spaceBetween: 12,
        },
        540: {
          slidesPerView: 2.5,
          spaceBetween: 16,
        },
        728: {
          slidesPerView: 3.5,
          spaceBetween: 16,
        },
        900: {
          slidesPerView: 4.5,
          spaceBetween: 16,
        },
        1140: {
          slidesPerView: 5.5,
          spaceBetween: 18,
        },
      }}
      className="pb-12 pt-2 px-1 overflow-hidden"
    >
      {children}
    </Swiper>
  );
};

export default SwiperShowProduct;