import PaginationRounded from "@/components/shared/PaginationRounded";
import { Eye } from "lucide-react";
import Link from "next/link";
import { getClerkUserById } from "@/lib/getClerkUserById";

export default async function OrdersTable({ orders, totalCount, PAGE_SIZE }) {
  const noOrders = orders.length === 0;

  const users = await Promise.all(
    orders.map((o) => getClerkUserById(o.userId))
  );
  const userMap = new Map(users.map((u) => [u.id, u]));

  return (
    <>
      {noOrders ? (
        <div className="pt-4 ml-2">No results!</div>
      ) : (
        <div className="pr-6">
          <table className="min-w-[520px] m-4 w-full">
            <thead>
              <tr className="border-b border-t border-black text-left">
                <th className="p-2 border-l border-r border-black">ID</th>
                <th className="p-2 border-l border-r border-black">
                  Customer Name
                </th>
                <th className="p-2 border-r border-black">Customer Email</th>
                <th className="p-2 border-r border-black">Date</th>
                <th className="p-2 border-r border-black">Amount</th>
                <th className="p-2 border-r border-black">View</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => {
                const u = userMap.get(order.userId);

                const name =
                  u.username;

                const email = u.emailAddresses?.[0].emailAddress;

                return (
                  <tr key={order.id} className="border-b border-black">
                    <td className="p-2 border-l border-r border-black">
                      {order.id}
                    </td>

                    <td className="p-2 border-l border-r border-black max-w-xs truncate">
                      {name}
                    </td>

                    <td className="p-2 border-l border-r border-black">
                      {email}
                    </td>

                    <td className="p-2 border-l border-r border-black">
                      {new Date(order.createdAt).toLocaleDateString("en-CA")}
                    </td>

                    <td className="p-2 border-l border-r border-black">
                      {order.totalAmount}
                    </td>

                    <td className="p-2 border-l border-r border-black">
                      <div className="flex justify-center">
                      <Link href={`orders/${order.id}`}>
                        <button className="w-12 flex justify-center p-2 bg-blue-300 hover:bg-blue-400 cursor-pointer">
                          <Eye />
                        </button>
                      </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <PaginationRounded totalCount={totalCount} PAGE_SIZE={PAGE_SIZE} />
        </div>
      )}
    </>
  );
}
