import Link from "next/link";

export default function AddProductButton() {
  return (
    <>
      <Link href={`inventory/product-add`}>
        <button className="w-32 text-sm p-3 rounded-md cursor-pointer bg-green-300 hover:bg-green-400">
          + Add Product
        </button>
      </Link>
    </>
  );
}
