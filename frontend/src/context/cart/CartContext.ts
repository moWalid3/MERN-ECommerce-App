import { createContext, useContext } from "react";
import type { IAddCartItem, ICart } from "../../types/Cart";

interface ICartContext {
  cart: ICart | null;
  addCartItem: (data: IAddCartItem) => Promise<null | string>;
}

export const CartContext = createContext<ICartContext>({
  cart: null,
  addCartItem: async () => null,
});
export const useCart = () => useContext(CartContext);
