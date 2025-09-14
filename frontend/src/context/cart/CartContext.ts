import { createContext, useContext } from "react";
import type { IAddCartItem, ICart } from "../../types/Cart";

interface ICartContext {
  cart: ICart | null;
  addCartItem: (data: IAddCartItem) => Promise<null | string>;
  getCart: () => Promise<void>
}

export const CartContext = createContext<ICartContext>({
  cart: null,
  addCartItem: async () => null,
  getCart: async () => {},
});
export const useCart = () => useContext(CartContext);
