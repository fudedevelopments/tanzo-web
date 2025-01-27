import React from 'react';

interface Order {
    id: number;
    customerName: string;
    orderDetails: string;
    price: string;
    status: string;
}

const orders: Order[] = [
    { id: 1, customerName: 'John Doe', orderDetails: '2x T-Shirts, 1x Jeans', price: '$50.00', status: 'Pending' },
    { id: 2, customerName: 'Jane Smith', orderDetails: '1x Jacket, 3x Socks', price: '$75.00', status: 'Pending' },
    { id: 3, customerName: 'Alex Johnson', orderDetails: '1x Sneakers, 2x Hats', price: '$120.00', status: 'Pending' },
    { id: 4, customerName: 'Emily Davis', orderDetails: '3x Dresses, 2x Scarves', price: '$200.00', status: 'Pending' },
];

const AdminOrdersPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-2xl font-bold text-gray-700 mb-6">Admin Orders</h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse border border-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="border border-gray-200 px-4 py-2 text-left text-gray-600">Order ID</th>
                                <th className="border border-gray-200 px-4 py-2 text-left text-gray-600">Customer Name</th>
                                <th className="border border-gray-200 px-4 py-2 text-left text-gray-600">Order Details</th>
                                <th className="border border-gray-200 px-4 py-2 text-left text-gray-600">Price</th>
                                <th className="border border-gray-200 px-4 py-2 text-left text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id} className="odd:bg-white even:bg-gray-50">
                                    <td className="border border-gray-200 px-4 py-2 text-gray-700">{order.id}</td>
                                    <td className="border border-gray-200 px-4 py-2 text-gray-700">{order.customerName}</td>
                                    <td className="border border-gray-200 px-4 py-2 text-gray-700">{order.orderDetails}</td>
                                    <td className="border border-gray-200 px-4 py-2 text-gray-700">{order.price}</td>
                                    <td className="border border-gray-200 px-4 py-2">
                                        <div className="flex space-x-2">
                                            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Accept</button>
                                            <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Decline</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminOrdersPage;
