"use client"
import { useClerk } from "@clerk/nextjs";

export default function LogoutButton() {
  const { signOut } = useClerk();

  async function logoutAction() {
    await signOut({ redirectUrl: "/" });
  }

  return (
    <div className="mt-auto">
      <button className="bg-red-300 p-2 rounded-md cursor-pointer hover:bg-red-400" onClick={logoutAction}>
        Logout
      </button>
    </div>
  );
}
