import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
  title: string;
  description: string;
  category: string;
  image: string;
  price: number;
  stock: number;
}

const productSchema = new Schema<IProduct>({
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  image: { type: String },
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, default: 0 },
});

const productModel = mongoose.model<IProduct>("products", productSchema);

export default productModel;
