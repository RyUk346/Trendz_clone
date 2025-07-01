"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function HeroSlider() {
  return (
    <div className="w-full">
      <Swiper spaceBetween={0} slidesPerView={1} loop autoplay>
        <SwiperSlide>
          <img
            src="slide1.jpg"
            alt="Slide 1"
            className="w-full h-[500px] object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="slide2.jpg"
            alt="Slide 2"
            className="w-full h-[500px] object-contain"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
