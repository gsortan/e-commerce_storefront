import { clerkClient } from "@clerk/nextjs/server";

export async function getAllMatchingUsers(searchTerm) {
  const client = await clerkClient();

  let allUsers = [];
  let offset = 0;
  const limit = 100;

  while (true) {
    const response = await client.users.getUserList({
      query: searchTerm,
      limit,
      offset,
    });

    allUsers = [...allUsers, ...response.data];

    if (response.data.length < limit) {
      break;
    }

    offset += limit;
  }

  return allUsers;
}
