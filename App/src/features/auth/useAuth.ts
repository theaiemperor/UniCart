import { create } from "zustand";

export interface IUserInfo {
  id: string;
  name: string;
  email: string;
  role: string;
  token: string;
  address: string;
}

export interface IUserStore {
  userInfo: IUserInfo | null;
  setInfo: (product: IUserInfo | null) => void;
}

export default create<IUserStore>((set) => ({
  userInfo: null,
  meta: {
    totalPrice: 0,
    totalQuantity: 0,
  },
  setInfo: (info: IUserInfo | null) =>
    set((state) => {
      return { ...state, userInfo: info };
    }),
}));
