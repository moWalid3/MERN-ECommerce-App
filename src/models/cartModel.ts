import mongoose, { Document, Schema, Types } from "mongoose";

const CartStatusEnum = ["active", "completed"];

export interface ICartItem {
  productId: Types.ObjectId;
  quantity: number;
}

export interface ICart extends Document {
  userId: Types.ObjectId;
  items: ICartItem[];
  totalAmount: number;
  status: "active" | "completed";
}

const cartItemSchema = new Schema<ICartItem>({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, default: 1, min: 1, required: true },
});

const cartSchema = new Schema<ICart>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  items: [cartItemSchema],
  totalAmount: { type: Number, default: 0, required: true },
  status: { type: String, enum: CartStatusEnum, default: "active" },
});

const cartModel = mongoose.model<ICart>("Cart", cartSchema);

export default cartModel;
