export default function Newsletter() {
  return (
    <div className="bg-gray-100 py-10">
      <div className="container mx-auto px-4 text-center">
        <h3 className="text-2xl font-bold mb-2">Subscribe to Our Newsletter</h3>
        <p className="mb-4 text-gray-600">Get the latest updates and offers.</p>
        <form className="flex justify-center max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="p-2 flex-grow border"
          />
          <button type="submit" className="bg-black text-white px-4 py-2">
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}
