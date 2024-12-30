import { client } from '../utils/client.ts';
import {cashfree}  from "../utils/cashfree.js";

const CheckoutPage = () => {

    const product = {
        name: 'Handmade Lavender Soap',
        price: 10.99,
        deliveryFee: 2.99,
        tax: 1.32,
    };

    const calculateTotal = () => {
        return (product.price + product.deliveryFee + product.tax).toFixed(2);
    };
    
    const handlePayment = async () => {
        try {
            const response = await client.queries.createOrderCF({
                order_amount: 123,
                customerId: "1231233333",
                customerName: "Rahu333",
                customerEmail: "stark@gmail.com",
                customerPhone: "+919090407368"
            });
            
            const jsonString = response.data;

            if (jsonString) { 
                const parsedData = JSON.parse(jsonString.toString());
                console.log(parsedData.payment_session_id);
                let checkoutoptions = {
                    paymentSessionId: parsedData.payment_session_id,
                    redirectTarget: "_self"
                }
                cashfree.checkout(checkoutoptions);
            } else {
                console.error("Received null data from createOrderCF");
            }
        } catch (error) {
            // Handle any errors that occur during the request or parsing
            console.error("Error handling payment:", error);
        }
    };


    

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
            <div className="bg-white shadow-md rounded-md p-6 w-full max-w-4xl h-full flex flex-col justify-between">
                <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center">Checkout</h2>
                <div className="mb-6 border-b pb-4">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-600 text-lg">Product:</span>
                        <span className="text-gray-900 text-lg font-medium">{product.name}</span>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-600 text-lg">Price:</span>
                        <span className="text-gray-900 text-lg font-medium">${product.price.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-600 text-lg">Delivery Fee:</span>
                        <span className="text-gray-900 text-lg font-medium">${product.deliveryFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 text-lg">Tax:</span>
                        <span className="text-gray-900 text-lg font-medium">${product.tax.toFixed(2)}</span>
                    </div>
                </div>
                <div className="flex justify-between items-center text-xl font-semibold mb-6">
                    <span className="text-gray-800">Total:</span>
                    <span className="text-green-600">${calculateTotal()}</span>
                </div>
                <button
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-white text-lg py-3 px-4 rounded-md focus:outline-none focus:ring focus:ring-yellow-300 transition"
                    onClick={handlePayment}
                >
                    Proceed to Payment
                </button>
                <div className="mt-6 text-sm text-gray-500 text-center">
                    By proceeding, you agree to our <a href="#" className="text-blue-500 hover:underline">Terms and Conditions</a>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
