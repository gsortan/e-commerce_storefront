import { clerkClient } from "@clerk/nextjs/server";

export async function getClerkUserById(userId) {
  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  return user;
}
