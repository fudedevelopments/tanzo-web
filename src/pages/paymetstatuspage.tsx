import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="bg-white shadow-lg rounded-2xl">{children}</div>
);

const CardContent: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="p-6">{children}</div>
);

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => (
    <button
        {...props}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
    >
        {children}
    </button>
);

const PaymentStatusPage: React.FC = () => {
    const { orderId } = useParams<{ orderId: string }>();
    const navigate = useNavigate();

    const { data, isLoading, error } = useQuery({
        queryKey: ["paymentStatus", orderId],
        queryFn: async () => {
            const response = await axios.get(
                `https://gfbffzit322ue2qmhibgqsa6sa0veoln.lambda-url.ap-south-1.on.aws/`,
                {
                    params: { order_id: orderId },
                }
            );
            return response.data.data;
        },
        enabled: !!orderId,
    });

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full animate-spin bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                    <p className="text-gray-600 text-lg font-medium mt-4">
                        Please wait, fetching your details...
                    </p>
                </div>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center">
                    <p className="text-red-500 text-xl font-semibold">Failed to fetch payment status!</p>
                    <p className="text-gray-500 mt-2">Please try again later.</p>
                    <Button onClick={() => navigate("/")}>Go to Home Page</Button>
                </div>
            </div>
        );
    }

    const { order_status, order_amount, customer_details, order_id } = data;

    const statusMessages: Record<string, { title: string; message: string; icon: React.ReactNode }> = {
        PAID: {
            title: "Payment Successful!",
            message: "Thank you for your payment.",
            icon: <CheckCircle className="text-green-500 w-16 h-16" />,
        },
        FAILED: {
            title: "Payment Failed",
            message: "Something went wrong with your transaction.",
            icon: <XCircle className="text-red-500 w-16 h-16" />,
        },
        USER_DROPPED: {
            title: "Payment Dropped",
            message: "The payment process was not completed.",
            icon: <XCircle className="text-yellow-500 w-16 h-16" />,
        },
        FLAGGED: {
            title: "Payment Flagged",
            message: "This transaction has been flagged for review.",
            icon: <XCircle className="text-orange-500 w-16 h-16" />,
        },
        CANCELLED: {
            title: "Payment Cancelled",
            message: "The payment has been cancelled.",
            icon: <XCircle className="text-gray-500 w-16 h-16" />,
        },
        VOID: {
            title: "Payment Void",
            message: "This transaction is no longer valid.",
            icon: <XCircle className="text-gray-400 w-16 h-16" />,
        },
        NOT_ATTEMPTED: {
            title: "Payment Not Attempted",
            message: "No payment was attempted for this order.",
            icon: <XCircle className="text-gray-300 w-16 h-16" />,
        },
    };

    const status = statusMessages[order_status] || {
        title: "Unknown Status",
        message: "An unknown error occurred.",
        icon: <XCircle className="text-gray-300 w-16 h-16" />,
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="max-w-md w-full"
            >
                <Card>
                    <CardContent>
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5, ease: "backOut" }}
                            className="flex justify-center mb-4"
                        >
                            {status.icon}
                        </motion.div>

                        <h2 className="text-center text-2xl font-semibold text-gray-800">{status.title}</h2>
                        <p className="text-center text-gray-600 mt-2">{status.message}</p>

                        <div className="mt-4 text-gray-700">
                            <p>
                                <span className="font-semibold">Order ID:</span> {order_id}
                            </p>
                            <p>
                                <span className="font-semibold">Amount:</span> ₹{order_amount}
                            </p>
                            <p>
                                <span className="font-semibold">Customer:</span> {customer_details.customer_name}
                            </p>
                            <p>
                                <span className="font-semibold">Email:</span> {customer_details.customer_email}
                            </p>
                        </div>

                        <div className="mt-6 flex justify-center ">
                            <Button
                                onClick={() => navigate("/ordersPage")}
                                className="bg-green-500 hover:bg-green-600 text-white"
                            >
                                Track Order
                            </Button>

                        </div>

                        <div className="mt-6 flex justify-center">
                            <Button onClick={() => navigate("/")}>Go to Home Page</Button>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
};

export default PaymentStatusPage;
