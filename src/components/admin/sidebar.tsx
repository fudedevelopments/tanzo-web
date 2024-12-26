import React from "react";

const Sidebar: React.FC = () => {
    return (
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
    );
};

export default Sidebar;
