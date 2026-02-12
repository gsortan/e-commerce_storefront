import ProductForm from "../components/ProductForm";
import {createProduct} from "@/services/product/productServices";

export default async function EditProductPage() {

  async function onSubmit(data) {
    "use server";
    await createProduct(data);
  }

  return (
    <ProductForm
      defaultValues={{
        title: "",
        description: "",
        imageURL: "",
        price: "",
        stock: "",
        category: "",
      }}
      onSubmit={onSubmit}
      buttonLabel="Create Product"
      modalMessage="Created product!"
    />
  );
}
