import { useCallback, useEffect, useState, type PropsWithChildren } from "react";
import { CartContext } from "./CartContext";
import { useAuth } from "../auth/AuthContext";
import { BASE_URL } from "../../constants/baseUrl";
import type { IAddCartItem, ICart } from "../../types/Cart";
import toast from "react-hot-toast";

const CartProvider = (props: PropsWithChildren) => {
  const [cart, setCart] = useState<ICart | null>(null);
  const { token } = useAuth();

  const getCart = useCallback(async () => {
    if(token) {
      try {
        const res = await fetch(`${BASE_URL}/cart`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        console.log(data);

        if(res.ok) {
          setCart(data);
        }
      } catch (error) {
        console.error(error);
        toast.error("Something wrong in the server! Please try again later", { duration: 3000 });
      }
    } else {
      setCart(null);
    }
  }, [token]);

  useEffect(() => {
    console.log("form cart provider in use effect");
    getCart();
  }, [getCart]);

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
        return null;
      }

      return result.message;
    } catch(error) {
      console.error(error);
      return "Something wrong in the server! Please try again later";
    }
  };

  return (
    <CartContext.Provider value={{ addCartItem, getCart, cart }}>{props.children}</CartContext.Provider>
  );
};

export default CartProvider;
