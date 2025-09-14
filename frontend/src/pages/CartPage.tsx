import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart } from "../context/cart/CartContext";
import type { IProduct } from "../types/Product";
import Box from '@mui/material/Box';
import { Button, Typography } from '@mui/material';

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
                <th></th>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.items.map((item) => (
                <tr key={item._id}>
                  <td width={1}> <IconButton color='error'><DeleteIcon /></IconButton> </td>
                  <td><img src={(item.productId as IProduct).image} /></td>
                  <td>{(item.productId as IProduct).title}</td>
                  <td className="price">${(item.productId as IProduct).price}</td>
                  <td>
                    <IconButton color='info'><RemoveIcon /></IconButton>
                    <span className='quantity'>{item.quantity}</span>
                    <IconButton color='info'><AddIcon /></IconButton>
                  </td>
                  <td className='total'>${ (item.productId as IProduct).price * item.quantity }</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Box display={'flex'} flexWrap={'wrap'} gap={5} justifyContent={'center'} alignItems={'center'} mt={3}>
            <Typography variant='h5'>
              Total: <span className='total' style={{fontSize: '1.75rem'}}>${ cart.totalAmount }</span>
            </Typography>
            <Button variant='contained' color='success' size='large'>Checkout</Button>
          </Box>
        </>
      )}
    </>
  );
};

export default CartPage;
