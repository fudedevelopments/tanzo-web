import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { client } from "../utils/client";
import DisplayImage from "../utils/imageview";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { uploadData } from "aws-amplify/storage";
import { v4 as uuidv4 } from "uuid";
import { RootState } from "../state/store";
import { useSelector } from "react-redux";

const ProductView = () => {
    const navigate = useNavigate();
    const userid = useSelector((state: RootState) => state.auth.username);
    const { productId } = useParams();
    const { data: fetchedproduct, isError, isLoading } = useQuery({
        queryKey: ["singleproduct"],
        queryFn: async () => {
            const { data: fetchedproduct } = await client.models.Products.get({
                id: productId!,
            });
            const cdetails = await fetchedproduct?.cdetails();
            return { ...fetchedproduct, ...cdetails?.data };
        },
    });


    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [startIndex, setStartIndex] = useState(0);
    const [uploadedImages, setUploadedImages] = useState<File[]>([]);
    const [customText, setCustomText] = useState("");
    const [spotifySong, setSpotifySong] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const files = Array.from(event.target.files);
            setUploadedImages((prev) => [...prev, ...files]);
        }
    };


    const uploadImagesMutation = useMutation({
        mutationFn: async (images: File[]): Promise<string[]> => {
            const uploadedKeys: string[] = [];
            for (const image of images) {
                const fileExtension = image.name.split(".").pop();
                const result = await uploadData({
                    path: `customer-Cimages/${uuidv4()}.${fileExtension}`,
                    data: image,
                    options: {
                        metadata: { contentType: image.type },
                    },
                }).result;

                if (result.path) {
                    uploadedKeys.push(result.path);
                }
            }
            return uploadedKeys;
        },
    });

    const createcdetcustomer = useMutation({
        mutationKey: ['createcdetcustomer'],
        mutationFn: async(ccdetails : any) => {
            const response = await client.models.CdetCustomer.create(ccdetails);
            console.log(response);
            
            return response.data;
        }
    })

    const createcartproductmutation = useMutation({
        mutationKey: ['buynowbuttonmutation'],
        mutationFn: async (cardproduct: any) => {
            const response = await client.models.CartProducts.create(cardproduct);
            console.log(response);
            
            return response.data;
        }
    })

    const handleRemoveImage = (index: number) => {
        setUploadedImages((prev) => prev.filter((_, i) => i !== index));
    };

    const handleBuyNow = async() => {
        if (
            (fetchedproduct?.isImageRequired && uploadedImages.length < fetchedproduct.requiredImages!) ||
            (fetchedproduct?.textRequired && !customText) ||
            (fetchedproduct?.isSpotify && !spotifySong)
        ) {
            setShowSnackbar(true);
            setTimeout(() => setShowSnackbar(false), 3000); // Hide snackbar after 3 seconds
        } else {
            setLoading(true);
            setErrorMessage(null);
            try {
                const uploadedimagespath = await uploadImagesMutation.mutateAsync(uploadedImages)
                const cdetailsresponse = await createcdetcustomer.mutateAsync(
                    {
                        images: uploadedimagespath,
                        text: customText,
                        spotifySong: spotifySong,
                    })
                await createcartproductmutation.mutateAsync(
                    {
                        userId: userid,
                        quantity :quantity,
                        product: productId,
                        cdeatails : cdetailsresponse?.id,
                    })
                setLoading(false)
                navigate('/cartPage')
            } catch (error) {
                setLoading(false);
                 console.log(error);
                setErrorMessage("Error adding product to cart");
            }
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <p className="text-gray-700 text-xl font-semibold">Loading product details...</p>
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


    const LoadingSpinner = () => (
        <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-500"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-r from-gray-50 to-gray-100 py-8">
            <div className="container mx-auto max-w-7xl bg-white shadow-2xl rounded-lg p-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Image and Product Details */}
                    <div className="w-full lg:w-1/2">
                        <div className="mb-6">
                            <DisplayImage path={bigImage || ""} width={500} height={400} />
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setStartIndex(Math.max(0, startIndex - 1))}
                                disabled={startIndex === 0}
                                className="bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800 py-2 px-4 rounded-full shadow hover:scale-105 transition"
                            >
                                ◀
                            </button>
                            <div className="flex gap-2">
                                {visibleImages.map((image, index) => (
                                    <div
                                        key={index}
                                        className={`cursor-pointer border-4 ${bigImage === image ? "border-pink-500" : "border-gray-300"} rounded-lg p-1 shadow-lg`}
                                        onClick={() => setSelectedImage(image)}
                                    >
                                        <DisplayImage path={image} width={64} height={64} />
                                    </div>
                                ))}
                            </div>
                            <button
                                onClick={() => setStartIndex(startIndex + 3 < images.length ? startIndex + 1 : startIndex)}
                                disabled={startIndex + 3 >= images.length}
                                className="bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800 py-2 px-4 rounded-full shadow hover:scale-105 transition"
                            >
                                ▶
                            </button>
                        </div>
                        <div className="mt-6">
                            <p className="text-lg font-semibold text-gray-700">Dimensions: {fetchedproduct?.pDimensions}</p>
                            <p className="text-base text-gray-600 mt-2">{fetchedproduct?.cdescription}</p>
                        </div>
                    </div>

                    {/* Customization and Quantity */}
                    <div className="w-full lg:w-1/2 flex flex-col gap-6">
                        <h1 className="text-4xl font-bold text-gray-800">{fetchedproduct?.name}</h1>
                        <div className="flex items-center gap-4">
                            <span className="text-3xl font-bold text-green-600">₹{fetchedproduct?.price}</span>
                            <span className="text-xl text-gray-500 line-through">₹{fetchedproduct?.actualPrice}</span>
                        </div>

                        {fetchedproduct?.isImageRequired && (
                            <div>
                                <h2 className="text-lg font-semibold text-gray-800">
                                    Upload Images ({uploadedImages.length}/{fetchedproduct.requiredImages})
                                </h2>
                                <label className="cursor-pointer">
                                    <input type="file" multiple className="hidden" onChange={handleImageUpload} />
                                    <div className="flex items-center justify-center h-32 border-2 border-dashed rounded-lg p-4 bg-white hover:scale-105 transition">
                                        <p className="text-lg font-semibold text-gray-600">Click to upload images</p>
                                    </div>
                                </label>
                                <div className="mt-4 flex flex-wrap gap-4">
                                    {uploadedImages.map((image, index) => (
                                        <div key={index} className="relative">
                                            <img
                                                src={URL.createObjectURL(image)}
                                                alt="Uploaded"
                                                className="w-24 h-24 object-cover rounded-lg shadow-lg"
                                            />
                                            <button
                                                onClick={() => handleRemoveImage(index)}
                                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {fetchedproduct?.textRequired && (
                            <div>
                                <label className="block text-lg font-semibold text-gray-800 mb-2">Customization Text</label>
                                <input
                                    type="text"
                                    value={customText}
                                    onChange={(e) => setCustomText(e.target.value)}
                                    className="w-full bg-white text-gray-800 px-4 py-3 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-300"
                                />
                            </div>
                        )}

                        {fetchedproduct?.isSpotify && (
                            <div>
                                <label className="block text-lg font-semibold text-gray-800 mb-2">Spotify Song URL</label>
                                <input
                                    type="text"
                                    value={spotifySong}
                                    onChange={(e) => setSpotifySong(e.target.value)}
                                    className="w-full bg-white text-gray-800 px-4 py-3 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-green-300"
                                />
                            </div>
                        )}

                        <div>
                            <label className="block text-lg font-semibold text-gray-800 mb-2">Quantity</label>
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                                    className="bg-gray-300 text-gray-800 py-2 px-4 rounded-full shadow"
                                >
                                    -
                                </button>
                                <span className="text-xl font-semibold">{quantity}</span>
                                <button
                                    onClick={() => setQuantity((prev) => prev + 1)}
                                    className="bg-gray-300 text-gray-800 py-2 px-4 rounded-full shadow"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                          {loading ? (<div className="flex items-center justify-center">
                            <LoadingSpinner />
                            <span className="ml-2">Adding...</span>
                          </div>):
                            (<button
                                onClick={handleBuyNow}
                                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-4 rounded-xl shadow-lg font-bold text-lg hover:scale-105"
                            >
                                Buy Now
                            </button>)
}

                        {showSnackbar && (
                            <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg">
                                Please fill in all required fields before proceeding.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductView;
