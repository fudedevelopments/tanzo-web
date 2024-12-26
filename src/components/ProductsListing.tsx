import ProductCard from "./ProductCard";
import type { Schema } from "../../amplify/data/resource";
import { useNavigate } from "react-router-dom";

interface ProductsListing {
  Products: Schema["Products"]["type"][];
}

const ProductListing = ({ Products }: ProductsListing) => {
  const navigate = useNavigate();

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
        <div className="flex overflow-x-auto scrollbar-hide scroll-container space-x-4">
          {Products.map((product, index) => (
            <div
              key={index}
              className="min-w-[200px] md:min-w-[250px] flex-shrink-0 bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
              onClick={() => navigate(`/productview/${product.id}`)}
            >
              <ProductCard
                title={product.name}
                price={product.price.toString()}
                salePrice={product.actualPrice.toString()}
                imagepath={product.images}
              />
            </div>
          ))}
          {/* Show All Button */}
          <div className="min-w-[200px] md:min-w-[250px] flex items-center justify-center bg-blue-100 rounded-lg shadow-md">
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
