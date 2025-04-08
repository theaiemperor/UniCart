import { backend } from "@/src/lib/axios";
import { IProduct } from "../types/products";

export async function fetchAllProducts(): Promise<IProduct[]> {
  const { data } = await backend.get("/products");
  return data || [];
}
