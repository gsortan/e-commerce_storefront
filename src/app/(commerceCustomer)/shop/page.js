
import ProductCard from "./components/ProductCard";
import { getProducts } from "@/services/product/productServices";

export default async function ShopPage({searchParams}) {

  const unwrappedParams = await searchParams;

  const data = await getProducts(undefined,undefined,unwrappedParams.q,undefined,undefined,"SHOP");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[70rem] mx-auto p-8">
      {data.products.map(item => <ProductCard key={item.id} item={item} />)}
    </div>
  );
}