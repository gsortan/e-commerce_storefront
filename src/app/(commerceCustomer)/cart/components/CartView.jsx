"use client";

import { useContext } from "react";
import { CartContext } from "./shopping-cart-context";
import CartList from "./CartList";
import OrderSummary from "./OrderSummary";

export default function CartView() {
  const { totalQuantity } = useContext(CartContext);

  const emptyCart = totalQuantity > 0;

  return (
    <>
      <div className="max-w-6xl mx-auto px-2">
        {emptyCart ? (
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-[1fr_minmax(260px,320px)] lg:grid-cols-[1fr_360px] gap-4 ">
            <CartList />
            <aside className="sticky top-4">
              <div
                className=" 
              bg-gray-100
              border
              border-gray-300
              rounded-lg
              p-4
              m-4
              shadow-sm
              "
              >
                <OrderSummary />
              </div>
             
            </aside>
          </div>
        ) : (
          <div className="text-center">
            <p className="mt-8">Your cart is empty!</p>
          </div>
        )}
      </div>
    </>
  );
}
