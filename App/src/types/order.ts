export interface IOrderItem {
  id: number;
  product_id: number;
  quantity: number;
  price: number;
}

export interface IOrder {
  id: number;
  createdAt: string;
  status: string;
  items: IOrderItem[];
}
