import type { IProduct } from "./Product";

export interface ICart {
  _id: string,
  userId: string;
  items: ICartItem[];
  totalAmount: number;
  status: "active" | "completed";
}

export interface ICartItem {
  _id: string,
  productId: string | IProduct;
  quantity: number;
}

export interface IUpdateCartItem {
  productId: string;
  quantity: number;
}
