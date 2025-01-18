import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";




interface ImageUploadContainerProps {
    onImagesUpdate?: (images: string[]) => void;
}


function ImageUploadContainer({ onImagesUpdate }: ImageUploadContainerProps) {
    const [images, setImages] = useState<{ id: string; file: File; status: string; url?: string; uploadurl: string }[]>([]);
 
    const updateParentWithUrls = () => {
        
        const urls = images.map((img) => img.url).filter((url): url is string => !!url);
        if (onImagesUpdate) {
            onImagesUpdate(urls) // Pass the full list of URLs
        }
    };

    const uploadImageMutation = useMutation({
        mutationKey: ["uploadImage"],
        mutationFn: async (image: { id: string; file: File }) => {
            const imageUUID = uuidv4();
            const uploadURL = `https://workers.tanzo.in/productimages/${imageUUID}`;
            const binaryData = await image.file.arrayBuffer();
            const uint8Array = new Uint8Array(binaryData);

            const response = await axios.put(uploadURL, uint8Array, {
                headers: {
                    "Content-Type": "application/octet-stream",
                },
            });

            return { id: image.id, url: `https://images.tanzo.in/${response.data}`, uploadurl: uploadURL }; // Adjust API response
        },
        onSuccess: (data) => {
            setImages((prevImages) => {
                const updatedImages = prevImages.map((img) =>
                    img.id === data.id ? { ...img, status: "uploaded", url: data.url, uploadurl: data.uploadurl } : img
                );

                // Call updateParentWithUrls with the updated list
                const urls = updatedImages.map((img) => img.url).filter((url): url is string => !!url);
                if (onImagesUpdate) {
                    onImagesUpdate(urls);
                }

                return updatedImages;
            });
        },

        onError: (error, variables) => {
            setImages((prevImages) =>
                prevImages.map((img) =>
                    img.id === variables.id ? { ...img, status: "error" } : img
                )
            );
            console.error("Upload error:", error);
        },
    });

    const deleteImageMutation = useMutation({
        mutationKey: ["deleteImage"],
        mutationFn: async (uploadurl: string) => {
            await axios.delete(uploadurl); // Use the uploadurl for deletion
        },
        onSuccess: (_, uploadurl) => {
            setImages((prevImages) => prevImages.filter((img) => img.uploadurl !== uploadurl));

            updateParentWithUrls(); // Update parent after a successful deletion
        },
        onError: (error) => {
            console.error("Failed to delete image:", error);
        },
    });


    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);
            const newImages = selectedFiles.map((file) => ({
                id: uuidv4(),
                file,
                status: "pending",
                uploadurl: "", // Initialize with an empty string
            }));

            setImages((prevImages) => [...prevImages, ...newImages]);

            newImages.forEach((image) => {
                uploadImageMutation.mutate(image);
            });
        }
    };

    const handleRetry = (image: { id: string; file: File }) => {
        setImages((prevImages) =>
            prevImages.map((img) =>
                img.id === image.id ? { ...img, status: "retrying" } : img
            )
        );
        uploadImageMutation.mutate(image);
    };

    const handleDelete = (image: { id: string; uploadurl: string; url?: string }) => {
        if (image.uploadurl) {
            deleteImageMutation.mutate(image.uploadurl);
        } else {
            setImages((prevImages) => prevImages.filter((img) => img.id !== image.id));
        }
    };


    return (
        <div>
            <div
                className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 cursor-pointer overflow-y-auto"
                onClick={() => document.getElementById("imageInput")?.click()}
                onDrop={(e) => {
                    e.preventDefault();
                    if (e.dataTransfer.files) {
                        const files = Array.from(e.dataTransfer.files);
                        const newImages = files.map((file) => ({
                            id: uuidv4(),
                            file,
                            status: "pending",
                            uploadurl: "", // Initialize with an empty string
                        }));

                        setImages((prevImages) => [...prevImages, ...newImages]);

                        newImages.forEach((image) => {
                            uploadImageMutation.mutate(image);
                        });
                    }
                }}
                onDragOver={(e) => e.preventDefault()}
            >
                {images.length === 0 ? (
                    <p className="text-gray-500">Click to select images or drag and drop</p>
                ) : (
                    <div className="grid grid-cols-3 gap-4">
                        {images.map((image) => (
                            <div key={image.id} className="relative group">
                                <img
                                    src={URL.createObjectURL(image.file)}
                                    alt="Preview"
                                    className={`h-20 w-20 object-cover rounded-lg shadow-md ${image.status === "error" ? "opacity-50" : ""
                                        }`}
                                />
                                {image.status === "pending" && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 rounded-lg">
                                        <div className="loader border-t-transparent border-4 border-white rounded-full w-6 h-6 animate-spin"></div>
                                    </div>
                                )}
                                {image.status === "uploaded" && (
                                    <div className="absolute top-1 right-1 bg-green-500 text-white rounded-full p-1 text-xs">
                                        ✓
                                    </div>
                                )}
                                {image.status === "error" && (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-800 bg-opacity-50 rounded-lg">
                                        <p className="text-red-500 text-xs mb-2">Failed to upload</p>
                                        <button
                                            onClick={() => handleRetry(image)}
                                            className="bg-yellow-500 text-white rounded-full px-2 py-1 text-xs"
                                        >
                                            Retry
                                        </button>
                                    </div>
                                )}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent the click from triggering the file input
                                        handleDelete(image);
                                    }}
                                    className="absolute bottom-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs"
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
        </div>
    );
}

export default ImageUploadContainer;
