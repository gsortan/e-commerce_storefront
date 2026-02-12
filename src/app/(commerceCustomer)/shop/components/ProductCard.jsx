"use client";

import { useContext } from "react";
import { CartContext } from "../../cart/components/shopping-cart-context";
import QuantityControls from "../../../../components/customer/QuantityControls";
import Link from "next/link";
import AddToCartButton from "@/components/customer/AddToCartButton";

export default function ProductCard({ item }) {
  const { addToCart, items } = useContext(CartContext);

  const existing = items.find((i) => i.productId === item.id);

  return (
    <>
      <div className="w-full bg-gray-300 shadow-lg rounded-md p-4 flex flex-col items-center gap-4">
        <Link href={`/products/${item.id}`} className="inline-block">
          <img
            src={item.imageURL}
            alt={item.title}
            className="h-40 w-40 object-contain cursor-pointer"
          />
        </Link>

        <div className="flex flex-col gap-2 text-center min-h-[3.50rem]">
          <p
            className="
            text-xs
            sm:text-sm
            md:text-base
            lg:text-lg
            line-clamp-2
            min-h-[3rem]
            "
          >
            {item.title}
          </p>
        </div>

        <p className="font-semibold">${item.price.toFixed(2)}</p>
        <div className="h-10">
          {!existing ? (
            <AddToCartButton addToCart={addToCart} item={item} />
          ) : (
            <QuantityControls item={existing} />
          )}
        </div>
      </div>
    </>
  );
}
