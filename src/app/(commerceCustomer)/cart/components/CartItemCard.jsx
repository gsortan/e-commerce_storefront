"use client";
import { useContext } from "react";
import { CartContext } from "./shopping-cart-context";
import QuantityControls from "../../../../components/customer/QuantityControls";
import Link from "next/link";

export default function CartItemCard({ item }) {
  const { removeFromCart } = useContext(CartContext);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-[5rem_minmax(0,1fr)_auto] md:grid-cols-[5rem_minmax(0,1fr)_minmax(0,0.5fr)] gap-4 border-y border-gray-600 p-2">
        <div className=" grid justify-self-center">
            <Link href={`/products/${item.id}`}>
          <img
            src={item.image}
            alt={item.title}
            className="w-20 h-20 object-contain"
          />
          </Link>
        </div>
        <div>
          <p className="text-md min-h-[2.4rem] line-clamp-2">
            {item.title}
          </p>
          <p className="font-semibold">{item.price.toFixed(2)}</p>
          <button
            onClick={() => removeFromCart(item.productId)}
            className="mt-2 text-sm text-red-600 hover:text-red-800 underline-offset-2 hover:underline gap-1 cursor-pointer"
          >
            Remove
          </button>
        </div>
        <div className="grid place-items-center justify-self-center">
          <QuantityControls item={item} />
        </div>
      </div>
    </>
  );
}
