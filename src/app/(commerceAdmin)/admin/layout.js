import SideBar from "@/components/admin/SideBar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-50 shrink-0">
      <SideBar />
      </div>
      <main className="flex-1 min-w-0 overflow-y-auto overflow-x-auto">
      
        <div className="mx-auto min-w-[900px] max-w-[1100px] px-6 py-6">
          {children}
        </div>
      </main>
    </div>
  );
}