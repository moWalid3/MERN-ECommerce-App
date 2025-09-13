import { useEffect } from "react";
import toast from 'react-hot-toast';

const CartPage = () => {

  useEffect(() => {
    toast('Here is your toast.');
    // getCart();
  }, [])

  const getCart = async () => {
  
  }

  return <>
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
        <tr>
          <td>Image 1</td>
          <td>Title 3</td>
          <td>$300</td>
          <td>5</td>
        </tr>
        <tr>
          <td>Image 1</td>
          <td>Title 3</td>
          <td>$300</td>
          <td>5</td>
        </tr>
        <tr>
          <td>Image 1</td>
          <td>Title 3</td>
          <td>$300</td>
          <td>5</td>
        </tr>
      </tbody>
    </table>
  </>
}

export default CartPage;