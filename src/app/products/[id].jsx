"use client";

import { useEffect, useRef } from "react";
import dummyProducts from "@/app/data/products";
import Header from "@/app/components/Header";

export default function ProductDetail({ params }) {
  const product = dummyProducts.find(
    (item) => item.id.toString() === params.productId
  );

  const containerRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const image = imageRef.current;

    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      image.style.transformOrigin = `${x}% ${y}%`;
    };

    const enableZoom = () => {
      image.style.transform = "scale(2.5)";
    };

    const disableZoom = () => {
      image.style.transform = "scale(1)";
      image.style.transformOrigin = "center center";
    };

    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerenter", enableZoom);
    container.addEventListener("pointerleave", disableZoom);

    return () => {
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerenter", enableZoom);
      container.removeEventListener("pointerleave", disableZoom);
    };
  }, []);

  if (!product)
    return <div className="p-6 text-red-500">Product not found</div>;

  return (
    <div>
      <Header />
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Zoom Image */}
          <div
            ref={containerRef}
            className="w-full md:w-1/2 h-[400px] overflow-hidden border rounded relative"
          >
            <img
              ref={imageRef}
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-200 ease-out will-change-transform"
            />
          </div>

          {/* Info Section */}
          <div className="w-full md:w-1/2">
            <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
            <p className="text-lg mb-4">Price: {product.price}</p>

            {/* Color Selection */}
            <div className="mb-4">
              <label className="block font-medium mb-1">Color</label>
              <select className="w-full border p-2 rounded">
                <option>Red</option>
                <option>Blue</option>
                <option>Green</option>
              </select>
            </div>

            {/* Size Selection */}
            <div className="mb-4">
              <label className="block font-medium mb-1">Size</label>
              <select className="w-full border p-2 rounded">
                <option>Small</option>
                <option>Medium</option>
                <option>Large</option>
              </select>
            </div>

            {/* Add to Cart */}
            <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
