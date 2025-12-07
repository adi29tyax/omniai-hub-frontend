// services/billing.ts
import { api } from "./api";

export async function createStripeCheckout(planId: string) {
    // Placeholder implementation
    return { checkout_url: "https://checkout.stripe.com/mock" };
}

export async function createRazorpayOrder(planId: string) {
    // Placeholder implementation
    return { order_id: "order_mock_123" };
}
