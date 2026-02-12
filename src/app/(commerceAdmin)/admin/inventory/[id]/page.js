import ProductForm from "../components/ProductForm";
import { updateProduct } from "@/services/product/productServices";
import { getProductById } from "@/services/product/productServices";

export default async function EditProductPage({ params }) {
const unwrappedParams = await params;
  const product = await getProductById(unwrappedParams.id);

  async function onSubmit(data) {
    "use server";
    await updateProduct(Number(unwrappedParams.id), data);
  }

  return (
    <ProductForm
      defaultValues={{
        title: product.title,
        description: product.description,
        imageURL: product.imageURL,
        price: Number(product.price),
        stock: product.stock,
        category: product.category,
        status: product.status,
      }}
      onSubmit={onSubmit}
      buttonLabel="Save Product"
      modalMessage="Changes saved!"
    />
  );
}
