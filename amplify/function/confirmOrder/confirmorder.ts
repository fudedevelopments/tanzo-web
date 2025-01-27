import { env } from "$amplify/env/confirmorderFunc";
import { Cashfree } from "cashfree-pg";
import { generateClient } from "aws-amplify/data";
import { Schema } from "../../data/resource";
import { Amplify } from "aws-amplify";
import { getAmplifyDataClientConfig } from "@aws-amplify/backend/function/runtime";

// Configure Cashfree
Cashfree.XClientId = env.XCLIENTID;
Cashfree.XClientSecret = env.XCLIENTSECRET;
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

// Configure Amplify
const { resourceConfig, libraryOptions } = await getAmplifyDataClientConfig(env);

Amplify.configure(resourceConfig, libraryOptions);
// Generate Amplify Data Client
const client = generateClient<Schema>();

export const handler = async (event: any) => {
    try {
        // Verify Cashfree Webhook Signature
        const webhookverify = Cashfree.PGVerifyWebhookSignature(
            event.headers["x-webhook-signature"],
            event.body,
            event.headers["x-webhook-timestamp"]
        );

        const parsedData = JSON.parse(webhookverify.raw.toString());
        
        const customerId = parsedData.data.customer_details.customer_id;
        const paymentId = parsedData.data.payment.payment_id;

        const verifypayment = async (paymentId: string): Promise<boolean> => {
            try {
                const response = await client.models.Payments.get({ id: paymentId });
                if (response?.data) {
                    // Payment ID exists
                    console.log(`Payment ID ${paymentId} already exists in the database.`);
                    return false;
                }
                return true;
            } catch (err) {
                console.error("Error verifying payment ID", err);
                return false; // Default to false on error for safety
            }
        };


        // Create payment history
        const createpaymenthistory = async (status: string) => {
            try {
                const response = await client.models.Payments.create({
                    id: parsedData.data.payment.cf_payment_id,
                    userId: customerId,
                    amount: parsedData.data.order.order_amount,
                    paymentmethod: parsedData.data.payment.payment_group,
                    paymentcurrency: parsedData.data.payment.payment_currency,
                    owner: customerId,
                    status: status,
                });
                console.log(`Payment history created with status: ${status}`, response);
            } catch (err) {
                console.error("Error creating payment history", err);
            }
        };

        // Skip processing if payment ID already exists
        const isPaymentNew = await verifypayment(paymentId);
        if (isPaymentNew) {
        

            if (webhookverify.type === "PAYMENT_SUCCESS_WEBHOOK") {
                await createpaymenthistory("success");

                // Fetch customer details
                const getCustomer = await client.models.Customer.get({ id: customerId });
                if (!getCustomer.data) {
                    console.error("Customer not found");
                    return;
                }

                const cartProducts = await getCustomer.data?.cartproducts();
                if (!cartProducts?.data || cartProducts.data.length === 0) {
                    console.error("No products in the customer's cart");
                    return;
                }

                // Process cart products
                for (const cProduct of cartProducts.data) {
                    try {
                        const createOrder = await client.models.Orders.create({
                            owner: cProduct.userId,
                            product: cProduct.product,
                            cdeatails: cProduct.cdeatails,
                            userId: cProduct.userId,
                            quantity: cProduct.quantity,
                        });

                        if (createOrder.data) {
                            await client.models.CartProducts.delete({ id: cProduct.id });
                        } else {
                            console.error(`Failed to create order for cart product ID: ${cProduct.id}`);
                        }
                    } catch (orderErr) {
                        console.error(`Error processing cart product ID: ${cProduct.id}`, orderErr);
                    }
                }
            } else if (webhookverify.type === "PAYMENT_FAILED_WEBHOOK") {
                await createpaymenthistory("failure");
                console.log("Payment failed, history recorded.");
            } else if (webhookverify.type === "PAYMENT_USER_DROPPED_WEBHOOK") {
                await createpaymenthistory("user_dropped");
                console.log("Payment dropped by user, history recorded.");
            } else {
                console.log("Webhook not recognized or verified");
            }
            
        }
    } catch (err) {
        console.error("Error handling webhook event", err);
    }
};
