import { useState } from "react";
import { useNavigate } from "react-router-dom";

type TopNavigationBarProps = {
    username?: string | null;
    onSignOut: () => void;
};

function TopNavigationBar({ username, onSignOut } : TopNavigationBarProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <nav className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <img
                            className="h-20 w-20 rounded-full"
                            src="/src/assets/tanzologo.png"
                            alt="Tanzo Gifts Logo"
                        />
                        <span className="ml-3 text-white font-bold text-xl">Tanzo Gifts</span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8 items-center">
                        <a
                            href="#home"
                            className="text-white text-sm font-medium hover:text-gray-200 transition"
                        >
                            Home
                        </a>
                        <a
                            href="#products"
                            className="text-white text-sm font-medium hover:text-gray-200 transition"
                        >
                            Products
                        </a>
                        <a
                            href="#custom-gifts"
                            className="text-white text-sm font-medium hover:text-gray-200 transition"
                        >
                            Custom Gifts
                        </a>
                        <a
                            href="#contact"
                            className="text-white text-sm font-medium hover:text-gray-200 transition"
                        >
                            Contact
                        </a>

                        {/* Conditionally render Login or SignOut */}
                        {username ? (
                            <div className="flex items-center space-x-4">
                                <span className="text-white text-sm font-medium">{`Hello, ${username}`}</span>
                                <button
                                    onClick={onSignOut}
                                    className="bg-white text-red-500 font-semibold py-2 px-4 rounded-md hover:bg-red-500 hover:text-white transition"
                                >
                                    Sign Out
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => navigate("/login")}
                                className="bg-white text-red-500 font-semibold py-2 px-4 rounded-md hover:bg-red-500 hover:text-white transition"
                            >
                                Login
                            </button>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-white focus:outline-none"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {isMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden">
                        <div className="flex flex-col space-y-4 mt-4">
                            <a
                                href="#home"
                                className="text-white text-sm font-medium hover:text-gray-200 transition"
                            >
                                Home
                            </a>
                            <a
                                href="#products"
                                className="text-white text-sm font-medium hover:text-gray-200 transition"
                            >
                                Products
                            </a>
                            <a
                                href="#custom-gifts"
                                className="text-white text-sm font-medium hover:text-gray-200 transition"
                            >
                                Custom Gifts
                            </a>
                            <a
                                href="#contact"
                                className="text-white text-sm font-medium hover:text-gray-200 transition"
                            >
                                Contact
                            </a>

                            {/* Conditionally render Login or SignOut */}
                            {username ? (
                                <div className="flex flex-col space-y-2">
                                    <span className="text-white text-sm font-medium text-center">{`Hello, ${username}`}</span>
                                    <button
                                        onClick={onSignOut}
                                        className="bg-white text-red-500 font-semibold py-2 px-4 rounded-md hover:bg-red-500 hover:text-white transition"
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => navigate("/login")}
                                    className="bg-white text-red-500 font-semibold py-2 px-4 rounded-md hover:bg-red-500 hover:text-white transition"
                                >
                                    Login
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default TopNavigationBar;
