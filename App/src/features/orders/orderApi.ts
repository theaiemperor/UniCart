import { backend } from "@/src/lib/axios";
import { IOrder, IOrderItem } from "@/src/types/order";

export async function createOrder(
  items: Pick<IOrderItem, "quantity" | "price">[]
) {
  const { data } = await backend.post("/orders", items);
  return data || {};
}

export async function fetchAllOrders(): Promise<IOrder[]> {
  const { data } = await backend.get("/orders");
  return data || [];
}

export async function fetchOrder(id: number): Promise<IOrder> {
  const { data } = await backend.get("/orders/" + id);
  return data || {};
}

export async function cancelOrder(id: number) {
  const { data } = await backend.patch("orders/" + id);
  return data;
}
