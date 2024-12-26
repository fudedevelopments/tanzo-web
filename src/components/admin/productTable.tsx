import React, { useEffect, useState } from "react";
import { client } from "../../utils/client";
import { FaTrash } from "react-icons/fa";
import DisplayImage from "../../utils/imageview";
import { useNavigate } from "react-router-dom";

const ProductTable: React.FC = () => {
    const [productLists, setProductLists] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const navigate = useNavigate();

    interface Product {
        id: string;
        name: string;
        actualPrice: number;
        price: number;
        description: string;
        images: string[] | any;
        category: string;
    }

    // Fetch product list
    useEffect(() => {
        const fetchProductList = async () => {
            try {
                const response = await client.models.Products.list();
                const products = response.data;
                setProductLists(products);
            } catch (error) {
                console.error("Error fetching product list:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProductList();
    }, []);

    // Handle delete confirmation
    const handleDelete = async (productId: string) => {
        try {
            await client.models.Products.delete({ id: productId });
            setProductLists((prev) => prev.filter((product) => product.id !== productId));
            setShowConfirm(false);
            setSelectedProduct(null);
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const truncateText = (text: string, maxLength: number) => {
        return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="loader border-t-4 border-blue-500 w-16 h-16 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Product List</h1>

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
                        {productLists.map((product) => (
                            <React.Fragment key={product.id}>
                                <tr
                                    className="cursor-pointer bg-white shadow-md rounded-lg hover:shadow-lg transition-all duration-300"
                                    onClick={() => navigate(`/product-view/${product.id}`)} // Navigate to product view page
                                    style={{
                                        marginBottom: "16px", // Add space between rows
                                        padding: "10px 20px", // Add outside padding
                                    }}
                                >
                                    <td className="py-4 px-4">
                                        <DisplayImage path={product.images[0]} width={100} height={100}></DisplayImage>
                                    </td>
                                    <td className="py-4 px-4">{truncateText(product.name, 50)}</td>
                                    <td className="py-4 px-4">₹{product.actualPrice.toFixed(2)}</td>
                                    <td className="py-4 px-4">₹{product.price.toFixed(2)}</td>
                                    <td className="py-4 px-4">
                                        <button
                                            className="text-red-500 hover:text-red-700"
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevent navigation on button click
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
                                onClick={() => handleDelete(selectedProduct.id)}
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
