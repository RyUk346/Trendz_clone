"use client";
import React from "react";

export default function HeroSection() {
  return (
    <div className="relative w-full min-h-[400px] md:min-h-[600px] overflow-hidden">
      {/* Video with full width and minimum height */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover" // 👈 set min height here
      >
        <source src="hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Button over video (bottom center) */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
        <button className="px-6 py-2 bg-white text-black shadow-md hover:bg-gray-200 transition">
          Discover More
        </button>
      </div>
    </div>
  );
}
