import { useQuery } from "@tanstack/react-query";
import { client } from "../utils/client";

const OrdersPage = () => {

    const {
        data: orderProducts,
        error: orderError,
        isLoading: isOrderLoading,
    } = useQuery({
        queryKey: ["getorderproducts"],
        queryFn: async () => {
            const orderResponse = await client.models.Orders.list();
            if (!orderResponse?.data.length) {
                return null;
            }
            const orderProductDetails = await Promise.all(
                orderResponse.data.map(async (orderItem) => {
                    const productResponse = await client.models.Products.get({
                        id: orderItem.product!,
                    });
                    return {
                        ...productResponse.data,
                        quantity: orderItem.quantity,
                        orderId: orderItem.id,
                    };
                })
            );
            return orderProductDetails;
        },
    });

    if (isOrderLoading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-50">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-spin rounded-full"></div>
            </div>
        );
    }

    if (orderError) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-50">
                <p className="text-red-500">Error loading orders. Please try again later.</p>
            </div>
        );
    }

    if (!orderProducts) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-50">
                <p className="text-gray-800">No orders found. Place an order to see it here.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-screen bg-gray-50">
            {/* Title */}
            <header className="p-4 bg-white shadow-md">
                <h1 className="text-lg font-bold text-gray-800">Your Orders</h1>
            </header>

            {/* Orders List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {orderProducts.map((item) => (
                    <div
                        key={item.orderId}
                        className="flex items-center bg-white shadow rounded-md p-4"
                    >
                        <img src={item.images![0]!} width={96} height={96} />
                        <div className="ml-4 flex-1">
                            
                            <h2 className="text-sm font-semibold text-gray-800">
                                {item.name}
                            </h2>
                            <p className="text-gray-600 text-sm">
                                ${item.price!.toFixed(2)} x {item.quantity}
                            </p>
                            <p className="text-gray-600 text-sm font-bold">
                                Total: ${(item.price! * item.quantity).toFixed(2)}
                            </p>
                            <h2 className="text-sm font-popins text-gray-500">
                                Order Id : {item.orderId}
                            </h2>
                            <div className="mt-2 space-y-1 text-sm">
                                <a
                                    href={`/customization/${item.orderId}`}
                                    className="block text-blue-500 hover:underline"
                                >
                                    View Customization
                                </a>
                                <a
                                    href={`/track/${item.orderId}`}
                                    className="block text-blue-500 hover:underline"
                                >
                                    Track Order
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrdersPage;
