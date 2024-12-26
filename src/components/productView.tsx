import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { client } from "../utils/client";
import DisplayImage from "../utils/imageview";
import { useParams } from "react-router-dom";

const ProductView = () => {
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
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-500 mb-4"></div>
                    <p className="text-gray-700 text-xl font-semibold">
                        Loading products...
                    </p>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <p className="text-red-500 text-xl font-semibold">
                    Error fetching products. Please try again later.
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
        <div className="min-h-screen bg-gray-100 py-6">
            <div className="container mx-auto max-w-7xl bg-white shadow-md rounded-lg p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Left Section - Images */}
                    <div className="w-full lg:w-1/2">
                        {/* Big Image */}
                        <div className="mb-4">
                            <DisplayImage path={bigImage || ""} width={500} height={400} />
                        </div>

                        {/* Thumbnails with Scroll Buttons */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handleScrollLeft}
                                disabled={startIndex === 0}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded disabled:opacity-50"
                            >
                                ◀
                            </button>

                            <div className="flex gap-2">
                                {visibleImages.map((image, index) => (
                                    <div
                                        key={index}
                                        className={`cursor-pointer border ${bigImage === image ? "border-blue-500" : "border-gray-300"} rounded-md p-1`}
                                        onClick={() => setSelectedImage(image)}
                                    >
                                        <DisplayImage path={image} width={64} height={64} />
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={handleScrollRight}
                                disabled={startIndex + 3 >= images.length}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded disabled:opacity-50"
                            >
                                ▶
                            </button>
                        </div>
                    </div>

                    {/* Right Section - Product Details */}
                    <div className="w-full lg:w-1/2 flex flex-col gap-4">
                        {/* Title */}
                        <h1 className="text-3xl font-bold text-gray-800">
                            {fetchedproduct?.name}
                        </h1>

                        {/* Price */}
                        <div className="flex items-center gap-4">
                            <span className="text-3xl font-semibold text-green-600">
                                ₹{fetchedproduct?.price}
                            </span>
                            <span className="text-xl text-gray-500 line-through">
                                ₹{fetchedproduct?.actualPrice}
                            </span>
                        </div>

                        {/* Add to Cart & Buy Now Buttons */}
                        <div className="flex gap-4 mt-4">
                            <button className="flex-1 bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 transition">
                                Add to Cart
                            </button>
                            <button className="flex-1 bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition">
                                Buy Now
                            </button>
                        </div>

                        {/* Description */}
                        <div className="mt-6">
                            <h2 className="text-lg font-medium text-gray-800">
                                Product Description
                            </h2>
                            <p className="text-gray-600 mt-2">
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
