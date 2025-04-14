export interface IOrderItem {
  id: number;
  product_id: number;
  quantity: number;
  price: number;
}

export interface IOrder {
  id: number;
  createdAt: Date;
  status: string;
  items: IOrderItem[];
}
