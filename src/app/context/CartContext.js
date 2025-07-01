"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from cookie on mount
  useEffect(() => {
    const saved = Cookies.get("cart");
    if (saved) {
      try {
        setCartItems(JSON.parse(saved));
      } catch {}
    }
  }, []);

  // Persist cart to cookie
  useEffect(() => {
    Cookies.set("cart", JSON.stringify(cartItems), { expires: 7 });
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const exists = prev.find((i) => i.id === product.id);
      if (exists) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) =>
    setCartItems((prev) => prev.filter((i) => i.id !== id));

  const updateItem = (id, data) =>
    setCartItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, ...data } : i))
    );

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateItem }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
