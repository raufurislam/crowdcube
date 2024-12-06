import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "animate.css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

const Banner = () => {
  const [slides] = useState([
    {
      id: 1,
      title: "Empower Dreams, One Contribution at a Time",
      description:
        "Join us in transforming lives by contributing to meaningful campaigns. Every small step leads to a big change.",
      image:
        "https://i.ibb.co.com/WK59yTp/sad-tiny-man-sitting-on-huge-lightbulb-flat-vector-illustration-Converted-01.png",
    },
    {
      id: 2,
      title: "Support Community Growth",
      description:
        "Help grassroots projects thrive and create a lasting impact. Together, we can make a difference.",
      image:
        "https://i.ibb.co.com/qg1wZjn/sad-tiny-man-sitting-on-huge-lightbulb-flat-vector-illustration-Converted-02.png",
    },
    {
      id: 3,
      title: "Your Contribution Matters",
      description:
        "Each donation brings us closer to achieving the goals of countless individuals and organizations.",
      image:
        "https://i.ibb.co.com/WzwsYyC/sad-tiny-man-sitting-on-huge-lightbulb-flat-vector-illustration-Converted-03.png",
    },
    {
      id: 4,
      title: "Join the Movement for Change",
      description:
        "Be a part of something greater. Explore campaigns that align with your values and aspirations.",
      image:
        "https://i.ibb.co.com/WK0mBVW/sad-tiny-man-sitting-on-huge-lightbulb-flat-vector-illustration-Converted-04.png",
    },
  ]);

  // https://i.ibb.co.com/WK59yTp/sad-tiny-man-sitting-on-huge-lightbulb-flat-vector-illustration-Converted-01.png
  // https://i.ibb.co.com/qg1wZjn/sad-tiny-man-sitting-on-huge-lightbulb-flat-vector-illustration-Converted-02.png
  // https://i.ibb.co.com/WzwsYyC/sad-tiny-man-sitting-on-huge-lightbulb-flat-vector-illustration-Converted-03.png
  // https://i.ibb.co.com/WK0mBVW/sad-tiny-man-sitting-on-huge-lightbulb-flat-vector-illustration-Converted-04.png
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="max-w-screen-xl mx-auto pt-4 lg:px-2 px-4">
      <div className="rounded-lg">
        <Swiper
          loop={true}
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)} // Use realIndex
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={slide.id}>
              <div className="flex flex-col-reverse md:flex-row gap-8 p-8 items-center">
                {/* Text Content */}
                <div
                  className={`flex-1 ${
                    activeIndex === index
                      ? "animate__animated animate__fadeIn"
                      : "opacity-0"
                  }`}
                >
                  <h1 className="lg:text-4xl md:text-3xl text-2xl mb-3 font-semibold">
                    {slide.title}
                  </h1>
                  <p className="lg:w-2/3 text-sm">{slide.description}</p>
                  <Link
                    // to="/campaign"
                    className="btn btn-accent mt-8 w-full md:w-auto"
                  >
                    Donate Now
                  </Link>
                </div>
                {/* Image */}
                <div className="flex-1">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="rounded-lg"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Banner;
