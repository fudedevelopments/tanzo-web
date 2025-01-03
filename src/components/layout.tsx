import { useState, useEffect } from 'react';
import { FaShoppingCart, FaBars, FaTimes, FaUser, FaTimesCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { Link, Outlet } from 'react-router-dom';

function AppBar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showAuthBar, setShowAuthBar] = useState(false);
    const auth = useSelector((state: RootState) => state.auth.isAuth);
    const username = useSelector((state: RootState) => state.auth.username);

    useEffect(() => {
        const closeAuthBar = (e: MouseEvent) => {
            const target = e.target as HTMLElement | null; // Safely cast and handle possible null
            if (target && !target.closest('.auth-dropdown')) {
                setShowAuthBar(false);
            }
        };
        if (showAuthBar) {
            document.addEventListener('click', closeAuthBar);
        } else {
            document.removeEventListener('click', closeAuthBar);
        }
        return () => {
            document.removeEventListener('click', closeAuthBar);
        };
    }, [showAuthBar]);


    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleSignOut = () => {
        // Logic to handle sign-out
    };

    return (
        <>
            <header className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-4 px-6 shadow-lg">
                <div className="flex items-center justify-between">
                    {/* Logo and Title */}
                    <div className="flex items-center space-x-4">
                        <img src="/src/assets/tanzologo.png" alt="Tanzo Gifts Logo" className="w-12 h-12" />
                        <h1 className="text-2xl font-bold">Tanzo Gifts</h1>
                    </div>

                    {/* Cart Icon */}
                    <div className="flex items-center space-x-6 md:hidden">
                        <FaShoppingCart className="w-6 h-6 cursor-pointer" />
                        <button onClick={toggleMenu} className="focus:outline-none">
                            {menuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
                        </button>
                    </div>

                    {/* Navigation Links (Desktop) */}
                    <nav className="hidden md:flex space-x-8 text-lg">
                        <a href="/home" className="hover:text-gray-200 transition">Home</a>
                        <a href="/products" className="hover:text-gray-200 transition">Products</a>
                        <a href="/custom-orders" className="hover:text-gray-200 transition">Custom Orders</a>
                        <a href="/contact" className="hover:text-gray-200 transition">Contact Us</a>
                        <FaShoppingCart className="w-6 h-6 cursor-pointer" />
                    </nav>

                    <div className="relative auth-dropdown flex items-center space-x-4"> {/* Reduced space */}
                        {auth ? (
                            <div className="flex items-center">
                                <button
                                    className="flex items-center focus:outline-none"
                                    onClick={() => setShowAuthBar(!showAuthBar)}
                                >
                                    <FaUser className="w-6 h-6" />
                                </button>
                                {showAuthBar && (
                                    <div
                                        className="absolute right-0 top-full mt-2 bg-white text-black shadow-lg p-4 rounded-md space-y-2 z-50"
                                    > {/* Ensures dropdown appears below the button */}
                                        <div className="flex justify-between items-center">
                                            <p className="text-sm font-medium">{username}</p>
                                            <button
                                                onClick={() => setShowAuthBar(false)}
                                                className="text-gray-500 hover:text-gray-700"
                                            >
                                                <FaTimesCircle className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <button
                                            onClick={handleSignOut}
                                            className="bg-red-500 text-white py-2 px-4 rounded-md w-full"
                                        >
                                            Sign Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link to="/login">
                                <button className="bg-red-500 text-white py-2 px-4 rounded-md flex items-center">
                                    <FaUser className="w-6 h-6 mr-2" /> Sign In
                                </button>
                            </Link>
                        )}
                    </div>

                </div>

                {/* Mobile Menu */}
                {menuOpen && (
                    <nav className="flex flex-col mt-4 space-y-4 md:hidden">
                        <a href="/home" className="hover:text-gray-200 transition">Home</a>
                        <a href="/products" className="hover:text-gray-200 transition">Products</a>
                        <a href="/custom-orders" className="hover:text-gray-200 transition">Custom Orders</a>
                        <a href="/contact" className="hover:text-gray-200 transition">Contact Us</a>
                    </nav>
                )}
            </header>

            <main>
                <Outlet />
            </main>

            <footer className="bg-gray-800 text-white py-6 mt-4">
                <div className="text-center">&copy; 2024 Tanzo Gifts. All rights reserved.</div>
            </footer>
        </>
    );
}

export default AppBar;
