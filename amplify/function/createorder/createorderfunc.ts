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
                "notify_url": "https://webhook.site/4c43138d-d1b0-4d35-ade1-3c46ffd49b0a"
            }
        };

        const response = await axios.post("https://sandbox.cashfree.com/pg/orders", requestBody, { headers });

        // Log the raw response
        console.log("Raw Cashfree response:", response.data);

        // Sanitize and return the response
        return response.data;

    } catch (error) {
        console.error("Error in creating Cashfree order:", error);
        return { error: "Failed to create order", details: error};
    }
};
