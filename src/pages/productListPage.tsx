import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { client } from "../utils/client";
import DisplayImage from "../utils/imageview";

function ProductListPage() {
  const { categoryId } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["categoryProducts", categoryId],
    queryFn: async (): Promise<any> => {
      const { data: category } = await client.models.Categories.get({ id: categoryId! });
      const productsData = await category?.products();
      return {
        categoryName: category?.name,
        products: productsData?.data,
        errors: productsData?.errors,
      };
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-500 mb-4"></div>
          <p className="text-gray-700 text-xl font-semibold">Loading products...</p>
        </div>
      </div>
    );
  }

  if (isError || data?.errors) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-red-500 text-xl font-semibold">Error fetching products. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row">
        {/* Left-Side Section */}
        <aside className="hidden lg:block w-1/4 p-4">
          <div className="bg-gradient-to-r from-teal-400 to-green-400 shadow-lg rounded-lg p-6">
            <h2 className="text-lg font-bold text-white mb-4">Explore More</h2>
            <ul className="space-y-4">
              <li className="flex items-center text-white hover:text-gray-100 cursor-pointer">
                <span className="material-icons mr-2">star</span> Popular Products
              </li>
              <li className="flex items-center text-white hover:text-gray-100 cursor-pointer">
                <span className="material-icons mr-2">local_offer</span> Top Deals
              </li>
              <li className="flex items-center text-white hover:text-gray-100 cursor-pointer">
                <span className="material-icons mr-2">new_releases</span> New Arrivals
              </li>
              <li className="flex items-center text-white hover:text-gray-100 cursor-pointer">
                <span className="material-icons mr-2">category</span> Categories
              </li>
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <div className="w-full lg:w-3/4">
          {/* Category Name */}
          <h1 className="text-3xl font-extrabold text-gray-800 mb-6">{data.categoryName}</h1>

          {/* Product List */}
          <div className="space-y-6">
            {data.products?.map((product: any) => (
              <div
                key={product.id}
                className="flex items-center bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
              >
                {/* Product Image */}
                <div className="w-24 h-24 bg-gray-100 flex justify-center items-center rounded-md overflow-hidden">
                  <DisplayImage path={product.images[0]} width={300} height={200} ></DisplayImage>
                </div>

                {/* Product Details */}
                <div className="ml-4 flex-1">
                  <h2 className="text-lg font-bold text-gray-800">{product.name}</h2>
                  <p className="text-gray-600 mt-1">
                    <span className="text-green-500 font-bold">${product.price}</span>
                    <span className="text-gray-500 line-through ml-2">
                      ${product.actualPrice}
                    </span>
                  </p>
                </div>

                {/* Action Button */}
                <button className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-2 rounded-lg font-medium hover:scale-105">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductListPage;
