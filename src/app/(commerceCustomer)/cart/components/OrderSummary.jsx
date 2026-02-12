"use client";

import { useContext } from "react";
import { CartContext } from "./shopping-cart-context";
import CheckoutButton from "./CheckoutButton";

export default function OrderSummary() {
  const { items, totalPrice, totalQuantity } = useContext(CartContext);

  return (
 <>
 <div className="p-4">
      <h1 className="text-lg font-semibold mb-4">Order Summary</h1>

      <div className="flex justify-between">
        <p>Number of Items:</p>
        <p>{totalQuantity}</p>
      </div>

      <div className="flex justify-between mt-2">
        <p>Total Price:</p>
        <p>${totalPrice.toFixed(2)}</p>
      </div>
    <div className="flex mt-4 justify-center"><CheckoutButton cartItems={items}/>  </div> 
      </div>
   </>
  );
}

