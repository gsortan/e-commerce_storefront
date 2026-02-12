"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function InventoryStatusFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const urlStatus = searchParams.get("status") ?? "ALL";
  const [status, setStatus] = useState(urlStatus);

  useEffect(() => setStatus(urlStatus), [urlStatus]);

  function updateURL(next) {
    const params = new URLSearchParams(searchParams.toString());
    if (next === "ALL") params.delete("status");
    else params.set("status", next);
    params.delete("page");
    router.replace(`?${params.toString()}`); 
  }

  return (
      <div className="p-2">
        <p>Status:</p>
    <select
      value={status}
      onChange={(e) => {
        const next = e.target.value;
        setStatus(next);      
        updateURL(next);     
      }}
      className="border border-black mt-2 w-32 p-2 rounded"
    >
      <option value="ALL">All</option>
      <option value="ACTIVE">Active</option>
      <option value="DISABLED">Disabled</option>
    </select>
    </div>
  );
}
