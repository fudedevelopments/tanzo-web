import ProductCard from "./ProductCard";

const ProductListing = () => {
  const products = [
    {
      design: "Design 1",
      title: "Baby Birth Frame - Design 1",
      price: "899",
      salePrice: "799",
      imageUrl: "https://plus.unsplash.com/premium_photo-1670426501184-82ba207f1cb6?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      design: "Design 2",
      title: "Baby Birth Frame - Design 2",
      price: "899",
      salePrice: "799",
      imageUrl: "https://images.unsplash.com/photo-1640116682712-94bf1c17abe2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      design: "Design 3",
      title: "Baby Birth Frame - Design 3",
      price: "899",
      salePrice: "799",
      imageUrl: "https://images.unsplash.com/photo-1592903297149-37fb25202dfa?q=80&w=1915&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      design: "Design 4",
      title: "Baby Birth Frame - Design 4",
      price: "899",
      salePrice: "799",
      imageUrl: "https://images.unsplash.com/photo-1731902062633-1496d7bcf95c?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      design: "Design 5",
      title: "Baby Birth Frame - Design 5",
      price: "899",
      salePrice: "799",
      imageUrl: "https://images.unsplash.com/photo-1601307666167-910027240bcd?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      design: "Design 6",
      title: "Baby Birth Frame - Design 6",
      price: "899",
      salePrice: "799",
      imageUrl: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=2000&auto=format&fit=crop",
    },
  ];

  const scrollContainer = (direction: "left" | "right") => {
    const container = document.querySelector(".scroll-container") as HTMLElement | null;
    if (container) {
      container.scrollBy({ left: direction === "left" ? -300 : 300, behavior: "smooth" });
    }
  };

  return (
    <div className="p-6 bg-cream">
      <h1 className="text-3xl font-bold text-center mb-6">Baby Birth Frames</h1>
      <div className="relative">
        {/* Horizontal scroll container */}
        <div className="flex overflow-x-auto scrollbar-hide scroll-container space-x-6">
          {products.map((product, index) => (
            <div
              key={index}
              className="min-w-[250px] md:min-w-[300px] flex-shrink-0 bg-white rounded-lg shadow-md overflow-hidden"
            >
              <ProductCard
                design={product.design}
                title={product.title}
                price={product.price}
                salePrice={product.salePrice}
                imageUrl={product.imageUrl}
              />
            </div>
          ))}
          {/* Show All Button */}
          <div className="min-w-[250px] md:min-w-[300px] flex items-center justify-center bg-blue-100 rounded-lg shadow-md">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg"
              onClick={() => window.location.href = "/all-products"}
            >
              Show All
            </button>
          </div>
        </div>
        {/* Arrows for scrolling */}
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-300 text-gray-700 p-3 rounded-full shadow-lg"
          onClick={() => scrollContainer("left")}
        >
          ◀
        </button>
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-300 text-gray-700 p-3 rounded-full shadow-lg"
          onClick={() => scrollContainer("right")}
        >
          ▶
        </button>
      </div>
    </div>
  );
};

export default ProductListing;
