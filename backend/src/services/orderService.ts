import { orderModel } from "../models/order.model";

export const getOrders = async (userId: string) => {
  return await orderModel.find({ userId }).lean();
};
