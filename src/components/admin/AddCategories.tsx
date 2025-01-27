import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { client } from '../../utils/client';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import for navigation

const AddCategory: React.FC = () => {
    const [categoryName, setCategoryName] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null); // Error state
    const navigate = useNavigate(); // For navigation

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const uploadImagesToR2 = async () => {
        const imageUUID = uuidv4();
        const uploadURL = `https://workers.tanzo.in/categoryimages/${imageUUID}`;

        if (!image) throw new Error("No image file selected");

        const binaryData = await image.arrayBuffer();
        const uint8Array = new Uint8Array(binaryData);

        const response = await axios.put(uploadURL, uint8Array, {
            headers: {
                "Content-Type": "application/octet-stream",
            },
        });

        return {
            url: `https://images.tanzo.in/${response.data}`,
        };
    };

    const createCategory = useMutation({
        mutationFn: async (input: { name: string; image: string }) => {
            const response = await client.models.Categories.create(input);
            console.log(response);
            return response.data;
        },
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null); // Clear previous errors

        try {
            const imagepath = await uploadImagesToR2();
             console.log(imagepath);
             
            if (imagepath) {
             const response  = await createCategory.mutateAsync({
                    name: categoryName,
                    image: imagepath.url,
                });

                setCategoryName('');
                setImage(null);
            
                
               // Redirect to admin dashboard
            }
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-teal-400 to-blue-500">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-center text-gray-700">Add Category</h2>
                {error && (
                    <p className="text-red-500 text-center text-sm mb-4">{error}</p>
                )}
                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="categoryName">
                            Category Name
                        </label>
                        <input
                            type="text"
                            id="categoryName"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            placeholder="Enter category name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="imageUpload">
                            Upload Image
                        </label>
                        <input
                            type="file"
                            id="imageUpload"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                            required
                        />
                        {image && (
                            <p className="mt-2 text-sm text-gray-500">
                                Selected file: <span className="font-medium">{image.name}</span>
                            </p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className={`w-full py-2 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-teal-400 ${loading ? 'bg-teal-300 cursor-not-allowed' : 'bg-teal-500 hover:bg-teal-600'
                            }`}
                        disabled={loading}
                    >
                        {loading ? (
                            <div className="flex items-center justify-center">
                                <svg
                                    className="w-5 h-5 mr-2 text-white animate-spin"
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
                                        d="M4 12a8 8 0 018-8v8H4z"
                                    ></path>
                                </svg>
                                Loading...
                            </div>
                        ) : (
                            'Add Category'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddCategory;
