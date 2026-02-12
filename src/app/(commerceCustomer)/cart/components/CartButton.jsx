"use client"

import { MdShoppingCart } from "react-icons/md";
import { CartContext } from "./shopping-cart-context";
import { useContext } from "react";
import Link from "next/link";

export default function CartButton() {
  const { totalQuantity } = useContext(CartContext);

  return (
    
    <div className="relative">
      <Link href="/cart" className="relative grid h-10 w-10 place-items-center rounded-full cursor-pointer">
       
          <MdShoppingCart className="text-3xl text-white" />
          {totalQuantity > 0 && (
            <span
              className="absolute -top-1 -right-1 bg-red-600 text-white text-xs
                         min-w-[18px] h-[18px] flex items-center justify-center rounded-full"
            >
              {totalQuantity}
            </span>
          )}
      </Link>
    </div>
  );
}
