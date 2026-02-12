import { expandRegion } from "@/lib/getRegion";

export default function OrderCard({ order }) {
  const countryNames = new Intl.DisplayNames(["en"], { type: "region" });
console.log(order);
  const createdAt = new Date(order.createdAt).toLocaleString("en-CA", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const region = expandRegion(order.shipCountry, order.shipRegion);
  const country = countryNames.of(order.shipCountry);

  return (
    <div className="w-full p-4 max-w-2xl">
      <div className="flex flex-col bg-gray-300 mt-4 items-center justify-center h-44 shadow-xl w-full">
        <h1 className="text-4xl">Order #{order.id}</h1>
        <p className="text-sm text-gray-700">Placed on {createdAt}</p>
        <p>{order.shipName}</p>
        <p>{order.shipAddressLine1}</p>
        <p>{order.shipAddressLine2}</p>
        <p>
          {order.shipCity}, {region} {order.shipPostalCode}
        </p>
        <p>{country}</p>
     
      </div>

      <div className="bg-blue-100 p-4 flex gap-4 flex-col">
        {order.items.map((i) => (
          <div
            key={i.id}
            className="grid grid-cols-[5rem_1fr] min-[480px]:grid-cols-[5rem_3fr_1fr]"
          >
            <img
              src={i.product.imageURL}
              alt={i.product.title}
              className="w-20 h-20 object-contain"
            />

            <div className="hidden min-[480px]:block ">
              <p className="pl-4 text-[1rem]">{i.product.title}</p>
            </div>
            <div className="hidden min-[480px]:block pl-4">
              <p>${Number(i.product.price).toFixed(2)}</p>
              <p>Qty: {i.quantity}</p>
            </div>
            <div className="min-[480px]:hidden pl-4">
              <p className="text-[0.95rem]">{i.product.title}</p>
              <p>${Number(i.product.price).toFixed(2)}</p>
              <p>Qty: {i.quantity}</p>
            </div>
          </div>
        ))}
        <p className="mt-2 p-2 text-center font-bold text-lg">
          Total: ${Number(order.totalAmount).toFixed(2)}
        </p>
      </div>
    </div>
  );
}
