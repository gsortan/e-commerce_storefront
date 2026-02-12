
import { getTotalRevenue } from "@/services/order/orderServices";
export default async function RevenueCard()
{
    const revenue = await getTotalRevenue();
    return (<div className="font-sans rounded-md max-w-md w-full m-2 p-4 text-center h-40 bg-yellow-100 shadow-xl"> <p className="text-xl">Total Revenue:</p><p className="font-semibold text-6xl">${revenue}</p></div>);
}