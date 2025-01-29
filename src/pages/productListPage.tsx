import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import NormalLoading from "../components/smallcomponents/normalindicator";

function ProductListPage() {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const limit = 10;
  
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["categoryProducts", categoryId],
      queryFn: async ({ pageParam }) => {
        try {
          const response = await axios.get(
            `https://xjbbqipjocndfh7itstm6nxs240tsubh.lambda-url.ap-south-1.on.aws/category?categoryId=${categoryId}&limit=${limit}&nextToken=${pageParam}`
          );
          console.log(response.data);
          const fetched = response.data.data;
          return {
            products: fetched.products, // Was previously 'product'
            nextToken: fetched.nextToken
          };
        } catch (error) {
          console.log(error);
          
        }
      },
      initialPageParam: '',
      getNextPageParam: (lastPage) => {
        const token = lastPage?.nextToken;
        if (!token) {
          return undefined;
        }
        return token;
      },
    });

  if (isLoading) {
    return <NormalLoading />;
  }

  if (isError || data?.pages[0]?.products.error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-red-500 text-xl font-semibold">
          Error fetching products. Please try again later.
        </p>
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
          <div className="text-2xl mt-3">
            Category Products
        </div>
          {/* Product List */}
          <div className="mt-5">
            {data?.pages.map((page, pageIndex) => (
              <div key={pageIndex}>
                {page?.products.map((product : any) => ( 
                  <div
                    key={product.id}
                    className="flex items-center bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
                  >
                    {/* Product Image */}
                    <div className="w-24 h-24 bg-gray-100 flex justify-center items-center rounded-md overflow-hidden">
                      <img
                        src={product.image} // Use product.image (singular from your API)
                        alt={product.name}
                        className="object-cover w-full h-full"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="ml-4 flex-1">
                      <h2 className="text-lg font-bold text-gray-800">{product.name}</h2>
                      <p className="text-gray-600 mt-1">
                        <span className="text-green-500 font-bold">${product.price}</span>
                        <span className="text-gray-500 line-through ml-2">
                          ${product.actualprice} {/* Match API's actualprice casing */}
                        </span>
                      </p>
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={() => navigate(`/productview/${product.id}`)} // Ensure productId exists in your data
                      className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-2 rounded-lg font-medium hover:scale-105"
                    >
                      Buy Now
                    </button>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {hasNextPage && (
            <div className="flex justify-center mt-8">
              <button
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className={`flex items-center justify-center bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-3 rounded-lg font-semibold hover:scale-105 ${isFetchingNextPage ? "opacity-50 cursor-not-allowed" : ""
                  }`}
              >
                {isFetchingNextPage ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8v-8H4z"
                      ></path>
                    </svg>
                    Loading...
                  </>
                ) : (
                  "Load More"
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductListPage;
