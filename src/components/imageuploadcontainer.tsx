import { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid"; // Import UUID generator

function ImageUploadContainer() {
    const [images, setImages] = useState<File[]>([]);
    const [uploadStatus, setUploadStatus] = useState<string>("");

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

    const uploadImages = async () => {
        if (images.length === 0) {
            setUploadStatus("No images selected for upload.");
            return;
        }

        const corsHeaders ={
            "Content-Type": "application/octet-stream", // or the appropriate MIME type for your image
            "Access-Control-Allow-Origin": "*", // Allow all origins (for development purposes)
            "Access-Control-Allow-Methods": "GET, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, access-control-max-age",
            "Access-Control-Max-Age": "86400", // Cache preflight response for 1 day
        } ;


        try {
            for (const image of images) {
                const imageUUID = uuidv4(); // Generate a unique name for the image
                const uploadURL = `https://workers.tanzo.in/productimages/${imageUUID}`; // Replace with your API endpoint

                const binaryData = await image.arrayBuffer();
                const uint8Array = new Uint8Array(binaryData);

                const response = await axios({
                    method: "PUT",
                    url: uploadURL,
                    data: uint8Array,
                    headers: corsHeaders
                })
                console.log(response);
                
            }
        } catch (error: any) {
            setUploadStatus(`Error uploading images: ${error.response?.data?.message || error.message}`);
        }
    };

    return (
        <div>
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

            <button
                onClick={uploadImages}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
                Upload Images
            </button>

            {uploadStatus && <p className="mt-4 text-sm text-gray-600">{uploadStatus}</p>}
        </div>
    );
}

export default ImageUploadContainer;
