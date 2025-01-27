import React from "react";

// Define the Team Member type
interface TeamMember {
    id: number;
    name: string;
    position: string;
    bio: string;
    imageUrl: string;
}

// Sample data for team members
const teamMembers: TeamMember[] = [
    {
        id: 1,
        name: "Praveen M",
        position: "Founder",
        bio: "Praveen leads Tanzo Gifts with a passion for creating innovative, personalized gifts using the latest technologies like laser engraving and sublimation printing.",
        imageUrl: "/src/assets/praveen.jpg",
    },
    {
        id: 2,
        name: "Dinesh Kumar V S",
        position: "Chief Marketing Officer",
        bio: "Dinesh is responsible for showcasing the unique offerings of Tanzo Gifts to a global audience through strategic marketing initiatives.",
        imageUrl: "/src/assets/dineshkumar.jpg",
    },
    {
        id: 3,
        name: "Paul Earnest J",
        position: "Head of Product Development",
        bio: "Paul ensures every product is crafted to perfection using high-quality acrylic, MDF, and advanced printing technologies.",
        imageUrl: "/src/assets/paul.jpg",
    },
    {
        id: 4,
        name: "Gokul Prasath S R",
        position: "Operations Manager",
        bio: "Gokul oversees the smooth operation of our production and delivery systems, ensuring customer satisfaction at every step.",
        imageUrl: "/src/assets/gokul.jpg",
    },
    {
        id: 5,
        name: "Jerin",
        position: "Designer",
        bio: "jerin brings creativity and vision to life, crafting stunning designs that align with our brand's values and captivate our audience.",
        imageUrl: "/src/assets/jerin.jpg",
    }

];

const AboutUs: React.FC = () => {
    return (
        <div className="bg-gray-50 min-h-screen p-8">
            {/* Business Details */}
            <section className="text-center mb-12">
                <h1 className="text-5xl font-bold text-gray-800 mb-6">About Tanzo Gifts</h1>
                <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
                    Tanzo Gifts specializes in creating personalized gift products using state-of-the-art techniques like laser
                    engraving, acrylic crafting, MDF designs, sublimation, and advanced printing. Our mission is to deliver
                    high-quality, unique, and memorable gifts that leave a lasting impression.
                </p>
            </section>


            {/* Services Section */}
            <section className="bg-white py-12 px-6 rounded-lg shadow-md mb-12">
                <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">Our Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center">
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">Laser Engraving</h3>
                        <p className="text-gray-600">Precise and intricate designs etched into a variety of surfaces, creating unique and elegant gifts.</p>
                    </div>
                    <div className="text-center">
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">Acrylic & MDF Crafting</h3>
                        <p className="text-gray-600">Custom-crafted products using acrylic and MDF for durable and visually stunning results.</p>
                    </div>
                    <div className="text-center">
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">Sublimation Printing</h3>
                        <p className="text-gray-600">High-quality full-color printing on a wide range of materials for vibrant, personalized gifts.</p>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section>
                <h2 className="text-4xl font-semibold text-gray-800 mb-8 text-center">Meet Our Team</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {teamMembers.map((member) => (
                        <div
                            key={member.id}
                            className="bg-white shadow-lg rounded-lg overflow-hidden text-center p-6 hover:shadow-2xl transition-shadow duration-300"
                        >
                            <img
                                src={member.imageUrl}
                                alt={member.name}
                                className="w-33 h-33 mx-auto rounded-full mb-4 border-4 border-gray-300 object-cover transition-transform duration-300 hover:scale-200"
                            />


                            <h3 className="text-xl font-semibold text-gray-700 mb-2">{member.name}</h3>
                            <p className="text-gray-500 mb-4">{member.position}</p>
                            <p className="text-gray-600 text-sm">{member.bio}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="mt-12 text-center">
                <h2 className="text-3xl font-semibold text-gray-800 mb-4">Create Something Unique</h2>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-6">
                    Looking for a one-of-a-kind gift? Let Tanzo Gifts help you create a personalized masterpiece that will leave
                    a lasting impression. Get in touch with us today to bring your ideas to life.
                </p>
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                    Explore Our Products
                </button>
            </section>

            {/* FAQ Section */}
            <section className="mt-12 py-12 px-6 bg-gray-100 rounded-lg">
                <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">Frequently Asked Questions</h2>
                <div className="max-w-4xl mx-auto space-y-6">
                    <div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">What types of materials do you use?</h3>
                        <p className="text-gray-600">We specialize in acrylic, MDF, and other high-quality materials to craft our gifts.</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">Can I provide my own design?</h3>
                        <p className="text-gray-600">Absolutely! Share your ideas or designs with us, and we’ll bring them to life.</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">Do you handle bulk orders?</h3>
                        <p className="text-gray-600">Yes, we offer bulk order services for corporate gifting and special events.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
