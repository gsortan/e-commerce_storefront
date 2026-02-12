import { LayoutDashboard, Package, Receipt, Users, Settings } from "lucide-react";

import NavLink from "./NavLink";
import LogoutButton from "./LogoutButton";

export default function SideBar() {
  

  return (
    <div className="flex flex-col p-4 h-screen gap-3 bg-slate-900">
      <h1 className="text-3xl text-blue-200">Admin Panel</h1>
      <NavLink href="/admin" icon={<LayoutDashboard />}>Dashboard</NavLink>
      <NavLink href="/admin/inventory" icon={<Package />}>Inventory</NavLink>
      <NavLink href="/admin/orders" icon={<Receipt />}>Orders</NavLink>
      <NavLink href="/admin/user-profile" icon={<Settings />}>Settings</NavLink>
      <LogoutButton/>
    </div>

  );
}
