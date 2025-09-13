import { createContext, useContext } from "react";
import type { IAddCartItem } from "../../types/Cart";

interface ICartContext {
  addCartItem: (data: IAddCartItem) => Promise<null | string>
}

export const CartContext = createContext<ICartContext>({
  addCartItem: async () => null
});
export const useCart = () => useContext(CartContext);