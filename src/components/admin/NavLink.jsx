"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ href, icon, children }) {
    
  const pathname = usePathname();
   const active =
    href === "/admin"
      ? pathname === "/admin" 
      : pathname === href || pathname.startsWith(href + "/"); 

  return (
    <Link
      href={href}
      className={`w-full rounded-md flex gap-2
        ${active
          ? "bg-slate-800 text-white"
          : "text-blue-200 hover:bg-slate-800 hover:text-white"}
      `}
    >
      {icon}
      {children}
    </Link>
  );
}
