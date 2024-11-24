import ProductCard from "./ProductCard";

const ProductListing = () => {
  const products = [
    {
      design: "Design A",
      title: "Engraved Wooden Plaque",
      price: "₹1199",
      salePrice: "₹999",
      imageUrl: "https://via.placeholder.com/200",
    },
    {
      design: "Design B",
      title: "Personalized Metal Keychain",
      price: "₹499",
      salePrice: "₹449",
      imageUrl: "https://via.placeholder.com/200",
    },
    {
      design: "Design C",
      title: "Customized Leather Wallet",
      price: "₹1999",
      salePrice: "₹1799",
      imageUrl: "https://via.placeholder.com/200",
    },
    {
      design: "Design D",
      title: "Engraved Photo Frame",
      price: "₹1599",
      salePrice: "₹1499",
      imageUrl: "https://via.placeholder.com/200",
    },
    {
      design: "Design E",
      title: "Custom Wooden Coaster",
      price: "₹699",
      salePrice: "₹599",
      imageUrl: "https://via.placeholder.com/200",
    },
  ];

  const scrollContainer = (direction: "left" | "right") => {
    const container = document.querySelector(".scroll-container") as HTMLElement | null;
    if (container) {
      container.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-6">Engraved Products</h1>
      <div className="relative">
        {/* Horizontal scroll container */}
        <div className="flex overflow-x-auto scrollbar-hide scroll-container space-x-6">
          {products.map((product, index) => (
            <div
              key={index}
              className="min-w-[250px] flex-shrink-0 bg-white rounded-lg shadow-md overflow-hidden"
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
