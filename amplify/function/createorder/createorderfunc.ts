import axios from "axios";
import { env } from "$amplify/env/createorder";
import { Schema } from "../../data/resource";



export const handler: Schema["createOrderCF"]['functionHandler'] = async (event) => {
    try {
        const headers = {
            "x-client-id": env.XCLIENTID,
            "x-client-secret": env.XCLIENTSECRET,
            "x-api-version": "2023-08-01",
            "Content-Type": "application/json",
            "Accept": "application/json"
        };

        const requestBody = {
            "order_amount": event.arguments.order_amount,
            "order_currency": "INR",
            "customer_details": {
                "customer_id": event.arguments.customerId,
                "customer_name": event.arguments.customerName,
                "customer_email": event.arguments.customerEmail,
                "customer_phone": event.arguments.customerPhone
            },
            "order_meta": {
                "return_url": "https://tanzo.in/paymentstatus/{order_id}"
            }
        };

        const response = await axios.post("https://sandbox.cashfree.com/pg/orders", requestBody, { headers });
        // Sanitize and return the response
        return response.data;

    } catch (error) {
        console.error("Error in creating Cashfree order:", error);
        return { error: "Failed to create order", details: error};
    }
};
