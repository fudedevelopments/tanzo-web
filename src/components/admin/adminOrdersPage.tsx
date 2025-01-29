import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { client } from "../../utils/client";
import { useState, useEffect } from "react";

const OrdersPage = () => {
    const [filterDate, setFilterDate] = useState("");
    const [filterEndDate, setFilterEndDate] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("today"); // Track the active filter
    const queryClient = useQueryClient();
    const [orderStatuses, setOrderStatuses] = useState<{ [key: string]: string }>({});
    const [message, setMessage] = useState("");
    useEffect(() => {
        const now = new Date();
        const todayStartUTC = new Date(
            Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0)
        ).toISOString();
        const todayEndUTC = new Date(
            Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59)
        ).toISOString();

        setFilterDate(todayStartUTC);
        setFilterEndDate(todayEndUTC);
    }, []);

    console.log(message);
    

    const {
        data: orderProducts,
        error: orderError,
        isLoading: isOrderLoading,
    } = useQuery({
        queryKey: ["getorderproducts", filterDate, filterEndDate],
        queryFn: async () => {
            const orderResponse = await client.models.Orders.list({
                filter: {
                    createdAt: {
                        gt: filterDate,
                        lt: filterEndDate,
                    },
                },
            });

            

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
                        status: orderItem.status,
                        orderedTime: orderItem.createdAt,
                    };
                })
            );

            return orderProductDetails;
        },
    });

    

    const handleStatusChange = (orderId: any, status: any) => {
        setOrderStatuses((prev) => ({
            ...prev,
            [orderId]: status,
        }));
    };

    const handleFilterChange = (filterOption: string) => {
        const now = new Date();

        let filterStartUTC = "";
        let filterEndUTC = "";
        if (filterOption === "today") {
            filterStartUTC = new Date(
                Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0)
            ).toISOString();
            filterEndUTC = new Date(
                Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59)
            ).toISOString();
        } else if (filterOption === "yesterday") {
            filterStartUTC = new Date(
                Date.UTC(now.getFullYear(), now.getMonth(), now.getDate() - 1, 0, 0, 0)
            ).toISOString();
            filterEndUTC = new Date(
                Date.UTC(now.getFullYear(), now.getMonth(), now.getDate() - 1, 23, 59, 59)
            ).toISOString();
        }

        setSelectedFilter(filterOption);
        setFilterDate(filterStartUTC);
        setFilterEndDate(filterEndUTC);
        queryClient.invalidateQueries({
            queryKey: ["getorderproducts", filterDate, filterEndDate],
        });
    };

    const updateOrder = useMutation({
        mutationFn: async ({ orderId, status }: { orderId: string; status: string }) => {
          const response =  await client.models.Orders.update({
                id: orderId,
                status: status,
          });
            console.log(response);
            
            return response.data;
        },
        onSuccess: () => {
            setMessage("Order status updated successfully!");
            queryClient.invalidateQueries({
                queryKey: ["getorderproducts"]
            });
            setTimeout(() => setMessage(""), 3000); 
        },
        onError: () => {
            setMessage("Failed to update order status. Please try again.");
            setTimeout(() => setMessage(""), 3000);
        },
    });

    const handleSave = (orderId: string) => {
        const status = orderStatuses[orderId];
        if (!status) return;
        updateOrder.mutate({ orderId, status });
    };


    const handleCustomDateChange = (e: any) => {
        const selectedDate = new Date(e.target.value);
        const selectedStartDateUTC = new Date(
            Date.UTC(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 0, 0, 0)
        ).toISOString();
        const selectedEndDateUTC = new Date(
            Date.UTC(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 23, 59, 59)
        ).toISOString();

        setSelectedFilter("custom");
        setFilterDate(selectedStartDateUTC);
        setFilterEndDate(selectedEndDateUTC);
        queryClient.invalidateQueries({
            queryKey: ["getorderproducts", filterDate, filterEndDate],
        });
    };

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



    const statusOptions = [
        "Orderplaced",
        "Pending",
        "Processing",
        "Confirmed",
        "Cancelled",
        "Verification Needed",
        "Delayed",
        "Dispatched",
        "Delivered",
        "Shipped",
    ];
    
    

    return (
        <div className="flex flex-col h-screen bg-gray-50">
            {/* Title */}
            <header className="p-4 bg-white shadow-md">
                <h1 className="text-lg font-bold text-gray-800">Admin Orders Management</h1>
            </header>

            {/* Filter Section */}
            <div className="p-4 bg-white shadow-md flex items-center space-x-4">
                <button
                    className={`px-4 py-2 rounded-md shadow text-sm ${selectedFilter === "today"
                            ? "bg-blue-100 border border-blue-500 text-blue-700"
                            : "bg-white border border-gray-300 text-gray-700"
                        }`}
                    onClick={() => handleFilterChange("today")}
                >
                    Today
                </button>
                <button
                    className={`px-4 py-2 rounded-md shadow text-sm ${selectedFilter === "yesterday"
                            ? "bg-blue-100 border border-blue-500 text-blue-700"
                            : "bg-white border border-gray-300 text-gray-700"
                        }`}
                    onClick={() => handleFilterChange("yesterday")}
                >
                    Yesterday
                </button>
                <input
                    type="date"
                    className={`px-4 py-2 rounded-md shadow text-sm border ${selectedFilter === "custom"
                            ? "border-blue-500 bg-blue-100 text-blue-700"
                            : "border-gray-300 bg-white text-gray-700"
                        }`}
                    onChange={handleCustomDateChange}
                />
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {!orderProducts || orderProducts.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-gray-800">No orders found. Change the filter to see other orders.</p>
                    </div>
                ) : (
                    orderProducts.map((item) => (
                        <div
                            key={item.orderId}
                            className="flex items-center bg-white shadow rounded-md p-4"
                        >
                            <img src={item!.images![0]!} alt="Product" width={96} height={96} />
                            <div className="ml-4 flex-1">
                                <h2 className="text-sm font-semibold text-gray-800">{item.name}</h2>
                                <p className="text-gray-600 text-sm">
                                    ₹{item!.price!.toFixed(2)} x {item.quantity}
                                </p>
                                <p className="text-gray-600 text-sm font-bold">
                                    Total: ₹{(item!.price! * item.quantity).toFixed(2)}
                                </p>
                                <h2 className="text-sm text-gray-500">Order Id: {item.orderId}</h2>
                                <h2 className="text-sm text-gray-500">
                                    Date & Time:{" "}
                                    {new Date(item.orderedTime).toLocaleString("en-IN", {
                                        timeZone: "Asia/Kolkata",
                                        weekday: "short",
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        second: "2-digit",
                                    })}
                                </h2>
                                <div className="mt-2 space-y-1 text-sm">
                                    <a
                                        href={`/customization/${item.orderId}`}
                                        className="block text-blue-500 hover:underline"
                                    >
                                        View Customization
                                    </a>
                                </div>
                            </div>
                            <div className="ml-4">
                                <label
                                    htmlFor={`status-${item.orderId}`}
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Update Status:
                                </label>
                                <div className="flex items-center space-x-2 mt-1">
                                    <select
                                        id={`status-${item.orderId}`}
                                        value={orderStatuses[item.orderId] ?? item.status}
                                        onChange={(e) =>
                                            handleStatusChange(item.orderId, e.target.value)
                                        }
                                        className="border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                                    >
                                        {statusOptions.map((status) => (
                                            <option key={status} value={status}>
                                                {status}
                                            </option>
                                        ))}
                                    </select>
                                    {updateOrder.isPending && updateOrder.variables?.orderId === item.orderId ? (
                                        <div className="w-4 h-4 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
                                    ) : (
                                        <button
                                            onClick={() => handleSave(item.orderId)}
                                            className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 text-sm"
                                        >
                                            Save
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default OrdersPage;
