import { env } from "$amplify/env/confirmorderFunc";
import { Cashfree } from "cashfree-pg";

Cashfree.XClientId = env.XCLIENTID;
Cashfree.XClientSecret = env.XCLIENTSECRET;
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

export const handler = async (event: any) => {
    const version = "2023-08-01";
    const orderId = event.queryStringParameters?.order_id; 

    if (!orderId) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: "Order ID is required.",
            }),
        };
    }

    try {
        const response = await Cashfree.PGFetchOrder(version, orderId);
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Order fetched successfully.",
                data: response.data,
            }),
        };
    } catch (error: any) {
        return {
            statusCode: error.response?.status || 500,
            body: JSON.stringify({
                message: error.response?.data?.message || "An error occurred while fetching the order.",
            }),
        };
    }
};
