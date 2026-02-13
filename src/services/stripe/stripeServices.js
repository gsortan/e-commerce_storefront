"use server";

import Stripe from "stripe";
import { currentUser } from "@clerk/nextjs/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function createCheckout(cartItems) {

  const user = await currentUser();
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    shipping_address_collection: {
      allowed_countries: ["CA", "US"],
    },
    metadata: {
      userId: user.id,
    },
    line_items: cartItems.map((item) => ({
      quantity: item.quantity,
      price_data: {
        currency: "cad",
        unit_amount: Math.round(item.price * 100),
        product_data: {
          name: item.title,
          images: [item.image],
          metadata: {
            productId: item.productId,
          },
        },
      },
    })),
    success_url: `${process.env.APP_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.APP_BASE_URL}/cart`,
  });

  return session.url;
}
