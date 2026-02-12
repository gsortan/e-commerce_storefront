import { getProductById } from "@/services/product/productServices";
import ProductDetails from "../components/ProductDetails";

export default async function ProductPage({ params }) {
  const unwrappedParams = await params;
  const product = await getProductById(unwrappedParams.id);

  return <ProductDetails product={product} />;
}
