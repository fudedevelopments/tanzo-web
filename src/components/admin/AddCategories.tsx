import React, { useState } from 'react';
import { uploadData } from 'aws-amplify/storage';
import { v4 as uuidv4 } from 'uuid';
import { client } from '../../utils/client';
import { useMutation } from '@tanstack/react-query'

const AddCategory: React.FC = () => {
    const [categoryName, setCategoryName] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false); // Loading state

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const uploadImagesToS3 = async () => {
        if (image) {
            const fileExtension = image.name.split(".").pop();
            const result = await uploadData({
                path: `category-images/${uuidv4()}.${fileExtension}`,
                data: image
            }).result
            return result.path;
        }
    };

    const createCategory = useMutation({
        mutationFn: async (input: { name: string; image: string }) => {
            const { data: newCategory } = await client.models.Categories.create(input);
            return newCategory;
        },
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true); // Start loading
        try {
            const imagepath = await uploadImagesToS3();
            console.log(imagepath);
            if (imagepath) {
                const response = await createCategory.mutateAsync({
                    name: categoryName,
                    image: imagepath,
                });
                console.log("Category created:", response);
                setCategoryName('');
                setImage(null);
            }
        } catch (error) {
            console.error("Error creating category:", error);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-teal-400 to-blue-500">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-center text-gray-700">Add Category</h2>
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
