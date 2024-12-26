import React, { useState, useEffect } from 'react';
import { getUrl } from 'aws-amplify/storage';

interface DisplayImageProps {
    path: string;
    width?: number;
    height?: number;
}

const DisplayImage: React.FC<DisplayImageProps> = ({ path, width = 64, height = 64 }) => {
    const [imageURL, setImageURL] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchImageURL = async () => {
            try {
                if (!path) {
                    console.error('Path is required to fetch the image URL.');
                    return;
                }

                // Validate input and fetch the URL
                const result = await getUrl({ path });
                setImageURL(result.url.toString());
            } catch (error) {
                console.error('Error fetching image URL:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchImageURL();
    }, [path]);

    return (
        <div
            className="flex items-center justify-center bg-gray-200 rounded-md shadow-md"
            style={{ width, height }}
        >
            {isLoading ? (
                <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-blue-500"></div>
                </div>
            ) : imageURL ? (
                <img
                    src={imageURL}
                    alt="Product"
                    className="object-cover rounded-md"
                    style={{ width, height }}
                />
            ) : (
                <p className="text-gray-500 text-sm">Failed to load</p>
            )}
        </div>
    );
};

export default DisplayImage;
