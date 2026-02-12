import CartContextProvider from "@/app/(commerceCustomer)/cart/components/shopping-cart-context";
import { listSavedItems } from "@/services/cart/cartServices";
import { currentUser } from "@clerk/nextjs/server";
import NavBar from "../../components/customer/NavBar";
import { createUser } from "@/services/user/userServices";

export default async function StoreLayout({ children }) {
  const user = await currentUser();

  await createUser(user.id);

  const initialItems = (await listSavedItems()) ?? [];

  const parsedUser = {
    id: user.id,
    fullName: user.fullName,
    username: user.username,
    imageUrl: user.imageUrl,
    email: user.primaryEmailAddress?.emailAddress ?? "",
  };

  return (
    <main>
      <CartContextProvider initialItems={initialItems}>
        <NavBar user={parsedUser} />
        {children}
      </CartContextProvider>
    </main>
  );
}
