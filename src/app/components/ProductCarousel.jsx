"use client";

import Slider from "react-slick";
import dummyProducts from "../data/products";
import Link from "next/link";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Custom Next Arrow
const NextArrow = ({ onClick }) => {
  return (
    <div
      className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full cursor-pointer transition"
      onClick={onClick}
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </div>
  );
};

// Custom Previous Arrow
const PrevArrow = ({ onClick }) => {
  return (
    <div
      className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full cursor-pointer transition"
      onClick={onClick}
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </div>
  );
};

export default function ProductCarousel() {
  const settings = {
    infinite: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="p-4">
      <Slider {...settings}>
        {dummyProducts.map((product) => (
          <div key={product.id} className="p-2">
            <Link href={`/products/${product.id}`}>
              <div className="border hover:shadow-md transition cursor-pointer p-3">
                <img
                  src={`${product.image}`}
                  alt={product.name}
                  className="w-full h-64 object-fill mb-2"
                />
                <div className="flex justify-between">
                  <h3 className="text-[14px] w-5/6">{product.name}</h3>
                  <p className="text-gray-600 text-[14px]">{product.price}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
      <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-[3px]">
        {/* Image 1 – spans two columns on md+ */}
        <div className="md:col-span-2">
          <img
            src="grid2.jpg"
            alt="Image 1"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Image 2 – spans two rows on md+ */}
        <div className="md:row-span-2">
          <img
            src="grid1.jpg"
            alt="Image 2"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Image 3 */}
        <div>
          <img
            src="grid3.jpg"
            alt="Image 3"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Image 4 */}
        <div>
          <img
            src="grid4.jpg"
            alt="Image 4"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
