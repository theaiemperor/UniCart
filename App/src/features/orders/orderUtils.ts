import { IOrderItem } from "@/src/types/order";

export function totalOrderPrice(items: IOrderItem[]) {
  let price = 0;

  items.forEach((val) => {
    price += val.quantity * val.price;
  });

  return price;
}
