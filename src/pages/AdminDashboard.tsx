import React from "react";
import ProductTable from "../components/admin/productTable";
import TopBar from "../components/admin/Topbar";


const AdminDashboard: React.FC = () => {
    return (
        <div className="flex">
            <aside className="w-64 bg-gradient-to-b from-gray-800 to-gray-900 text-white h-screen p-4">
                <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
                <nav>
                    <ul>
                        <li className="mb-4">
                            <a href="#" className="hover:text-gray-300">
                                Dashboard
                            </a>
                        </li>
                        <li className="mb-4">
                            <a href="/home-layout" className="hover:text-gray-300">
                                Home Layout
                            </a>
                        </li>
                        <li className="mb-4">
                            <a href="#" className="hover:text-gray-300">
                                Products
                            </a>
                        </li>
                        <li className="mb-4">
                            <a href="#" className="hover:text-gray-300">
                                Orders
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-gray-300">
                                Settings
                            </a>
                        </li>
                    </ul>
                </nav>
            </aside>
            <div className="flex-1 bg-gray-100">
                <TopBar />
                <main className="p-6 space-y-6">
                    <ProductTable />
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
