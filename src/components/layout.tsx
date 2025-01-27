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
import hamburgerIcon from "../assets/menu.svg"; // Replace with your custom icon

function AppBar() {
    const { signOut, user } = useAuthenticator((context) => [context.user]);
    const [menuOpen, setMenuOpen] = useState(false);
    const [showAuthBar, setShowAuthBar] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const auth = useSelector((state: RootState) => state.auth.isAuth);

    // Fetch customer data only if authenticated
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

    // Scroll Effect for AppBar
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
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'backdrop-blur-md bg-blue-200 shadow-lg' : 'bg-blue-200/60 backdrop-blur-none'
                    }`}
            >
                <div className="flex items-center justify-between py-1 px-6 ">
                    {/* Logo and Title */}
                    <div className="flex items-center space-x-4">
                        <img src={tanzologo} alt="Tanzo Gifts Logo" className="w-18 h-24" />
                        <h1 className="text-4xl font-serif text-black">Tanzo Gifts</h1>
                    </div>

                    {/* Cart Icon and Hamburger Menu (Mobile) */}
                    <div className="flex items-center space-x-6 md:hidden">
                        <FaShoppingCart className="w-6 h-6 text-gray-500 cursor-pointer" />
                        <button onClick={toggleMenu} className="focus:outline-none">
                            <img src={hamburgerIcon} alt="Menu" className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Navigation Links (Desktop) */}
                    <nav className="hidden md:flex space-x-8 text-lg text-gray-600">
                        <a href="/" className="hover:text-gray-1000 transition">Home</a>
                        <a href="/products" className="hover:text-gray-200 transition">Products</a>
                        <a href="/aboutus" className="hover:text-gray-200 transition">About us</a>
                        <a href="/contactus" className="hover:text-gray-200 transition">Contact Us</a>
                        <FaShoppingCart className="w-6 h-6 text-black cursor-pointer" />
                    </nav>

                    {/* Auth Dropdown */}
                    <div className="relative auth-dropdown flex items-center space-x-4">
                        {auth ? (
                            <div className="flex items-center">
                                <button
                                    className="flex items-center focus:outline-none"
                                    onClick={() => setShowAuthBar(!showAuthBar)}
                                >
                                    <FaUser className="w-6 h-6 text-gray-500" />
                                </button>
                                {showAuthBar && (
                                    <div className="absolute right-0 top-full mt-2 bg-white text-black shadow-lg p-4 rounded-md space-y-2 z-50">
                                        <div className="flex justify-between items-center">
                                            {isLoading ? (
                                                <p className="text-sm font-medium">Loading...</p>
                                            ) : (
                                                <p className="text-sm font-medium">{customer?.email}</p>
                                            )}
                                            <button
                                                onClick={() => setShowAuthBar(false)}
                                                className="text-gray-500 hover:text-gray-700"
                                            >
                                                <FaTimesCircle className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <button
                                            onClick={signOut}
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
                                    <FaUser className="w-5 h-5 mr-2" /> Sign In
                                </button>
                            </Link>
                        )}
                    </div>
                </div>

                {/* Mobile Menu */}
                {menuOpen && (
                    <nav className="flex flex-col mt-0 space-y-4 md:hidden bg-blue-100 text-gray-600 p-4 shadow-lg rounded-lg">
                        <a href="/home" className="hover:text-gray-700 transition">Home</a>
                        <a href="/products" className="hover:text-gray-700 transition">Products</a>
                        <a href="/custom-orders" className="hover:text-gray-700 transition">Custom Orders</a>
                        <a href="/aboutus" className="hover:text-gray-700 transition">About Us</a>
                        <a href="/contact" className="hover:text-gray-700 transition">Contact Us</a>
                        {auth && (
                            <button
                                onClick={signOut}
                                className="bg-red-500 text-white py-2 px-4 rounded-md w-full"
                            >
                                Sign Out
                            </button>
                        )}
                        {!auth && (
                            <></>
                        )}
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
