"use client";

import { createContext, useState } from "react";
import {
  addToCartAction,
  listSavedItems,
  updateQuantityAction,
  deleteSavedItem,
  clearCartAction,
} from "@/services/cart/cartServices";

export const CartContext = createContext({
  items: [],
  addToCart: async () => {},
  updateQuantity: async () => {},
  removeFromCart: async () => {},
  clearCart: async () =>{},
  totalQuantity: 0,
  totalPrice: 0,
});

export default function CartContextProvider({ children, initialItems = [] }) {
  const [shoppingCart, setShoppingCart] = useState({ items: initialItems });

  async function refreshCart() {
    const dbItems = await listSavedItems();
    setShoppingCart({ items: dbItems ?? [] });
  }

  async function addToCart(product) {
    const res = await addToCartAction(product);
    if (!res?.ok) return;

    await refreshCart();
  }

  async function updateQuantity(productId, amount) {
    const res = await updateQuantityAction(productId, amount);
    if (!res?.ok) return;

    await refreshCart();
  }

  async function removeFromCart(productId) {
    const res = await deleteSavedItem(productId);
    if (!res?.ok) return;

    await refreshCart();
  }

  async function clearCart()
  {
    const res = await clearCartAction();
    if(!res?.ok) return;

    await refreshCart();
  }

  const totalQuantity = shoppingCart.items.reduce(
    (sum, i) => sum + i.quantity,
    0
  );

  const totalPrice = shoppingCart.items.reduce(
    (sum, i) => sum + Number(i.price) * i.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items: shoppingCart.items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalQuantity,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
