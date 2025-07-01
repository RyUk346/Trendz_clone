import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <Link href={`/products/${product.id}`} passHref>
      <div className="border p-3 hover:shadow-md transition cursor-pointer">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover mb-2"
        />
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-600">{product.price}</p>
      </div>
    </Link>
  );
}
