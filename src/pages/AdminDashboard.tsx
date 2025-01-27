import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductTable from "../components/admin/productTable";
import TopBar from "../components/admin/Topbar";
import AdminOrdersPage from "../components/admin/adminOrdersPage";
import HomeLayout from "../components/admin/HomeLayout";
import AdminSettingsPage from "../components/admin/adminsettingspage";

const AdminDashboard: React.FC = () => {
    const [searchParams] = useSearchParams(); // Get URL search params
    const defaultTopic = searchParams.get("topic") || "orders"; // Default to "orders" if no topic is provided
    const [activeTopic, setActiveTopic] = useState<string>(defaultTopic);

    // Sidebar items
    const sidebarItems = [
        { id: "orders", label: "Orders", component: <AdminOrdersPage /> },
        { id: "products", label: "Products", component: <ProductTable /> },
        { id: "home-layout", label: "Homelayout", component: <HomeLayout /> },
        { id: "settings", label: "Settings", component: <AdminSettingsPage /> },
    ];

    // Update the active topic when the URL param changes
    useEffect(() => {
        setActiveTopic(defaultTopic);
    }, [defaultTopic]);

    // Find the active component
    const activeComponent = sidebarItems.find((item) => item.id === activeTopic)?.component;

    return (
        <div className="flex">
            {/* Sidebar */}
            <aside className="w-64 bg-gradient-to-b from-gray-800 to-gray-900 text-white h-screen p-4">
                <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
                <nav>
                    <ul>
                        {sidebarItems.map((item) => (
                            <li key={item.id} className="mb-4">
                                <button
                                    onClick={() => setActiveTopic(item.id)}
                                    className={`block text-left w-full p-2 rounded ${activeTopic === item.id ? "bg-gray-700 text-white" : "hover:text-gray-300"
                                        }`}
                                >
                                    {item.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 bg-gray-100">
                <TopBar />
                <main className="p-6 space-y-6">{activeComponent}</main>
            </div>
        </div>
    );
};

export default AdminDashboard;
