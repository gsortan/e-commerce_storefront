"use client";
import { createCheckout } from "@/services/stripe/stripeServices";

export default function CheckoutButton({ cartItems }) {

  async function handleClick() {
    const url = await createCheckout(cartItems);
    window.location.href = url;
  }

  return (
    <button
      onClick={handleClick}
      className="
      w-64
      cursor-pointer
      bg-yellow-300
      text-black
      font-semibold
      py-4
      px-4
      shadow-lg
      rounded-lg
      hover:bg-yellow-400
      active:scale-[0.98]
      transition
  "
    >
      Proceed to Checkout
    </button>
  );
}
