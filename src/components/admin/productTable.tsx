import React, { useState } from "react";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "../../utils/client";
import { FaTrash, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ProductTable: React.FC = () => {
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const fetchproductquery = async ({ pageParam = null }: { pageParam?: string | null }) => {
        const response = await client.models.Products.list({
            limit: 10,
            nextToken: pageParam,
            filter: {
                name: {
                    contains: searchValue
                }
            }
        });
        return { products: response.data, nextToken: response.nextToken };
    };

    // Infinite query for pagination
    const {
        data,
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ["productsadmin", searchValue], // Add searchValue to queryKey
        queryFn: fetchproductquery,
        getNextPageParam: (lastPage) => lastPage.nextToken ?? undefined,
        initialPageParam: null,
    });

    const handleSearch = () => {
        setSearchValue(searchTerm);
        queryClient.invalidateQueries({
            queryKey: ["productsadmin"]
        });
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };
    const handleScroll = (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
        if (scrollHeight - scrollTop <= clientHeight + 10 && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    };

    // Delete mutation remains the same
    const deleteMutation = useMutation({
        mutationKey: ["deleteproduct"],
        mutationFn: async (productId: string) => {
            const response = await client.models.Products.delete({ id: productId });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["productsadmin"]
            });
            setShowConfirm(false);
        },
    });

    const truncateText = (text: string, maxLength: number) => {
        return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="loader border-t-4 border-blue-500 w-16 h-16 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (isError) {
        return <div>Error loading products</div>;
    }

    // Flatten all pages into a single array
    const allProducts = data?.pages.flatMap((page) => page.products) || [];

    return (
       <div className="p-6 h-screen overflow-y-auto" onScroll={handleScroll}>
            <h1 className="text-2xl font-bold mb-4">Product List</h1>

            {/* Search Bar */}
            <div className="flex items-center mb-4 gap-2">
                <div className="relative flex-1">
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={handleKeyPress}
                    />
                    <FaSearch className="absolute left-3 top-3 text-gray-400" />
                </div>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
                    onClick={handleSearch}
                >
                    <FaSearch />
                    Search
                </button>
            </div>


            {/* Buttons remain the same */}
            <div className="flex justify-end mb-4 space-x-4">
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={() => navigate("/add-categories")}
                >
                    Add Category
                </button>
                <button
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    onClick={() => navigate("/add-product")}
                >
                    Add Product
                </button>
            </div>

            <div>
                <table className="w-full min-w-full table-fixed border-separate border-spacing-y-2">
                    <thead className="bg-gray-200 border-b">
                        <tr>
                            <th className="py-2 px-4 text-left">Image</th>
                            <th className="py-2 px-4 text-left">Name</th>
                            <th className="py-2 px-4 text-left">Actual Price</th>
                            <th className="py-2 px-4 text-left">Offer Price</th>
                            <th className="py-2 px-4 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allProducts.map((product) => (
                            <React.Fragment key={product.id}>
                                <tr
                                    className="cursor-pointer bg-white shadow-md rounded-lg hover:shadow-lg transition-all duration-300"
                                    onClick={() => navigate(`/product-view/${product.id}`)}
                                >
                                    {/* Table cells remain the same */}
                                    <td className="py-4 px-4">
                                        <img
                                            src={product!.images?.[0]!}
                                            alt={product.name}
                                            style={{ width: "100px", height: "100px", objectFit: "cover" }}
                                        />
                                    </td>
                                    <td className="py-4 px-4">{truncateText(product.name, 50)}</td>
                                    <td className="py-4 px-4">₹{product.actualPrice.toFixed(2)}</td>
                                    <td className="py-4 px-4">₹{product.price.toFixed(2)}</td>
                                    <td className="py-4 px-4">
                                        <button
                                            className="text-red-500 hover:text-red-700"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedProduct(product);
                                                setShowConfirm(true);
                                            }}
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Loading indicator for pagination */}
            {isFetchingNextPage && (
                <div className="flex justify-center items-center mt-4">
                    <div className="loader border-t-4 border-blue-500 w-8 h-8 rounded-full animate-spin"></div>
                </div>
            )}

            {/* End of list message */}
            {!hasNextPage && !isLoading && (
                <p className="text-gray-500 text-center mt-4">No more products to load</p>
            )}

            {/* Delete confirmation modal remains the same */}
            {showConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
                        <p className="mb-4">
                            Are you sure you want to delete this product permanently?
                        </p>
                        <div className="flex justify-end">
                            <button
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2 hover:bg-gray-400"
                                onClick={() => setShowConfirm(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                onClick={() => deleteMutation.mutate(selectedProduct.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductTable;