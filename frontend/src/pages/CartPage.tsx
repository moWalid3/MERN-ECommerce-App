import { useCart } from "../context/cart/CartContext";
import type { IProduct } from "../types/Product";

const CartPage = () => {
  const { cart } = useCart();

  return (
    <>
      {!cart || cart.items.length === 0 ? (
        <>
          <img src="emptyCart.png" className="empty-cart" alt="Empty cart" />
          <h2 className="head-title">Your cart is empty</h2>
        </>
      ) : (
        <>
          <h2 className="head-title">Cart</h2>
          <table className="cart">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {cart.items.map((item) => (
                <tr key={item._id}>
                  <td><img src={(item.productId as IProduct).image} /></td>
                  <td>{(item.productId as IProduct).title}</td>
                  <td>${(item.productId as IProduct).price}</td>
                  <td>{item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

export default CartPage;
