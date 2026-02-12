import { auth, clerkClient} from "@clerk/nextjs/server";


export async function requireUserId() {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("UNAUTHENTICATED");
  }
  return userId;
}

export async function requireAdmin() {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Not authenticated");
  }

  const user = await clerkClient.users.getUser(userId);

  const role = user.publicMetadata?.role;

  if (role !== "admin") {
    throw new Error("Not authorized");
  }

  return userId;
}
