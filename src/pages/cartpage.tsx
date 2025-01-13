import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "../utils/client";
import DisplayImage from "../utils/imageview";
import { useState } from "react";
import { load } from "@cashfreepayments/cashfree-js"
import { useNavigate } from "react-router-dom";


interface deleteproduct{
    productid: string;
    cdetails: string;
}

const CartPage = () => {
    const userid = useSelector((state: RootState) => state.auth.username);
    const queryClient = useQueryClient();
    const [selectedProduct, setSelectedProduct] = useState<string>();
    const [showDialog, setShowDialog] = useState(false);
    const navigate = useNavigate();
    const [selectedCdetails, setSelectedCdetails] = useState<string>();

    const {
        data: address,
        isLoading: isAddressLoading,
        isError: isAddressError,
    } = useQuery({
        queryKey: ["getaddress"],
        queryFn: async () => {
            const response = await client.models.address.get({
                id: userid,
            });
            return response.data;
        },
    });
  
    // Fetch cart products
    const {
        data: cartProducts,
        error: cartError,
        isLoading: isCartLoading,
    } = useQuery({
        queryKey: ["getcartproducts"],
        queryFn: async () => {
            const cartResponse = await client.models.CartProducts.list();
            if (!cartResponse?.data.length) {
                return null;
            }
            const cartProductDetails = await Promise.all(
                cartResponse.data.map(async (cartItem) => {
                    const productResponse = await client.models.Products.get({
                        id: cartItem.product!,
                    });
                    return {
                        ...productResponse.data,
                        quantity: cartItem.quantity,
                        cartproductid: cartItem.id,
                        cdetails : cartItem.cdeatails
                    };
                })
            );
            return cartProductDetails;
        },
    });

    const deleteMutation = useMutation({
        mutationFn: async ({ productid, cdetails }: deleteproduct) => {
            await client.models.CdetCustomer.delete({
                id: cdetails,
            });
            await client.models.CartProducts.delete({
                id: productid,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["getcartproducts"],
            });
        },
    });

    const handleDelete = (productid: string, cdetails: string) => {
        setSelectedProduct(productid);
        setSelectedCdetails(cdetails);
        setShowDialog(true);
    };

    const confirmDelete = () => {
        if (selectedProduct && selectedCdetails) {
            deleteMutation.mutate({ productid: selectedProduct, cdetails: selectedCdetails });
        }
        setShowDialog(false);
    };


    const handlePayment = async () => {
        if (!address) {
            navigate("/address")
            return;
        }
        try {
            const totalAmount = parseFloat(
                (totalPrice + deliveryCharge + totalPrice * 0.1).toFixed(2) // Taxes calculated inline as 10%
            );
            const response = await client.queries.createOrderCF({
                order_amount: totalAmount,
                customerId: userid,
                customerName: `${address.address1.firstName} ${address.address1.lastName}`,
                customerEmail: "stark121@gmail.com",
                customerPhone: "+919090407368",
            });

            const jsonString = response.data;
            if (jsonString) {
                const parsedData = JSON.parse(jsonString.toString());
                let checkoutoptions = {
                    paymentSessionId: parsedData.payment_session_id,
                    redirectTarget: "_self",
                };
                const cashfree = await load({
                    mode: "sandbox",
                });
                cashfree.checkout(checkoutoptions);
            } else {
                console.error("Received null data from createOrderCF");
            }
        } catch (error) {
            console.error("Error handling payment:", error);
        }
    };

    if (isCartLoading || isAddressLoading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-50">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-spin rounded-full"></div>
            </div>
        );
    }

    if (cartError || isAddressError) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-50">
                <p className="text-red-500">Error loading data. Please try again later.</p>
            </div>
        );
    }

    if (!cartProducts) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-50">
                <p className="text-gray-800">No cart items added. Please add cart items.</p>
            </div>
        );
    }

    const totalPrice = cartProducts.reduce(
        (total, item) => total + item.price! * item.quantity,
        0
    );
    const taxes = (totalPrice * 0.1).toFixed(2);
    const deliveryCharge = 5;

    return (
        <div className="flex flex-col h-screen bg-gray-50">
            {/* Title */}
            <header className="p-4 bg-white shadow-md">
                <h1 className="text-lg font-bold text-gray-800">Your Cart</h1>
            </header>

            {/* Note Section */}
            <div className="bg-gray-200 text-black text-sm p-4 mx-2 mt-2 rounded-md shadow-md flex items-center justify-between">
            <p className="text-gray-600 text-sm mx-2 mt-2">
                NOTE : Since our product is customized, Cash on Delivery (COD) is not available.
                Thank you for understanding. Replacement is available if the product is damaged with proper verification.
            </p>
            </div>
            {/* Address Section */}
            {address && (
                <div className="bg-gray-50 text-black text-sm p-4 mx-2 mt-2 rounded-md shadow-md flex items-center justify-between">
                    <p>
                        <strong>Shipping Address:</strong> {address.address1.firstName} {address.address1.lastName}, {address.address1.addressline1}...
                    </p>
                    <button
                        onClick={() => navigate("/address")}
                        className="text-blue-500 hover:underline"
                    >
                        Update Address
                    </button>
                </div>
            )}


            {/* Cart Products */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {cartProducts.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center bg-white shadow rounded-md p-4"
                    >
                        <DisplayImage path={item.images![0]!}>
                        </DisplayImage>
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
                            <div className="mt-2 space-y-1 text-sm">
                                <a
                                    href={`/customization/`}
                                    className="block text-blue-500 hover:underline"
                                >
                                    View Customization
                                </a>
                            </div>
                        </div>

                        <button
                            className="ml-4 text-red-500 hover:text-red-700"
                            onClick={() => handleDelete(item.cartproductid, item.cdetails!)}
                        >
                            &#x1F5D1;
                        </button>
                    </div>
                ))}
            </div>

            {/* Non-scrollable container */}
            <div className="bg-white shadow-md p-4">
                <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal:</span>
                    <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>Taxes (10%):</span>
                    <span>${taxes}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>Delivery:</span>
                    <span>${deliveryCharge.toFixed(2)}</span>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between text-lg font-semibold text-gray-800">
                    <span>Total:</span>
                    <span>${(totalPrice + deliveryCharge + Number(taxes)).toFixed(2)}</span>
                </div>
                <button
                    className="w-full mt-4 bg-blue-500 text-white py-2 rounded-md shadow hover:bg-blue-600"
                    onClick={handlePayment}
                >
                    {address ? "Proceed to Payment" : "Add Shipping Address"}
                </button>
            </div>

            {/* Confirmation Dialog */}
            {showDialog && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-md shadow-md">
                        <p className="text-gray-800 mb-4">Are you sure you want to delete this item?</p>
                        <div className="flex justify-end space-x-4">
                            <button
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                                onClick={() => setShowDialog(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                                onClick={confirmDelete}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
