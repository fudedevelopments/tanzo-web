import { load } from "@cashfreepayments/cashfree-js";

export async function initializeCashfree() {
    try {
        const cashfree = await load({
            mode: "sandbox",
        });
        return cashfree;
    } catch (error) {
        console.error("Error loading Cashfree SDK:", error);
        throw error;
    }
}

