import type { Product } from "~/types";

export default defineEventHandler(async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const data: Product[] = await response.json();
    return data;
  } catch (e) {
    console.error(e);
  }
});
