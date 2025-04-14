import { backend } from "@/src/lib/axios";
import { IOrderItem } from "@/src/types/order";

export async function createOrder(
  items: Pick<IOrderItem, "quantity" | "price">[]
) {
  const { data } = await backend.post("/orders", items);
  return data || {};
}
