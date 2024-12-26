import React from "react";
import Sidebar from "../components/admin/sidebar";
import ProductTable from "../components/admin/productTable";
import TopBar from "../components/admin/Topbar";


const AdminDashboard: React.FC = () => {
    return (
        <div className="flex">
            <Sidebar />
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
