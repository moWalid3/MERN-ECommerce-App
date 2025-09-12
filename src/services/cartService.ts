import { Types } from "mongoose";
import cartModel from "../models/cartModel";
import productModel from "../models/productModel";

interface GetActiveCart {
  userId: string;
}
export const getActiveCart = async ({ userId }: GetActiveCart) => {
  return await cartModel
    .findOne({ userId, status: "active" })
    .populate("items.productId")
    .lean();
};

interface AddToCart {
  userId: string;
  productId: string;
  quantity: number;
}
export const addToCart = async ({ userId, productId, quantity }: AddToCart) => {
  if (quantity <= 0)
    return { status: 400, data: "Quantity must be greater than 0" };

  let cart = await cartModel.findOne({ userId, status: "active" });

  if (!cart) {
    const product = await productModel.findById(productId);
    if (!product) return { status: 404, data: "Product not found!" };

    const newCart = await cartModel.create({
      userId,
      items: [{ productId, quantity }],
      totalAmount: product.price * quantity,
    });
    return { status: 201, data: newCart };
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.productId.toString() == productId
  );

  if (itemIndex > -1)
    return { status: 409, data: "Product already exists in cart" };

  const product = await productModel.findById(productId);

  if (!product) return { status: 404, data: "Product not found!" };

  if (product.stock < quantity) {
    return {
      status: 409,
      data: `Only ${product.stock} items available in stock`,
    };
  }

  cart.items.push({
    productId: new Types.ObjectId(productId),
    quantity,
  });
  cart.totalAmount += product.price * quantity;
  const updatedCart = await cart.save();

  return { status: 201, data: updatedCart };
};
