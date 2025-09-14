import { TextField, Button, Box, Typography } from "@mui/material";
import { useRef } from "react";
import toast from "react-hot-toast";
import { useProduct } from "../context/product/ProductContext";
import { useNavigate } from "react-router-dom";

const AddProductPage = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const stockRef = useRef<HTMLInputElement>(null);

  const { addProduct } = useProduct();
  const navigate = useNavigate();
  
  const handleSubmit = async () => {
    if(!titleRef?.current?.value) {
      toast("Title is required!", {icon: 'ℹ️'})
      return;
    }

    if(!priceRef?.current?.value) {
      toast("Price is required!", {icon: 'ℹ️'})
      return;
    }

    const product = {
      title: titleRef.current?.value,
      description: descriptionRef.current?.value,
      category: categoryRef.current?.value,
      image: imageRef.current?.value,
      price: Number(priceRef.current?.value),
      stock: Number(stockRef.current?.value),
    }

    const success = await addProduct(product);

    if(success) navigate("/products");
  }

  return <>
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 4,
        border: "1px solid #ccc",
        borderRadius: "8px",
        maxWidth: "600px",
        margin: "auto"
      }}
    >
      <Typography variant="h5" gutterBottom className="head-title">Add New Product</Typography>
      <TextField inputRef={titleRef} label="Title" name="title" fullWidth sx={{mt: 2}} />
      <TextField inputRef={descriptionRef} label="Description" name="description" fullWidth sx={{mt: 2}} />
      <TextField inputRef={categoryRef} label="Category" name="category" fullWidth sx={{mt: 2}} />
      <TextField inputRef={imageRef} label="Image URL" name="image" fullWidth sx={{mt: 2}} />
      <TextField inputRef={priceRef} type="number" label="Price" name="price" fullWidth sx={{mt: 2}} />
      <TextField inputRef={stockRef} type="number" label="Stock" name="stock" fullWidth sx={{my: 2}} />

      <Button onClick={handleSubmit} variant='contained' color='success' fullWidth size='large'>Add</Button>
    </Box>
  </>
}

export default AddProductPage;