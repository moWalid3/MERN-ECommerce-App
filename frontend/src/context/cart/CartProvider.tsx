import { useState, type PropsWithChildren } from "react";
import { CartContext } from "./CartContext";
import { useAuth } from "../auth/AuthContext";
import { BASE_URL } from "../../constants/baseUrl";
import type { IAddCartItem, ICart } from "../../types/Cart";

const CartProvider = (props: PropsWithChildren) => {
  const [cart, setCart] = useState<ICart | null>(null);
  const { token } = useAuth();

  const addCartItem = async (data: IAddCartItem) => {
    try {
      const res = await fetch(`${BASE_URL}/cart/items`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      const result = await res.json();

      if(res.ok) {
        setCart(result);
        console.log("result from context", result);
        return null;
      }

      return result.message;
    } catch(error) {
      console.error(error);
      return "Something wrong in the server! Please try again later";
    }
  };


  return (
    <CartContext.Provider value={{ addCartItem }}>{props.children}</CartContext.Provider>
  );
};

export default CartProvider;
