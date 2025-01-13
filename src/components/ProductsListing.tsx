import ProductCard from "./ProductCard";
import type { Schema } from "../../amplify/data/resource";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

interface ProductsListing {
  HomepageProducts: Schema["HomePageProducts"]["type"][];
}

const ProductListing = ({ HomepageProducts }: ProductsListing) => {
  const navigate = useNavigate();

  const { data: products, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const responses = await Promise.all(
        HomepageProducts.map(async (product) => {
          const response = await product.products({
          });
          const fetchedproduct = response.data;
          const title = product.title;
          return { title, fetchedproduct };
        })
      );
      return responses;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching products</div>;

  const scrollHandler = (id: string, direction: "left" | "right") => {
    const container = document.getElementById(id);
    if (container) {
      container.scrollBy({ left: direction === "left" ? -200 : 200, behavior: "smooth" });
    }
  };

  return (
    <div className="p-6 bg-cream">
      {products?.map((productGroup, index) => (
        <div key={index} className="mb-8">
          {/* Display the Title */}
          <h2 className="text-2xl font-semibold mb-4 text-center">{productGroup.title}</h2>

          {/* Horizontal Scrollable Product List with Buttons */}
          <div className="relative">
            <button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full shadow-md hover:bg-gray-400 z-10 disabled:opacity-50 disabled:pointer-events-none"
              onClick={() => scrollHandler(`scroll-${index}`, "left")}
              disabled={!document.getElementById(`scroll-${index}`)?.scrollLeft}
            >
              &lt;
            </button>
            <div
              id={`scroll-${index}`}
              className="flex overflow-x-auto gap-4 px-8 items-center scrollbar-hide"
              style={{ scrollSnapType: "x mandatory" }}
            >
              {productGroup.fetchedproduct.map((product) => (
                <div
                  key={product.id}
                  className="min-w-[200px] flex-shrink-0"
                  style={{ scrollSnapAlign: "start" }}
                >
                  <ProductCard
                    id={product.id}
                    title={product.name}
                    price={product.actualPrice.toString()}
                    salePrice={product.price.toString()}
                    imagepath={product.images}
                  />
                </div>
              ))}
            </div>
            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full shadow-md hover:bg-gray-400 z-10 disabled:opacity-50 disabled:pointer-events-none"
              onClick={() => scrollHandler(`scroll-${index}`, "right")}
              disabled={(() => {
                const container = document.getElementById(`scroll-${index}`);
                return (
                  !!container &&
                  container.scrollWidth <= container.clientWidth + container.scrollLeft
                );
              })()}
            >
              &gt;
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductListing;
