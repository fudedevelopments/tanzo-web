import { useQuery } from "@tanstack/react-query";
import React from "react";
import { client } from "../utils/client";

const PaymentsHistory: React.FC = () => {
    const { data: paymenthistory, error, isLoading } = useQuery({
        queryKey: ["paymenthistory"],
        queryFn: async () => {
            const response = await client.models.Payments.list();
            return response.data;
        },
    });

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="h-16 w-16 bg-gradient-to-r from-blue-500 to-purple-600 animate-spin rounded-full"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-red-500 text-lg font-semibold">
                    Failed to load payment history. Please try again later.
                </p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Displaying the image */}
            <div className="mb-6">
                <img
                    src="https://95b82fcb68e8f0864692afcf13ac17f0.r2.cloudflarestorage.com/productimages/productimages/uploads/1736489130381-image.jpeg"
                    alt="Payment History Banner"
                    className="w-full rounded-md"
                />
            </div>
            <h1 className="text-2xl font-bold mb-6">Payment History</h1>
            <div className="overflow-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-3 px-6 text-left font-medium text-gray-600 uppercase tracking-wider">
                                Payment ID
                            </th>
                            <th className="py-3 px-6 text-left font-medium text-gray-600 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="py-3 px-6 text-left font-medium text-gray-600 uppercase tracking-wider">
                                Time
                            </th>
                            <th className="py-3 px-6 text-left font-medium text-gray-600 uppercase tracking-wider">
                                Amount
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {paymenthistory!.map((payment) => (
                            <tr key={payment.id} className="border-b hover:bg-gray-50">
                                <td className="py-3 px-6">{payment.id}</td>
                                <td
                                    className={`py-3 px-6 font-medium ${payment.status === "success"
                                            ? "text-green-600"
                                            : payment.status === "failure"
                                                ? "text-red-600"
                                                : "text-orange-600"
                                        }`}
                                >
                                    {payment.status}
                                </td>
                                <td className="py-3 px-6">{payment.createdAt}</td>
                                <td className="py-3 px-6">₹{payment.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentsHistory;
