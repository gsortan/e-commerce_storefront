"use server";

import { prisma } from "../../lib/prisma.js";
import { requireUserId } from "@/lib/auth.js";

function toPlainCartItem(row) {
  return {
    productId: row.productId,
    quantity: row.quantity,
    id: row.product.id,
    title: row.product.title,
    description: row.product.description,
    image: row.product.imageURL,
    price: Number(row.product.price),
  };
}

export async function addToCartAction(item) {
  try {
    const userId = await requireUserId();

    const productId = item.id;
    const qty = Math.max(1, Math.min(99, item.quantity ?? 1));

    /*
    await prisma.product.upsert({
      where: { id: productId },
      update: {
        title: item.title,
        description: item.description,
        imageURL: item.image,
        price: item.price,
      },
      create: {
        id: productId,
        title: item.title,
        description: item.description,
        imageURL: item.image,
        price: item.price,
      },
    });
*/
    const cartItem = await prisma.cartItem.upsert({
      where: { userId_productId: { userId, productId } },
      update: { quantity: { increment: qty } },
      create: { userId, productId, quantity: qty },
      include: { product: true },
    });

    return { ok: true, item: toPlainCartItem(cartItem) };
  } catch (e) {
    console.error("[addToCart] failed", e);
    return { ok: false, error: "DB error" };
  }
}

export async function listSavedItems() {
  const  userId  = await requireUserId();

  const itemsList = await prisma.cartItem.findMany({
    where: { userId },
    include: { product: true },
    orderBy: { createdAt: "desc" },
  });

  return itemsList.map(toPlainCartItem);
}

export async function updateQuantityAction(productId, amount) {
  try {
    const userId = await requireUserId();

    const existing = await prisma.cartItem.findUnique({
      where: { userId_productId: { userId, productId } },
    });

    if (!existing) return { ok: false, error: "Item not found" };

    const nextQty = existing.quantity + amount;

    if (nextQty <= 0) {
      await prisma.cartItem.delete({
        where: { userId_productId: { userId, productId } },
      });
      return { ok: true, deleted: true };
    }

    const updated = await prisma.cartItem.update({
      where: { userId_productId: { userId, productId } },
      data: { quantity: nextQty },
      include: { product: true },
    });

    return { ok: true, item: toPlainCartItem(updated) };
  } catch (e) {
    console.error("[updateQuantityAction] failed", e);
    return { ok: false, error: "DB error" };
  }
}

export async function deleteSavedItem(productId) {
  const userId = await requireUserId();

  try {
    await prisma.cartItem.delete({
      where: { userId_productId: { userId, productId } },
    });

    return { ok: true };
  } catch (e) {
    console.error("[deleteSavedItem] failed", e);
    return { ok: false, error: "DB error" };
  }
}

export async function clearCartAction() {
  const userId = await requireUserId();

  try {
    await prisma.cartItem.deleteMany({
      where: { userId },
    });

    return { ok: true };
  } catch (e) {
    console.error("[clearCartAction] failed", e);
    return { ok: false, error: "DB error" };
  }
}

export async function clearCartForUser(userId) {
  await prisma.cartItem.deleteMany({ where: { userId } });
}
