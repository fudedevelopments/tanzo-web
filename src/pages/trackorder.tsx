import React, { useState } from "react";
import { CheckCircle, Circle } from "lucide-react";
import { motion } from "framer-motion";

const orderStatuses = [
    "Order Placed",
    "Pending",
    "Processing",
    "Confirmed",
    "Cancelled",
    "Verification Needed",
    "Delayed",
    "Dispatched",
    "Shipped",
    "Delivered",
];

const TrackOrder: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNextStatus = () => {
        if (currentIndex < orderStatuses.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-2xl">
            <h2 className="text-2xl font-semibold text-center mb-6">Track Your Order</h2>
            <div className="relative">
                {orderStatuses.map((status, index) => (
                    <div key={status} className="flex items-center relative">
                        {index > 0 && (
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: currentIndex >= index ? "100%" : "0%" }}
                                transition={{ duration: 0.5 }}
                                className={`absolute left-5 top-5 h-1 ${currentIndex >= index ? "bg-blue-500" : "bg-gray-300"} w-full`}
                            />
                        )}
                        <div className="relative z-10 flex items-center space-x-3 py-3">
                            {currentIndex >= index ? (
                                <CheckCircle className="text-blue-500 w-6 h-6" />
                            ) : (
                                <Circle className="text-gray-400 w-6 h-6" />
                            )}
                            <span className={`text-lg ${currentIndex >= index ? "text-blue-600 font-semibold" : "text-gray-500"}`}>{status}</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-6">
                <button
                    onClick={handleNextStatus}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
                    disabled={currentIndex >= orderStatuses.length - 1}
                >
                    Next Status
                </button>
            </div>
        </div>
    );
};

export default TrackOrder;
