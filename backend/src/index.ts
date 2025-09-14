import dotenv from 'dotenv';
import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";
import productRoute from "./routes/productRoute";
import { seedInitialProducts } from "./services/productService";
import cartRoute from "./routes/cartRoute";
import cors from 'cors';
import orderRoute from './routes/orderRoute';

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.DATABASE_URL || "")
  .then(() => console.log("Connected!"))
  .catch((err) => console.log("Failed to connect!", err));

seedInitialProducts();

app.use("/user", userRoute);
app.use("/products", productRoute);
app.use("/cart", cartRoute);
app.use("/orders", orderRoute)

app.listen(port, () => {
  console.log(`Server is running at: http://localhost:${port}`);
});
