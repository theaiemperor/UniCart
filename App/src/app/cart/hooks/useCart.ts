import { create } from "zustand";
import { IProduct } from "@/src/types/products";
import { IObj } from "@/src/types/common";

export interface ICartItem {
  quantity: number;
  price: number;
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
}

export default create<ICartStore>((set) => ({
  items: {},
  meta: {
    totalPrice: 0,
    totalQuantity: 0,
  },
  addProduct: (product: IProduct) =>
    set((state) => {
      if (state.items[product.id]) {
        return {
          ...state,
          meta: {
            totalPrice: state.meta.totalPrice + Number(product.price),
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
          totalPrice: state.meta.totalPrice + Number(product.price),
          totalQuantity: state.meta.totalQuantity + 1,
        },
        items: {
          [product.id]: {
            quantity: 1,
            price: Number(product.price),
            image: product.image,
            name: product.name,
          },
          ...state.items,
        },
      };
    }),
}));
