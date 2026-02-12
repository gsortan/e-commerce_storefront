"use client";
import { useContext } from "react";
import { CartContext } from "../../app/(commerceCustomer)/cart/components/shopping-cart-context";
import { HiOutlineTrash } from "react-icons/hi";

export default function QuantityControls({ item }) {
  const { updateQuantity } = useContext(CartContext);

  return (
   
      <div className="flex border border-gray-600 gap-4 p-1">
        <button
          className="cursor-pointer w-6 h-6"
          onClick={() => updateQuantity(item.productId, -1)}
        >
          {" "}
          {item.quantity === 1 ? <HiOutlineTrash className="w-5 h-5" /> : "-"}
        </button>
        <p className="w-6 h-6 flex items-center justify-center">
          {item.quantity}
        </p>
        <button
          className="cursor-pointer w-5"
          onClick={() => updateQuantity(item.productId, 1)}
        >
          +
        </button>
      </div>
  );
}
