
import { FaShippingFast, FaHeadset, FaGift, FaTags } from "react-icons/fa";

const BenefitSection = () => {
    const benefits = [
        {
            icon: <FaShippingFast className="text-4xl md:text-5xl text-orange-600" />,
            title: "Fast & Free Shipping",
            description: "Get your orders delivered quickly and free of charge for orders above $50.",
        },
        {
            icon: <FaHeadset className="text-4xl md:text-5xl text-orange-600" />,
            title: "24/7 Customer Support",
            description: "Reach out to our friendly support team anytime you need assistance.",
        },
        {
            icon: <FaGift className="text-4xl md:text-5xl text-orange-600" />,
            title: "Personalized Gifts",
            description: "Create memorable gifts tailored to your loved ones’ preferences.",
        },
        {
            icon: <FaTags className="text-4xl md:text-5xl text-orange-600" />,
            title: "Unbeatable Prices",
            description: "Shop high-quality products without breaking the bank.",
        },
    ];

    return (
        <section className="benefits-section bg-gradient-to-b from-gray-100 to-white py-12 md:py-20">
            <div className="container mx-auto text-center px-4 md:px-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 md:mb-12">
                    Why Choose Us?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
                    {benefits.map((benefit, index) => (
                        <div
                            key={index}
                            className="benefit-card bg-white p-6 md:p-8 shadow-md md:shadow-lg rounded-lg hover:shadow-2xl transition-shadow duration-300"
                        >
                            <div className="icon mb-4 md:mb-6">{benefit.icon}</div>
                            <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2 md:mb-4">
                                {benefit.title}
                            </h3>
                            <p className="text-sm md:text-base text-gray-600">{benefit.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BenefitSection;
