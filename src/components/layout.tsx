import { useState, useEffect } from 'react';
import { FaShoppingCart, FaUser, FaTimesCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { Link, Outlet } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useQuery } from '@tanstack/react-query';
import { client } from '../utils/client';
import { fetchUserAttributes } from 'aws-amplify/auth';
import tanzologo from "../assets/tanzologo.png";
import hamburgerIcon from "../assets/menu.svg"; 

function AppBar() {
    const { signOut, user } = useAuthenticator((context) => [context.user]);
    const [menuOpen, setMenuOpen] = useState(false);
    const [showAuthBar, setShowAuthBar] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const auth = useSelector((state: RootState) => state.auth.isAuth);

    const { data: customer, isLoading } = useQuery({
        queryKey: ['getAndCreateUser'],
        queryFn: async () => {
            const userAttributes = await fetchUserAttributes();
            const { data: existingCustomer } = await client.models.Customer.get({
                id: user.userId,
            });

            if (!existingCustomer) {
                const { data: newCustomer } = await client.models.Customer.create({
                    id: userAttributes.sub,
                    email: userAttributes.email!,
                    name: userAttributes.name!,
                });
                return newCustomer;
            }

            return existingCustomer;
        },
    });

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const closeAuthBar = (e: MouseEvent) => {
            const target = e.target as HTMLElement | null;
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

    return (
        <>
           <header
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600'
                        : 'bg-gradient-to-r from-blue-500 to-blue-700'
                    } backdrop-blur-md`}
            >
                <div className="container mx-auto px-4 py-2">
                    <div className="flex items-center justify-between">
                        {/* Logo and Title */}
                        <div className="flex items-center space-x-4 mb-2">
                            <img
                                src={tanzologo}
                                alt="Tanzo Gifts Logo"
                                className="w-16 h-16 transition-transform duration-300 hover:scale-105"
                            />
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                                Tanzo Gifts
                            </h1>
                        </div>

                        {/* Navigation Links (Desktop) */}
                        <nav className="hidden md:flex space-x-8 items-center">
                            <Link
                                to="/"
                                className="text-white/90 hover:text-white font-semibold text-lg px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white/10 hover:scale-105"
                            >
                                Home
                            </Link>
                            <Link
                                to="/products"
                                className="text-white/90 hover:text-white font-semibold text-lg px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white/10 hover:scale-105"
                            >
                                Products
                            </Link>
                            <Link
                                to="/aboutus"
                                className="text-white/90 hover:text-white font-semibold text-lg px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white/10 hover:scale-105"
                            >
                                About Us
                            </Link>
                            <Link
                                to="/contactus"
                                className="text-white/90 hover:text-white font-semibold text-lg px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white/10 hover:scale-105"
                            >
                                Contact
                            </Link>

                            <FaShoppingCart className="w-7 h-7 text-white ml-4 cursor-pointer transform transition hover:scale-110" />
                        </nav>

                        {/* Auth Section */}
                        <div className="flex items-center space-x-6">
                            <div className="relative auth-dropdown">
                                {auth ? (
                                    <div className="flex items-center">
                                        <button
                                            className="p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
                                            onClick={() => setShowAuthBar(!showAuthBar)}
                                        >
                                            <FaUser className="w-6 h-6 text-white" />
                                        </button>
                                        {showAuthBar && (
                                            <div className="absolute right-0 top-full mt-2 bg-white backdrop-blur-lg bg-opacity-90 shadow-2xl p-4 rounded-xl space-y-3 min-w-[240px] z-50">
                                                <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                                                    <p className="text-sm font-medium text-gray-700">
                                                        {isLoading ? 'Loading...' : customer?.email}
                                                    </p>
                                                    <button
                                                        onClick={() => setShowAuthBar(false)}
                                                        className="text-gray-400 hover:text-gray-600 transition"
                                                    >
                                                        <FaTimesCircle className="w-5 h-5" />
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={signOut}
                                                    className="w-full py-2 px-4 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
                                                >
                                                    Sign Out
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <Link to="/login">
                                        <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full font-semibold flex items-center space-x-2 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                                            <FaUser className="w-5 h-5" />
                                            <span>Sign In</span>
                                        </button>
                                    </Link>
                                )}
                            </div>

                            {/* Mobile Menu Button */}
                            <button
                                onClick={toggleMenu}
                                className="md:hidden p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
                            >
                                <img src={hamburgerIcon} alt="Menu" className="w-6 h-6 invert" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {menuOpen && (
                    <nav className="md:hidden bg-white/90 backdrop-blur-lg mt-2 p-4 space-y-3 shadow-xl rounded-lg mx-4">
                        <Link
                            to="/"
                            className="block text-gray-700 hover:text-purple-600 font-medium px-4 py-2 rounded-lg hover:bg-gray-50 transition"
                        >
                            Home
                        </Link>
                        <Link
                            to="/products"
                            className="block text-gray-700 hover:text-purple-600 font-medium px-4 py-2 rounded-lg hover:bg-gray-50 transition"
                        >
                            Products
                        </Link>
                        <Link
                            to="/aboutus"
                            className="block text-gray-700 hover:text-purple-600 font-medium px-4 py-2 rounded-lg hover:bg-gray-50 transition"
                        >
                            About Us
                        </Link>
                        <Link
                            to="/contactus"
                            className="block text-gray-700 hover:text-purple-600 font-medium px-4 py-2 rounded-lg hover:bg-gray-50 transition"
                        >
                            Contact
                        </Link>
                    </nav>
                )}
            
                
            </header>

            <main className="pt-[64px]">
                <Outlet />
            </main>

            <footer className="bg-gray-800 text-white py-6 mt-4">
                <div className="text-center">&copy; 2024 Tanzo Gifts. All rights reserved.</div>
            </footer>
        </>
    );
}

export default AppBar;
