"use client";

import { use, useEffect, useRef, useState } from "react";
import dummyProducts from "@/app/data/products";
import Header from "@/app/components/Header";
import { useCart } from "@/app/context/CartContext";

export default function ProductDetail({ params }) {
  const { productId } = use(params);
  const { addToCart } = useCart();
  const product = dummyProducts.find(
    (item) => item.id.toString() === productId
  );

  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    const container = containerRef.current;
    const image = imageRef.current;
    if (!container || !image) return;

    const handlePointerMove = (e) => {
      if (isFullscreen) return;
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      image.style.transformOrigin = `${x}% ${y}%`;
    };

    const enableZoom = () => {
      if (!isFullscreen) {
        image.style.transform = "scale(2.5)";
        image.style.cursor = "zoom-in";
      }
    };

    const disableZoom = () => {
      image.style.transform = "scale(1)";
      image.style.transformOrigin = "center center";
      image.style.cursor = "default";
    };

    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerenter", enableZoom);
    container.addEventListener("pointerleave", disableZoom);

    return () => {
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerenter", enableZoom);
      container.removeEventListener("pointerleave", disableZoom);
    };
  }, [isFullscreen]);

  const handleFullscreen = () => {
    const img = imageRef.current;
    if (!img) return;

    if (!document.fullscreenElement) {
      img.requestFullscreen?.();
      img.style.transform = "scale(1)";
      img.style.objectFit = "contain";
      img.style.backgroundColor = "#000";
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      img.style.objectFit = "cover";
      img.style.backgroundColor = "";
      setIsFullscreen(false);
    }
  };

  const handleAddToCart = () => {
    if (selectedColor && selectedSize) {
      addToCart(product, selectedColor, selectedSize);
      alert("Added to cart!");
    } else {
      alert("Please select color and size.");
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    // You can redirect to checkout here
  };

  if (!product) {
    return (
      <div className="p-6 text-red-500 text-center">Product not found</div>
    );
  }

  const colors = product.color?.split(",").map((c) => c.trim()) || [];
  const sizes = product.size?.split(",").map((s) => s.trim()) || [];

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-800">
      <Header />
      <div className="container mx-auto p-6 md:flex gap-6">
        <div
          ref={containerRef}
          className="w-full max-w-md overflow-hidden shadow-lg relative group"
        >
          <img
            ref={imageRef}
            src={product.image}
            alt={product.name}
            className={`w-full h-full transition-transform duration-200 ease-out will-change-transform ${
              isFullscreen ? "object-contain" : "object-cover"
            }`}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://placehold.co/600x400/CCCCCC/666666?text=Image+Error";
            }}
          />
          <button
            onClick={handleFullscreen}
            className="absolute top-4 right-4 z-50 bg-white text-gray-800 rounded-full p-3 shadow-xl hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 ease-in-out opacity-80 hover:opacity-100"
          >
            {isFullscreen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15L3.75 20.25M15 9V4.5M15 9H19.5M15 9L20.25 3.75M15 15v4.5M15 15H19.5M15 15L20.25 20.25"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                />
              </svg>
            )}
          </button>
        </div>

        <div className="space-y-4 mt-6 md:mt-0">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-xl font-semibold">Price: {product.price}</p>

          {colors.length > 0 && (
            <div className="space-y-2">
              <label className="block font-semibold">Select Color:</label>
              <div className="flex gap-2 flex-wrap">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColor === color ? "ring-2 ring-black" : ""
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          )}

          {sizes.length > 0 && (
            <div className="space-y-2">
              <label className="block font-semibold">Select Size:</label>
              <div className="flex gap-2 flex-wrap">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-1 border rounded ${
                      selectedSize === size
                        ? "bg-black text-white"
                        : "bg-white text-black"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <p>Product Details: {product.info || "No additional details."}</p>

          <div className="flex gap-4 mt-4">
            <button
              onClick={() =>
                addToCart({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  image: product.image,
                  size: "M",
                  color: "blue",
                })
              }
              className="bg-black text-white px-4 py-2 mr-2"
            >
              Add to Cart
            </button>
            <button className="bg-red-600 text-white px-4 py-2">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}
