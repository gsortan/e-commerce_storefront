import PaginationRounded from "@/components/shared/PaginationRounded";
import { PencilIcon } from "lucide-react";
import Link from "next/link";

export default async function InventoryTable({
  products,
  totalCount,
  PAGE_SIZE,
}) {
  const noProducts = products.length === 0;
  return (
    <>
      {noProducts ? (
        <div className="pt-4">No results!</div>
      ) : (
        <div className="pr-6">
          <table className="min-w-[520px] m-4 w-full">
            <thead>
              <tr className="border-b border-t border-black text-left">
                <th className="p-2 border-l border-r border-black">Image</th>
                <th className="p-2 border-l border-r border-black">ID</th>
                <th className="p-2 border-r border-black">Product Title</th>
                <th className="p-2 border-r border-black">Price</th>
                <th className="p-2 border-r border-black">Stock</th>
                <th className="p-2 border-r border-black">Status</th>
                <th className="p-2 border-r border-black">Action</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-black">
                  <td className="p-2 border-l border-r border-black">
                    <div className="flex  justify-center">
                      <img
                        src={product.imageURL}
                        alt={product.title}
                        className="h-11 w-11 object-contain rounded"
                      />
                    </div>
                  </td>
                  <td className="p-2 border-l border-r border-black">
                    {product.id}
                  </td>
                  <td className="p-2 max-w-[400px]">
                    <div className="truncate" title={product.title}>
                      {product.title}
                    </div>
                  </td>
                  <td className="p-2 border-l border-r border-black">
                    ${product.price}
                  </td>
                  <td className="p-2 border-l border-r border-black">
                    {product.stock}
                  </td>
                  <td className="p-2 border-l border-r border-black">
                    {product.status}
                  </td>
                  <td className="p-2  border-r border-black">
                    <div className="flex justify-center "> 
                    <Link href={`inventory/${product.id}`}>
                      <button className="w-18 flex p-2 bg-blue-300 hover:bg-blue-400 cursor-pointer">
                        <PencilIcon />
                        Edit
                      </button>
                    </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <PaginationRounded totalCount={totalCount} PAGE_SIZE={PAGE_SIZE} />
        </div>
      )}
    </>
  );
}
