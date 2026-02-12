
import { getProducts } from "@/services/product/productServices";
export default async function ProductsCard()
{
    const data = await getProducts(undefined, undefined, unwrappedParams.q, undefined, undefined, "SHOP");
    return (<div className="font-sans rounded-md max-w-md w-full m-2 p-4 text-center h-40 bg-yellow-100 shadow-xl"> <p className="text-xl">Total Products:</p><p className="font-semibold text-6xl">{data.totalCount}</p></div>);
}