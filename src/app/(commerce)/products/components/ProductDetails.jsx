"use client";
import Image from "next/image";
import QuantityDropdown from "./QuantityDropdown";
import AddToCartButton from "@/components/AddToCartButton";
import { useContext, useState } from "react";
import { CartContext } from "../../cart/components/shopping-cart-context";

export default function ProductDetails({ product }) {
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] p-4 m-4">
      <div className="h-128 w-full max-w-xl bg-gray-300 p-4 flex justify-center justify-self-center lg:justify-self-start">
    <img
      src={product.imageURL}
      alt={product.title}
      className="h-full w-auto object-contain "
    />
      </div>

      <div className="flex flex-col gap-3 p-4">
        <h1 className="font-bold text-3xl">{product.title}</h1>
         <h4 className="text-gray-500 text-xl">Category: {product.category}</h4>
        <p className="text-2xl font-bold">${Number(product.price).toFixed(2).toString()}</p>
        <div className="flex gap-3">
          <QuantityDropdown value={quantity} onChange={setQuantity} />
          <AddToCartButton
            addToCart={addToCart}
            item={{ ...product, quantity }}
          />
        </div>
        <p>{product.description}</p>
      </div>
    </div>
  );
}
