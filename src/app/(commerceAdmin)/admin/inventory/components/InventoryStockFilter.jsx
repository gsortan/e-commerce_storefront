"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function InventoryStockFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const urlStock = searchParams.get("stock") ?? "ALL";
  const [stock, setStock] = useState(urlStock);

  useEffect(() => setStock(urlStock), [urlStock]);

  function updateURL(next) {
    const params = new URLSearchParams(searchParams.toString());

    if (next === "ALL") params.delete("stock");
    else params.set("stock", next);

    params.delete("page");
    router.replace(`?${params.toString()}`);
  }

  return (
    <div className="p-2">
      <p>Stock:</p>
      <select
        value={stock}
        onChange={(e) => {
          const next = e.target.value;
          setStock(next);     
          updateURL(next);    
        }}
        className="border border-black mt-2 w-32 p-2 rounded"
      >
        <option value="ALL">All</option>
        <option value="IN_STOCK">In Stock</option>
        <option value="LOW_STOCK">Low Stock</option>
        <option value="OUT_OF_STOCK">Out of Stock</option>
      </select>
    </div>
  );
}
