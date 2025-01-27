import ProductCard from "./ProductCard";

const ProductListing = ({ homepageproducts }: { homepageproducts: any }) => {
 
  

  const scrollHandler = (id: string, direction: "left" | "right") => {
    const container = document.getElementById(id);
    if (container) {
      container.scrollBy({ left: direction === "left" ? -200 : 200, behavior: "smooth" });
    }
  };

  return (
    <div className="p-6 bg-cream">
      {homepageproducts?.map((productGroup: any, index: number) => (
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
              {productGroup.products.map((product: any) => (
                <div
                  key={product.id}
                  className="min-w-[200px] flex-shrink-0"
                  style={{ scrollSnapAlign: "start" }}
                >
                  <ProductCard
                    id={product.id}
                    title={product.name}
                    price={product.actualprice.toString()}
                    salePrice={product.price.toString()}
                    imagepath={product.image}
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
