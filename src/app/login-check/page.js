import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function PostLogin() {
  const { sessionClaims } = await auth();

  if (sessionClaims?.metadata?.role === "admin") {
    redirect("/admin");
  }

  redirect("/shop"); 
}
