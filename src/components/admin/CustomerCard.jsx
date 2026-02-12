import { getAllCustomers } from "@/lib/getAllCustomers";
export default async function CustomerCard()
{
    const customers = await getAllCustomers();
    return (<div className="font-sans rounded-md max-w-md w-full m-2 p-4 text-center h-40 bg-orange-100 shadow-xl"> 
    <p className="text-xl">Total Customers:</p><p className="font-semibold text-6xl">{customers.length}</p></div>);
}