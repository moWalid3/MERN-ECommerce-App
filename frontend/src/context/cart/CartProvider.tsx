import { useCallback, useEffect, useState, type PropsWithChildren } from "react";
import { CartContext } from "./CartContext";
import { useAuth } from "../auth/AuthContext";
import { BASE_URL } from "../../constants/baseUrl";
import type { ICart, IUpdateCartItem } from "../../types/Cart";
import toast from "react-hot-toast";

const CartProvider = (props: PropsWithChildren) => {
  const [cart, setCart] = useState<ICart | null>(null);
  const { token } = useAuth();

  const addCartItem = async (productId: string) => {
    try {
      const res = await fetch(`${BASE_URL}/cart/items`, {
        method: "POST",
        body: JSON.stringify({ productId, quantity: 1 }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      const result = await res.json();

      if(res.ok) {
        setCart(result);
        toast.success('Product successfully added!', { duration: 3000});
        return;
      }

      toast(result.message, { duration: 3000, icon: "ℹ️"});
    } catch(error) {
      console.error(error);
      toast.error("Something wrong in the server! Please try again later", { duration: 3000 });
    }
  };

  const updateCartItem = async (data: IUpdateCartItem) => {
    try {
      const res = await fetch(`${BASE_URL}/cart/items`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      const result = await res.json();

      if(res.ok) {
        setCart(result);
        toast.success('Product successfully updated!', { duration: 3000});
        return;
      }

      toast.error(result.message);
    } catch(error) {
      console.error(error);
      toast.error("Something wrong in the server! Please try again later", { duration: 3000 });
    }
  }

  const removeCartItem = async (productId: string) => {
    try {
      const res = await fetch(`${BASE_URL}/cart/items/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const result = await res.json();

      if(res.ok) {
        setCart(result);
        toast.success('Product successfully removed!', { duration: 3000});
        return;
      }

      toast.error(result.message);
    } catch(error) {
      console.error(error);
      toast.error("Something wrong in the server! Please try again later", { duration: 3000 });
    }
  }

  const clearCart = async () => {
    try {
      const res = await fetch(`${BASE_URL}/cart`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const result = await res.json();

      if(res.ok) {
        setCart(result);
        toast.success('Your Cart successfully cleared!', { duration: 3000});
        return;
      }

      toast.error(result.message);
    } catch(error) {
      console.error(error);
      toast.error("Something wrong in the server! Please try again later", { duration: 3000 });
    }
  }

  const checkout = async (address: string) => {
    try {
      const res = await fetch(`${BASE_URL}/cart/checkout`, {
        method: "POST",
        body: JSON.stringify({ address }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      const result = await res.json();

      if(res.ok) {
        console.log(result);
        setCart(null);
        toast.success('Checkout successful! Your order is on its way. Thank you for shopping with us!');
        return;
      }

      toast.error(result.message);
    } catch(error) {
      console.error(error);
      toast.error("Something wrong in the server! Please try again later", { duration: 3000 });
    }
  }

  const getCart = useCallback(async () => {
    if(token) {
      try {
        const res = await fetch(`${BASE_URL}/cart`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

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
    getCart();
  }, [getCart]);

  return (
    <CartContext.Provider 
      value={{ addCartItem, updateCartItem, removeCartItem, getCart, clearCart, checkout, cart }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
