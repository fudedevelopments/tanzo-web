import React from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';

const ContactUs: React.FC = () => {
    return (
        <div className="bg-gray-50 min-h-screen p-8 relative">
            <section className="text-center mb-12">
                <h1 className="text-5xl font-bold text-gray-800 mb-6">Contact Us</h1>
                <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
                    Have questions, feedback, or a custom order request? We’d love to hear from you! Reach out to Tanzo Gifts
                    and let us help you create something truly unique and special.
                </p>
            </section>

            <section className="bg-white py-12 px-6 rounded-lg shadow-md mb-12">
                <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center">
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">Mobile</h3>
                        <p className="text-gray-600">7904329569</p>
                    </div>
                    <div className="text-center">
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">WhatsApp</h3>
                        <p className="text-gray-600">7904329569</p>
                    </div>
                    <div className="text-center">
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">Phone</h3>
                        <p className="text-gray-600">04294 245046</p>
                    </div>
                    <div className="text-center">
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">Email</h3>
                        <p className="text-gray-600">shoptanzo@gmail.com</p>
                    </div>
                    <div className="text-center">
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">Address</h3>
                        <p className="text-gray-600">Slatter Nagar, Perundurai, Erode, Tamil Nadu, India - 638053</p>
                    </div>
                </div>
            </section>

            <section className="mt-12 text-center">
                <h2 className="text-3xl font-semibold text-gray-800 mb-4">Follow Us</h2>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-6">
                    Stay connected and follow us on social media for the latest updates, promotions, and gift ideas.
                </p>
                <div className="flex justify-center space-x-6">
                    <a
                        href="https://www.facebook.com/tanzo_gifts"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-2xl"
                    >
                        <i className="fab fa-facebook"></i>
                    </a>
                    <a
                        href="https://www.instagram.com/tanzo_gifts"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-600 hover:text-pink-800 text-2xl"
                    >
                        <i className="fab fa-instagram"></i>
                    </a>
                </div>
            </section>

            {/* Floating WhatsApp Icon */}
            <a
                href="https://wa.me/7904329569"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition duration-200"
                title="Chat with us on WhatsApp"
            >
                <i className="fab fa-whatsapp text-3xl"></i>
            </a>
        </div>
    );
};

export default ContactUs;
