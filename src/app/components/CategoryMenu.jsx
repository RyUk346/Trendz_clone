export default function CategoryMenu() {
  const categories = ["Men", "Women", "Kids", "Accessories"];
  return (
    <div className="bg-gray-100 py-4">
      <div className="container mx-auto px-4 flex gap-6 justify-center">
        {categories.map((cat, i) => (
          <button
            key={i}
            className="text-gray-700 hover:text-black font-medium"
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
