"use client"

export default function AddToCartButton({addToCart, item}) {
  return (
    <button
      className="bg-yellow-300 text-black py-2 px-2 rounded-lg shadow-md hover:bg-yellow-400  hover:shadow-lg active:scale-95 transition cursor-pointer "
      onClick={() => addToCart(item)}
    >
      Add to cart
    </button>
  );
}
