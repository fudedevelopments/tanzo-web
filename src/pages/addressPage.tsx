import React, { useState } from "react";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { client } from "../utils/client";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { useNavigate } from "react-router-dom";

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address1: string;
    address2: string;
    pincode: string;
    city: string;
    state: string;
}

interface Errors {
    [key: string]: string;
}

const AddressForm: React.FC = () => {
    const userid = useSelector((state: RootState) => state.auth.username);
    const navigate = useNavigate();

    const [formData, setFormData] = useState<FormData>({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address1: "",
        address2: "",
        pincode: "",
        city: "",
        state: "",
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Errors>({});

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));

        if (errors[id]) {
            setErrors((prev) => {
                const updatedErrors = { ...prev };
                delete updatedErrors[id];
                return updatedErrors;
            });
        }
    };

    const mutation = useMutation({
        mutationKey: ["createaddress"],
        mutationFn: async () => {
            const response = await client.models.address.create({
                id: userid,
                address1: {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    phone: formData.phone,
                    email: formData.email,
                    addressline1: formData.address1,
                    addressline2: formData.address2,
                    city: formData.city,
                    state: formData.state,
                    postalCode: formData.pincode,
                    country: "India",
                },
                choosedIsfirst: true,
                owner: userid,
            });
            return response.data;
        },
        onSuccess: () => {
            navigate("/cartPage");
        },
        onError: (error) => {
            console.error("Error creating address:", error);
            alert("Error creating address. Please try again.");
        },
    });

    const handlePincodeChange = async (
        e: React.ChangeEvent<HTMLInputElement>
    ): Promise<void> => {
        const enteredPincode = e.target.value;
        setFormData((prev) => ({ ...prev, pincode: enteredPincode }));

        if (/^\d{6}$/.test(enteredPincode)) {
            setLoading(true);
            try {
                const response = await axios.get(
                    `https://api.postalpincode.in/pincode/${enteredPincode}`
                );
                const data = response.data[0];

                if (data.Status === "Success") {
                    setFormData((prev) => ({
                        ...prev,
                        city: data.PostOffice[0].District,
                        state: data.PostOffice[0].State,
                    }));
                } else {
                    setFormData((prev) => ({
                        ...prev,
                        city: "",
                        state: "",
                    }));
                    alert("Invalid Pincode! Please try again.");
                }
            } catch (error) {
                console.error("Error fetching pincode details:", error);
                alert("Error fetching pincode details. Please check your network.");
            } finally {
                setLoading(false);
            }
        } else {
            setFormData((prev) => ({
                ...prev,
                city: "",
                state: "",
            }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Errors = {};
        const requiredFields: Array<keyof FormData> = [
            "firstName",
            "lastName",
            "email",
            "phone",
            "address1",
            "pincode",
            "city",
            "state",
        ];

        requiredFields.forEach((field) => {
            if (!formData[field]) {
                newErrors[field] = "This field is required.";
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        if (validateForm()) {
            mutation.mutate();
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
            <h1 className="text-2xl font-semibold text-gray-700 mb-4">
                Shipping Address
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* First Name */}
                <div>
                    <label
                        htmlFor="firstName"
                        className="block text-gray-600 text-sm mb-2"
                    >
                        First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors.firstName ? "border-red-500" : ""
                            }`}
                    />
                    {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.firstName}
                        </p>
                    )}
                </div>

                {/* Last Name */}
                <div>
                    <label
                        htmlFor="lastName"
                        className="block text-gray-600 text-sm mb-2"
                    >
                        Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors.lastName ? "border-red-500" : ""
                            }`}
                    />
                    {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.lastName}
                        </p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <label htmlFor="email" className="block text-gray-600 text-sm mb-2">
                        Email <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors.email ? "border-red-500" : ""
                            }`}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                </div>

                {/* Phone */}
                <div>
                    <label htmlFor="phone" className="block text-gray-600 text-sm mb-2">
                        Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors.phone ? "border-red-500" : ""
                            }`}
                    />
                    {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                    )}
                </div>

                {/* Address Line 1 */}
                <div>
                    <label
                        htmlFor="address1"
                        className="block text-gray-600 text-sm mb-2"
                    >
                        Address Line 1 <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="address1"
                        value={formData.address1}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors.address1 ? "border-red-500" : ""
                            }`}
                    />
                    {errors.address1 && (
                        <p className="text-red-500 text-sm mt-1">{errors.address1}</p>
                    )}
                </div>

                {/* Address Line 2 */}
                <div>
                    <label
                        htmlFor="address2"
                        className="block text-gray-600 text-sm mb-2"
                    >
                        Address Line 2
                    </label>
                    <input
                        type="text"
                        id="address2"
                        value={formData.address2}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                {/* Pincode */}
                <div>
                    <label
                        htmlFor="pincode"
                        className="block text-gray-600 text-sm mb-2"
                    >
                        Pincode <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="pincode"
                        value={formData.pincode}
                        onChange={handlePincodeChange}
                        className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors.pincode ? "border-red-500" : ""
                            }`}
                    />
                    {loading && <p className="text-sm text-gray-500">Fetching...</p>}
                    {errors.pincode && (
                        <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>
                    )}
                </div>

                {/* City */}
                <div>
                    <label htmlFor="city" className="block text-gray-600 text-sm mb-2">
                        City <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="city"
                        value={formData.city}
                        readOnly
                        className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors.city ? "border-red-500" : ""
                            }`}
                    />
                    {errors.city && (
                        <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                    )}
                </div>

                {/* State */}
                <div>
                    <label htmlFor="state" className="block text-gray-600 text-sm mb-2">
                        State <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="state"
                        value={formData.state}
                        readOnly
                        className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors.state ? "border-red-500" : ""
                            }`}
                    />
                    {errors.state && (
                        <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className={`bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 ${mutation.isPending && "opacity-50 cursor-not-allowed"}`}
                    disabled={mutation.isPending}
                >
                    {mutation.isPending ? "Submitting..." : "Submit"}
                </button>
            </form>
        </div>
    );
};

export default AddressForm;
