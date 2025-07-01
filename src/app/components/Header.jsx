"use client";
import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";
import {
  FaSearch,
  FaUser,
  FaShoppingCart,
  FaBars,
  FaTimes,
  FaChevronRight,
  FaChevronDown,
} from "react-icons/fa";
import Link from "next/link";

export default function Header() {
  const { cartItems } = useCart();
  const cartCount = cartItems.length;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState(null);
  const [activeSubDropdown, setActiveSubDropdown] = useState(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isMenuOpen) {
      setActiveMobileDropdown(null);
      setActiveSubDropdown(null);
    }
  };

  const toggleDropdown = (item) => {
    if (activeMobileDropdown === item) {
      setActiveMobileDropdown(null);
      setActiveSubDropdown(null); // Close sub-dropdowns too when main dropdown closes
    } else {
      setActiveSubDropdown(null); // Close any active sub-dropdown when new main dropdown opens
      setActiveMobileDropdown(item);
    }
  };

  const toggleSubDropdown = (section) =>
    setActiveSubDropdown((prev) => (prev === section ? null : section));

  const navItems = ["Men", "Women", "Accessories", "Summer Sale 2025"];

  const dropdownItems = {
    Men: {
      Shirt: ["Premium Shirt", "Executive Shirt", "Formal Shirt"],
      Pant: ["Formal Pant", "Denim Pant"],
      Panjabi: ["Kabli Set", "Vest"],
    },
    Women: {
      "Ethnic Wear": ["Salwar Kamiz", "Kurtis"],
      "Bottom Wear": ["Leggings", "Denim Pants"],
    },
  };

  // Effect to handle window resizing and close mobile menu on desktop view
  useEffect(() => {
    const handleResize = () => {
      // 768px is Tailwind's 'md' breakpoint. Adjust if your breakpoint is different.
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false); // Close the mobile menu
        setActiveMobileDropdown(null); // Reset dropdowns
        setActiveSubDropdown(null);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMenuOpen]); // Dependency array: re-run effect if isMenuOpen changes

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md">
      <div className="w-full flex justify-between items-center px-2 md:px-4 lg:px-6 py-4">
        {/* Left: Logo and Desktop Nav */}
        <div className="flex items-center space-x-6">
          <a href="/">
            <h1 className="text-2xl font-bold text-black">TRENDZ</h1>
          </a>

          {/* Desktop Menu */}
          <nav className="hidden md:flex md:space-x-1.5 lg:space-x-6 whitespace-nowrap">
            {navItems.map((item) => (
              <div
                key={item}
                onMouseEnter={() => setHoveredItem(item)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <a
                  href="#"
                  className="text-gray-700 hover:text-black py-2 px-3 block"
                >
                  {item}
                </a>
              </div>
            ))}
          </nav>
        </div>

        {/* Right: Search + Icons */}
        <div className="flex items-center space-x-4 text-gray-700">
          <div className="relative w-full max-w-sm">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <FaSearch />
          <FaUser />
          <Link href="/cart" className="relative">
            <FaShoppingCart className="text-xl cursor-pointer" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          <button onClick={toggleMenu} className="md:hidden text-xl">
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Desktop Dropdown (no change needed here) */}
      {(hoveredItem === "Men" || hoveredItem === "Women") && (
        <div
          onMouseEnter={() => setHoveredItem(hoveredItem)}
          onMouseLeave={() => setHoveredItem(null)}
          className="absolute left-0 top-full w-full bg-white shadow-lg py-6 z-40 hidden md:block"
        >
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-3 gap-6">
            {hoveredItem &&
              Object.entries(dropdownItems[hoveredItem]).map(
                ([section, items]) => (
                  <div key={section}>
                    <h4 className="font-bold text-lg mb-2">{section}</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      {items.map((item) => (
                        <li key={item}>
                          <a href="#">{item}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              )}
          </div>
        </div>
      )}

      {/* Mobile Menu Backdrop & Sidebar Container */}
      <div
        className={`fixed inset-0 z-30 md:hidden transition-opacity duration-300 ${
          isMenuOpen
            ? "bg-black/30 pointer-events-auto"
            : "bg-black/0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      ></div>

      <div
        className={`fixed top-0 right-0 w-3/4 h-full z-40 bg-white shadow-lg overflow-y-auto transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="w-full">
          <img
            src="/menu.jpg" // replace with actual image path
            alt="Menu Top"
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="px-4 pb-4 pt-2 space-y-2">
          {navItems.map((item) => {
            const hasDropdown = dropdownItems[item];
            const isActive = activeMobileDropdown === item;

            return (
              <div key={item}>
                <button
                  onClick={() => toggleDropdown(item)}
                  className={`flex justify-between items-center w-full py-2 px-2 rounded text-left transition-all duration-300 ${
                    isActive ? "bg-[#E61A1A] text-white" : "text-gray-700"
                  }`}
                >
                  {item}
                  {hasDropdown &&
                    (isActive ? <FaChevronDown /> : <FaChevronRight />)}
                </button>

                {/* Main Dropdown Content (e.g., Shirt, Pant for Men) */}
                {/* This div controls the slide-down/up and fade for the main dropdown */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isActive && hasDropdown
                      ? "max-h-[999px] opacity-100" // Open state: set a large max-height and full opacity
                      : "max-h-0 opacity-0" // Closed state: height 0 and invisible
                  }`}
                >
                  {/* The content itself only renders when active, for performance */}
                  {isActive &&
                    hasDropdown &&
                    Object.entries(dropdownItems[item]).map(
                      ([section, items]) => {
                        const isSubActive = activeSubDropdown === section;
                        return (
                          <div key={section} className="pl-4">
                            <button
                              onClick={() => toggleSubDropdown(section)}
                              className={`flex justify-between items-center w-full py-2 px-2 rounded text-left transition-all duration-300 ${
                                isSubActive
                                  ? "bg-[#E61A1A] text-white"
                                  : "text-gray-700"
                              }`}
                            >
                              {section}
                              {isSubActive ? (
                                <FaChevronDown />
                              ) : (
                                <FaChevronRight />
                              )}
                            </button>

                            {/* Sub-items (e.g., Premium Shirt, Executive Shirt) */}
                            {/* This ul controls the slide-down/up and fade for the sub-dropdown */}
                            <ul
                              className={`pl-4 pt-2 space-y-1 text-sm text-gray-700 overflow-hidden transition-all duration-300 ease-in-out ${
                                isSubActive
                                  ? "max-h-[999px] opacity-100" // Open state
                                  : "max-h-0 opacity-0" // Closed state
                              }`}
                            >
                              {/* Sub-items only render when sub-active */}
                              {isSubActive &&
                                items.map((subItem) => (
                                  <li key={subItem}>
                                    <a href="#">{subItem}</a>
                                  </li>
                                ))}
                            </ul>
                          </div>
                        );
                      }
                    )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </header>
  );
}
