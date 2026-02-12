"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { MdSearch } from "react-icons/md";

export default function AdminSearchBar({placeHolderMsg}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQ = (searchParams.get("q") ?? "").toString();

  const [q, setQ] = useState(initialQ);

  function onSubmit(e) {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());

    if (q.trim()) params.set("q", q.trim());
    else params.delete("q");

    params.set("page", "1"); 
    router.push(`?${params.toString()}`);
  }

  return (
    <form onSubmit={onSubmit}>
    
      <div className="flex h-12  w-[30rem]">
        <input
          className="w-full border border-black px-4 outline-none"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={placeHolderMsg}
        />

        <button
          type="submit"
          aria-label="Search"
          className="w-14 flex items-center justify-center border border-l-0 border-black bg-blue-300 hover:bg-blue-400 cursor-pointer"
        >
          <MdSearch size={20} />
        </button>
      </div>
     
    </form>
  );
}
