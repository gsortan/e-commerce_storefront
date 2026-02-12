import { clerkClient } from "@clerk/nextjs/server";

export async function getAllCustomers() {
  const client = await clerkClient();

  let allCustomers = [];
  let offset = 0;
  let hasMore = true;

  while (hasMore) {
    const users = await client.users.getUserList({
      limit: 100,
      offset,
    });

    const customers = users.data.filter(
      (user) => user.publicMetadata.role !== "admin"
    );

    allCustomers = [...allCustomers, ...customers];

    hasMore = users.data.length === 100;
    offset += 100;
  }

  return allCustomers;
}
