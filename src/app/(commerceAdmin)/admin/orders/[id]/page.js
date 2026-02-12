import OrderCard from "@/app/(commerceCustomer)/orders/components/OrderCard";
import { getOrderById } from "@/services/order/orderServices";

export default async function  OrderDetailsPage({params})
{
    const unwrappedParams = await params;

    const order = await getOrderById(unwrappedParams.id);

    return (<><main className="flex-1 overflow-y-auto">
   <OrderCard order={order}/>
  </main></>);
}