import React from "react";
import {  useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ShoppingCart } from "lucide-react";
import NormalLoading from "./smallcomponents/normalindicator";

interface Product {
    id: number;
    name: string;
    price: string;
    image: string;
}

interface RelatedProductsProps {
    categoryId: string;
}

const RelatedProducts = ({categoryId}: RelatedProductsProps) => {

    
    
    const { data, isLoading, isError } = useQuery({
        queryKey: ["categoryProducts", categoryId],
        queryFn: async () => {
            const response = await axios.get(
                `https://xjbbqipjocndfh7itstm6nxs240tsubh.lambda-url.ap-south-1.on.aws/category?categoryId=${categoryId}&limit=20`
            );
            
            return {
                products: response.data.data.products,
                nextToken: response.data.data.nextToken,
            };
        },
    });
    const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
        <div className={`bg-white shadow-md rounded-lg ${className}`}>{children}</div>
    );

    const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
        <div className={`p-4 ${className}`}>{children}</div>
    );
    const Button: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
        <button className={`bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition ${className}`}>
            {children}
        </button>
    );
    const ScrollArea: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
        <div className={`overflow-x-auto whitespace-nowrap ${className}`}>{children}</div>
    );


    if (isLoading) return <NormalLoading />;
    if (isError) return <p className="text-red-500">Error fetching products.</p>;

    return (
        <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Related Products</h2>
            <ScrollArea className="w-full overflow-x-auto">
                <div className="flex gap-4">
                    {data!.products.map((product: Product) => (
                        <Card key={product.id} className="min-w-[200px] p-2 shadow-md rounded-lg">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-40 object-cover rounded-md"
                            />
                            <CardContent className="p-2 flex flex-col items-center">
                                <h3 className="text-lg font-medium text-center">{product.name}</h3>
                                <p className="text-gray-600 text-sm">{product.price}</p>
                                <Button className="mt-2 w-full flex gap-2">
                                    <ShoppingCart size={16} /> View Product
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
};

export default RelatedProducts;
