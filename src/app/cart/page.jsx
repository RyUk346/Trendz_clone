"use client";
import { useCart } from "../context/CartContext";
import Image from "next/image";
import Header from "../components/Header";

export default function CartPage() {
  const { cartItems, updateItem, removeFromCart } = useCart();

  return (
    <div className=" mx-auto p-4">
      <Header />
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b py-4"
          >
            <Image
              src={item.image}
              width={80}
              height={80}
              alt={item.name}
              className="object-cover"
            />
            <div className="flex-1 ml-4">
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p>{item.price}</p>

              <div className="flex space-x-4 mt-2">
                <label>
                  Color:
                  <select
                    value={item.color}
                    onChange={(e) =>
                      updateItem(item.id, { color: e.target.value })
                    }
                    className="ml-2"
                  >
                    <option value="blue">Blue</option>
                    <option value="red">Red</option>
                    <option value="green">Green</option>
                  </select>
                </label>
                <label>
                  Size:
                  <select
                    value={item.size}
                    onChange={(e) =>
                      updateItem(item.id, { size: e.target.value })
                    }
                    className="ml-2"
                  >
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                  </select>
                </label>
              </div>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}
