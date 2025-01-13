import React, { useState } from "react";
import { client } from "../../utils/client";
import { uploadData } from "aws-amplify/storage";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { Schema } from "../../../amplify/data/resource";
import { useQuery, useMutation } from "@tanstack/react-query";


type Categories = Schema["Categories"]["type"];

const ProductAddPage = () => {
    const navigate = useNavigate();

    
    const { data: categories, isLoading: categoriesLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: async (): Promise<Categories[]> => {
            const response = await client.models.Categories.list();
            return response.data 
        },
    });

    

    const [images, setImages] = useState<File[]>([]);
    const [name, setName] = useState<string>("");
    const [price, setPrice] = useState<number>();
    const [description, setDescription] = useState<string>("");
    const [actualPrice, setActualPrice] = useState<number>();
    const [selectedcategory, setCategory] = useState<string>("");
    const [isImageRequired, setIsImageRequired] = useState<boolean>(false);
    const [noOfImagesRequired, setNoOfImagesRequired] = useState<number | null>(null);
    const [isTextRequired, setIsTextRequired] = useState<boolean>(false);
    const [isSpotifyRequired, setIsSpotifyRequired] = useState<boolean>(false);
    const [cdescription, setCDescription] = useState<string>("");
    const [cNotePoints, setCNotePoints] = useState<string>("");
    const [pdimensions, setPDimensions] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);
            setImages((prevImages) => [...prevImages, ...selectedFiles]);
        }
    };
    
    const handleDoubleClick = () => {
        document.getElementById("imageInput")?.click();
    };

    const handleRemoveImage = (index: number) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

   

    const uploadImagesMutation = useMutation({
        mutationFn: async (images: File[]): Promise<string[]> => {
            const uploadedKeys: string[] = [];
            for (const image of images) {
                const fileExtension = image.name.split(".").pop();
                const result = await uploadData({
                    path: `product-images/${uuidv4()}.${fileExtension}`,
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

    const addProductMutation = useMutation({
        mutationFn: async (product: any) => {
            const response = await client.models.Products.create(product)
            return response.data;

        },
    });

    const addcDetailsMutation = useMutation({
        mutationFn: async (cdetails: any) => {
            const response = await client.models.Cdetails.create(cdetails)
            return response.data;

        },
    });
  
    const handleAddProduct = async () => {
        setErrorMessage(null); // Reset error message
        setLoading(true);

        if (name.trim() && price && description.trim() && selectedcategory) {
            try {
                const imagePaths = await uploadImagesMutation.mutateAsync(images);

             const responseproduct =   await addProductMutation.mutateAsync({
                   name: name,
                   price: price,
                   actualPrice: actualPrice,
                   description: description,
                   images: imagePaths,
                   categoryId : selectedcategory
                });

                await addcDetailsMutation.mutateAsync({
                          isImageRequired : isImageRequired,
                          requiredImages: noOfImagesRequired,
                          textRequired: isTextRequired,
                          isSpotify: isSpotifyRequired,
                          cdescription: cdescription,
                          cNotePoints: cNotePoints,
                          pDimensions: pdimensions,
                          cId: responseproduct?.id
                })

                setLoading(false);
            } catch (error: any) {
                setLoading(false);
                setErrorMessage(error.message || "Error adding product");
                console.error("Error adding product:", error);
            }
        } else {
            setLoading(false);
            setErrorMessage("Please fill in all the required fields");
        }
    };

    const LoadingSpinner = () => (
        <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-500"></div>
        </div>
    );

    if (categoriesLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-2xl font-bold text-gray-700 mb-6">Add Product</h1>

                {/* Image Upload Section */}
                <div
                    className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 cursor-pointer overflow-y-auto"
                    onDoubleClick={handleDoubleClick}
                >
                    {images.length === 0 ? (
                        <p className="text-gray-500">Double-click to add images</p>
                    ) : (
                        <div className="grid grid-cols-3 gap-4">
                            {images.map((image, index) => (
                                <div key={index} className="relative group">
                                    <img
                                        src={URL.createObjectURL(image)}
                                        alt={`Product ${index}`}
                                        className="h-20 w-20 object-cover rounded-lg shadow-md"
                                    />
                                    <button
                                        onClick={() => handleRemoveImage(index)}
                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs opacity-0 group-hover:opacity-100 transition"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                    <input
                        id="imageInput"
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleImageUpload}
                    />
                </div>

                {/* Form Fields */}
                <div className="mt-6 space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Product Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder="Enter product name"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Price</label>
                        <input
                            type="number"
                            value={price?.toString()}
                            onChange={(e) => setPrice(Number(e.target.value))}
                            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder="Enter product price"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Actual Price
                        </label>
                        <input
                            type="number"
                            value={actualPrice?.toString()}
                            onChange={(e) => setActualPrice(Number(e.target.value))}
                            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder="Enter actual price"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Category</label>
                        <select
                            value={selectedcategory}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        >
                            <option value="" disabled>
                                Select a category
                            </option>
                            {categories?.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name} (ID: {cat.id})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Description
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder="Enter product description"
                        ></textarea>
                    </div>

                    {/* //custom details */}
                    <h1>Cutomization Details</h1>
           

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Is Image Required
                        </label>
                        <select
                            value={isImageRequired.toString()}
                            onChange={(e) => setIsImageRequired(e.target.value === "true")}
                            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        >
                            <option value="true">True</option>
                            <option value="false">False</option>
                        </select>
                    </div>

                    {isImageRequired && (
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Number of Images Required
                            </label>
                            <input
                                type="number"
                                value={noOfImagesRequired?.toString() || ""}
                                onChange={(e) => setNoOfImagesRequired(parseFloat(e.target.value))}
                                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                placeholder="Enter number of images required"
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Is Text required
                        </label>
                        <select
                            value={isTextRequired.toString()}
                            onChange={(e) => setIsTextRequired(e.target.value === "true")}
                            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        >
                            <option value="true">True</option>
                            <option value="false">False</option>
                        </select>
                    </div>


                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Is Spotify Required
                        </label>
                        <select
                            value={isSpotifyRequired.toString()}
                            onChange={(e) => setIsSpotifyRequired(e.target.value === "true")}
                            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        >
                            <option value="true">True</option>
                            <option value="false">False</option>
                        </select>
                    </div>
                
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Cdescription
                        </label>
                        <textarea
                            value={cdescription}
                            onChange={(e) => setCDescription(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder="Enter product description"
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                           c NotePoints
                        </label>
                        <textarea
                            value={cNotePoints}
                            onChange={(e) => setCNotePoints(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder="Enter product description"
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            P Dimensions
                        </label>
                        <textarea
                            value={pdimensions}
                            onChange={(e) => setPDimensions(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder="Enter product description"
                        ></textarea>
                    </div>





                </div>

                <div className="mt-6">
                    <button
                        onClick={handleAddProduct}
                        className={`w-full py-3 ${loading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600"
                            } text-white font-bold rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400`}
                        disabled={loading}
                    >
                        {loading ? (
                            <div className="flex items-center justify-center">
                                <LoadingSpinner />
                                <span className="ml-2">Adding...</span>
                            </div>
                        ) : (
                            "Add Product"
                        )}
                    </button>
                </div>

                {errorMessage && (
                    <div className="mt-4 text-red-500 text-sm font-medium">{errorMessage}</div>
                )}

                <button
                    className="w-full py-3 mt-4 bg-gradient-to-r from-gray-500 to-gray-700 text-white font-bold rounded-lg shadow-lg hover:from-gray-600 hover:to-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    onClick={()=>navigate("/admin-dashboard")}
                >
                    Go to Dashboard
                </button>
            </div>
        </div>
    );
};

export default ProductAddPage;
