import React, { useState } from "react";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "../../utils/client";
import DisplayImage from "../../utils/imageview";
import { useParams } from "react-router-dom";

const AddProductsUnderTitle: React.FC = () => {
    const { titleId } = useParams();
    const queryClient = useQueryClient();
    const [addedProducts, setAddedProducts] = useState<Set<string>>(new Set());
    const [loadingButtons, setLoadingButtons] = useState<Record<string, boolean>>({});
    const [errorMessages, setErrorMessages] = useState<Record<string, string>>({});
    const [searchQuery, setSearchQuery] = useState("");

    const fetchProducts = async ({ pageParam = null }: { pageParam?: string | null }) => {
        const { data: products, nextToken } = await client.models.Products.list({
            limit: 10,
            nextToken: pageParam,
        });
        return { products, nextToken };
    };

    const productAddIDMutation = useMutation({
        mutationKey: ["addProductsTitle"],
        mutationFn: async ({ productId }: { productId: string }) => {
            await client.models.Products.update({
                id: productId,
                hpId: titleId,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["fetchProducts"]
            });
        },
    });

    const productRemoveIDMutation = useMutation({
        mutationKey: ["removeProductsTitle"],
        mutationFn: async ({ productId }: { productId: string }) => {
            await client.models.Products.update({
                id: productId,
                hpId: "",
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["fetchProducts"]
            });
        },
    });

    const {
        data,
        isError,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ["fetchProducts"],
        queryFn: fetchProducts,
        getNextPageParam: (lastPage) => lastPage.nextToken ?? undefined,
        initialPageParam: null,
    });

    const handleScroll = (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
        if (scrollHeight - scrollTop <= clientHeight + 10 && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    };

    const handleAddOrRemove = async (productId: string, action: "add" | "remove") => {
        setLoadingButtons((prev) => ({ ...prev, [productId]: true }));
        setErrorMessages((prev) => ({ ...prev, [productId]: "" }));

        try {
            if (action === "add") {
                await productAddIDMutation.mutateAsync({ productId });
                setAddedProducts((prev) => new Set(prev).add(productId));
            } else {
                await productRemoveIDMutation.mutateAsync({ productId });
                setAddedProducts((prev) => {
                    const updated = new Set(prev);
                    updated.delete(productId);
                    return updated;
                });
            }
        } catch (error: any) {
            setErrorMessages((prev) => ({
                ...prev,
                [productId]: error?.message || "Failed to update product.",
            }));
        } finally {
            setLoadingButtons((prev) => ({ ...prev, [productId]: false }));
        }
    };
    console.log(addedProducts);
    

    const filteredProducts = data?.pages
        .flatMap((page) => page.products)
        .filter((product: any) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a: any, b: any) => (b.hpId === titleId ? 1 : 0) - (a.hpId === titleId ? 1 : 0));

    return (
        <div
            className="flex flex-col items-center h-screen overflow-y-auto p-4 bg-gray-100"
            onScroll={handleScroll}
        >
            <h1 className="text-3xl font-bold mb-6">Product List</h1>

            <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full max-w-2xl p-2 mb-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {isLoading && (
                <div className="flex justify-center items-center">
                    <div className="gradient-loader"></div>
                </div>
            )}

            {isError && (
                <p className="text-red-500 text-center">Failed to load products. Please try again.</p>
            )}

            <div className="w-full max-w-2xl space-y-4">
                {filteredProducts?.map((product: any) => (
                    <div
                        key={product.id}
                        className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md"
                    >
                        <div className="flex items-center space-x-6">
                            <DisplayImage path={product.images[0]} />
                            <div>
                                <h2 className="text-lg font-semibold">{product.name}</h2>
                                <p className="text-sm text-gray-500">₹{product.price}</p>
                            </div>
                        </div>
                        <button
                            onClick={() =>
                                handleAddOrRemove(
                                    product.id,
                                    product.hpId === titleId ? "remove" : "add"
                                )
                            }
                            className={`px-4 py-2 text-sm font-medium rounded-lg transition ${product.hpId === titleId
                                    ? "bg-red-500 text-white hover:bg-red-600"
                                    : "bg-blue-500 text-white hover:bg-blue-600"
                                } flex items-center justify-center`}
                            disabled={loadingButtons[product.id]}
                        >
                            {loadingButtons[product.id] ? (
                                <div className="loader w-4 h-4 border-2 border-white rounded-full animate-spin"></div>
                            ) : product.hpId === titleId ? (
                                "Remove"
                            ) : (
                                "Add"
                            )}
                        </button>
                        {errorMessages[product.id] && (
                            <p className="text-red-500 text-xs mt-2">
                                {errorMessages[product.id]}
                            </p>
                        )}
                    </div>
                ))}
            </div>

            {isFetchingNextPage && (
                <div className="flex justify-center items-center mt-4">
                    <div className="gradient-loader"></div>
                </div>
            )}

            {!hasNextPage && !isLoading && (
                <p className="text-gray-500 mt-4">No more products to load.</p>
            )}
        </div>
    );
};

export default AddProductsUnderTitle;
