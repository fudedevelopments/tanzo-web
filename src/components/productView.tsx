import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { client } from "../utils/client";
import DisplayImage from "../utils/imageview";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const ProductView = () => {
    const navigate = useNavigate();
    const { productId } = useParams();
    const { data: fetchedproduct, isError, isLoading } = useQuery({
        queryKey: ["singleproduct"],
        queryFn: async () => {
            const { data: fetchedproduct } = await client.models.Products.get({
                id: productId!,
            });
            return fetchedproduct;
        },
    });

    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [startIndex, setStartIndex] = useState(0);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-500 mb-4"></div>
                    <p className="text-gray-700 text-xl font-semibold">
                        Loading product details...
                    </p>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <p className="text-red-500 text-xl font-semibold">
                    Error fetching product details. Please try again later.
                </p>
            </div>
        );
    }

    const images = fetchedproduct?.images?.filter((image): image is string => image !== null) || [];
    const bigImage = selectedImage || images[0];

    const visibleImages = images.slice(startIndex, startIndex + 3);

    const handleScrollLeft = () => {
        if (startIndex > 0) {
            setStartIndex(startIndex - 1);
        }
    };

    const handleScrollRight = () => {
        if (startIndex + 3 < images.length) {
            setStartIndex(startIndex + 1);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="container mx-auto max-w-7xl bg-white shadow-lg rounded-lg p-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Section - Images */}
                    <div className="w-full lg:w-1/2">
                        <div className="mb-6">
                            <DisplayImage path={bigImage || ""} width={500} height={400} />
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={handleScrollLeft}
                                disabled={startIndex === 0}
                                className="bg-gray-200 hover:bg-gray-300 text-gray-600 py-2 px-4 rounded disabled:opacity-50"
                            >
                                ◀
                            </button>
                            <div className="flex gap-2">
                                {visibleImages.map((image, index) => (
                                    <div
                                        key={index}
                                        className={`cursor-pointer border ${bigImage === image ? "border-blue-500" : "border-gray-300"} rounded-lg p-1`}
                                        onClick={() => setSelectedImage(image)}
                                    >
                                        <DisplayImage path={image} width={64} height={64}  />
                                    </div>
                                ))}
                            </div>
                            <button
                                onClick={handleScrollRight}
                                disabled={startIndex + 3 >= images.length}
                                className="bg-gray-200 hover:bg-gray-300 text-gray-600 py-2 px-4 rounded disabled:opacity-50"
                            >
                                ▶
                            </button>
                        </div>
                    </div>

                    {/* Right Section - Product Details */}
                    <div className="w-full lg:w-1/2 flex flex-col gap-6">
                        <h1 className="text-4xl font-bold text-gray-800">
                            {fetchedproduct?.name}
                        </h1>
                        <div className="flex items-center gap-4">
                            <span className="text-3xl font-bold text-green-600">
                                ₹{fetchedproduct?.price}
                            </span>
                            <span className="text-xl text-gray-500 line-through">
                                ₹{fetchedproduct?.actualPrice}
                            </span>
                        </div>
                        <div className="text-sm text-gray-500">
                            Inclusive of all taxes
                        </div>
                        <div className="flex gap-4 mt-4">
                            <button className="flex-1 bg-orange-600 text-white py-3 px-4 rounded-lg hover:bg-orange-700 transition">
                                Add to Cart
                            </button>
                            <button
                                className="flex-1 bg-yellow-500 text-white py-3 px-4 rounded-lg hover:bg-yellow-600 transition"
                                onClick={() => navigate("/checkoutpage")}
                            >
                                Buy Now
                            </button>
                        </div>
                        <div className="mt-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                Product Description
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                {fetchedproduct?.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductView;
