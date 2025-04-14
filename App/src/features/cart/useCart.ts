import { IObj } from "@/src/types/common";
import { IOrderItem } from "@/src/types/order";
import { IProduct } from "@/src/types/products";
import { create } from "zustand";

export interface ICartItem extends Pick<IOrderItem, "price" | "quantity"> {
  product_id: number;
  image: string;
  name: string;
}

interface IMeta {
  totalQuantity: number;
  totalPrice: number;
}

type IState = IObj<ICartItem>;

export interface ICartStore {
  items: IState;
  meta: IMeta;
  addProduct: (product: IProduct) => void;
  clearCart: () => void;
}

const meta = {
  totalPrice: 0,
  totalQuantity: 0,
};

export default create<ICartStore>((set) => ({
  items: {},
  meta,
  clearCart: () => {
    set(() => ({ items: {}, meta }));
  },
  addProduct: (product: IProduct) =>
    set((state) => {
      if (state.items[product.id]) {
        return {
          ...state,
          meta: {
            totalPrice: state.meta.totalPrice + +product.price,
            totalQuantity: state.meta.totalQuantity + 1,
          },
          items: {
            ...state.items,
            [product.id]: {
              ...state.items[product.id],
              quantity: state.items[product.id].quantity + 1,
            },
          },
        };
      }

      return {
        ...state,
        meta: {
          totalPrice: state.meta.totalPrice + +product.price,
          totalQuantity: state.meta.totalQuantity + 1,
        },
        items: {
          [product.id]: {
            product_id: +product.id,
            quantity: 1,
            price: +product.price,
            image: product.image,
            name: product.name,
          },
          ...state.items,
        },
      };
    }),
}));
