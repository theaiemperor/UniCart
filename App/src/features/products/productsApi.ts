import { backend } from "@/src/lib/axios";
import { IProduct } from "@/src/types/products";

export async function fetchAllProducts(): Promise<IProduct[]> {
  const { data } = await backend.get("/products");
  return data || [];
}

export async function fetchProduct(id: string): Promise<IProduct> {
  const { data } = await backend.get("/products/" + id);
  return data;
}

export default {};
