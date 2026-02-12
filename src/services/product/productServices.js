"use server";

import { prisma } from "../../lib/prisma.js";
import { requireUserId } from "@/lib/auth.js";

export async function createProduct(data) {
  return prisma.product.create({
    data,
  });
}

export async function getProducts(
  skipVal,
  takeVal,
  searchTerm,
  status,
  stockValue,
  viewer = "ADMIN",
) {
  await requireUserId();

  const isNumeric = searchTerm ? /^[0-9]+$/.test(searchTerm) : false;

  const searchFilter = searchTerm
    ? isNumeric
      ? { id: Number(searchTerm) }
      : {
          title: { contains: searchTerm, mode: "insensitive" },
        }
    : {};

  const statusFilter =
    viewer === "SHOP" ? { status: "ACTIVE" } : status ? { status } : {};

  let stockFilter = {};
  if (stockValue === "IN_STOCK") stockFilter = { stock: { gt: 0 } };
  if (stockValue === "LOW_STOCK") stockFilter = { stock: { gt: 0, lte: 5 } };
  if (stockValue === "OUT_OF_STOCK") stockFilter = { stock: 0 };

  const where = {
    ...searchFilter,
    ...statusFilter,
    ...stockFilter,
  };

  const [products, totalCount] = await prisma.$transaction([
    prisma.product.findMany({
      where,
      skip: skipVal,
      take: takeVal,
      orderBy: { id: "desc" },
    }),
    prisma.product.count({ where }),
  ]);

  return {
    products: products.map((product) => ({
      ...product,
      price: Number(product.price),
    })),
    totalCount,
  };
}

export async function getProductById(id) {
  await requireUserId();
  const convertedId = Number(id);
  const product = await prisma.product.findUnique({
    where: { id: convertedId },
  });

  return {
    ...product,
    price: product.price.toString(),
  };
}

export async function updateProduct(id, updatedProd) {
  const updatedProduct = await prisma.product.update({
    where: {
      id: id,
    },
    data: {
      ...updatedProd,
    },
  });

  return updatedProduct;
}
