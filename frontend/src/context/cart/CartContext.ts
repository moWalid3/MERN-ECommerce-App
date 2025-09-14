import { createContext, useContext } from "react";
import type { ICart } from "../../types/Cart";

interface ICartContext {
  cart: ICart | null;
  addCartItem: (productId: string) => void;
  getCart: () => Promise<void>
}

export const CartContext = createContext<ICartContext>({
  cart: null,
  addCartItem: () => {},
  getCart: async () => {},
});
export const useCart = () => useContext(CartContext);
