"use client";

import { useState } from "react";
import {
  FaSearch,
  FaUser,
  FaShoppingCart,
  FaBars,
  FaTimes,
  FaChevronRight,
  FaChevronDown,
} from "react-icons/fa";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

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

  const toggleDropdown = (item) => {
    setActiveMobileDropdown((prev) => (prev === item ? null : item));
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full ${
        activeMobileDropdown ? "bg-[#E61A1A]" : "bg-white"
      } shadow-md transition-colors duration-300`}
    >
      <div className="w-full flex justify-between items-center px-2 md:px-4 lg:px-6 py-4">
        {/* Left: Logo and Desktop Nav */}
        <div className="flex items-center space-x-6">
          <a href="/">
            <h1
              className={`text-2xl font-bold ${
                activeMobileDropdown ? "text-white" : "text-black"
              }`}
            >
              TRENDZ
            </h1>
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
          <FaSearch className={activeMobileDropdown ? "text-white" : ""} />
          <FaUser className={activeMobileDropdown ? "text-white" : ""} />
          <FaShoppingCart
            className={activeMobileDropdown ? "text-white" : ""}
          />
          <button onClick={toggleMenu} className="md:hidden text-xl">
            {isMenuOpen ? (
              <FaTimes className={activeMobileDropdown ? "text-white" : ""} />
            ) : (
              <FaBars className={activeMobileDropdown ? "text-white" : ""} />
            )}
          </button>
        </div>
      </div>

      {/* Full-width Dropdown (Desktop) */}
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

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 transition-all duration-300">
          {navItems.map((item) => (
            <div key={item}>
              <button
                onClick={() => toggleDropdown(item)}
                className={`flex justify-between items-center w-full py-2 px-2 rounded text-left ${
                  activeMobileDropdown === item
                    ? "bg-[#E61A1A] text-white"
                    : "text-gray-700"
                }`}
              >
                {item}
                {dropdownItems[item] ? (
                  activeMobileDropdown === item ? (
                    <FaChevronDown />
                  ) : (
                    <FaChevronRight />
                  )
                ) : null}
              </button>

              {/* Subdropdown */}
              {activeMobileDropdown === item && dropdownItems[item] && (
                <div className="pl-4 pt-2 space-y-2 transition-all duration-300">
                  {Object.entries(dropdownItems[item]).map(
                    ([section, items]) => (
                      <div key={section}>
                        <h4 className="font-semibold text-sm text-white mb-1">
                          {section}
                        </h4>
                        <ul className="pl-2 space-y-1 text-white text-sm">
                          {items.map((subItem) => (
                            <li key={subItem}>
                              <a href="#">{subItem}</a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
