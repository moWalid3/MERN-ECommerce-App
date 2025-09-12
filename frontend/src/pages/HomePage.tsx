import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import ProductCard from "../components/ProductCard";
import type { IProduct } from "../types/Product";
import { BASE_URL } from "../constants/baseUrl";

const HomePage = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const res = await fetch(`${BASE_URL}/products`);
      setProducts(await res.json());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h2>Products</h2>
      <Grid container spacing={2}>
        {products.map((prod) => (
          <Grid key={prod._id} size={{ xs: 6, md: 3 }}>
            <ProductCard product={prod} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default HomePage;
