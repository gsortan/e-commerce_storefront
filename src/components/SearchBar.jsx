
import { redirect } from "next/navigation";
import SearchBarClient from "./SearchBarClient";
import { getAllProducts } from "@/services/product/productServices";

export default async function SearchBar({ searchParams }) {
  const products = await getAllProducts();

  async function searchAction(formData) {
    "use server";
    const q = (formData.get("q") || "").toString().trim();
    redirect(q ? `/shop?q=${encodeURIComponent(q)}` : "/shop");
  }

  return (<SearchBarClient action={searchAction} items={products} />
  );
}
