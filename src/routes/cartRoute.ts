import express from "express";
import { addToCart, getActiveCart } from "../services/cartService";
import validateJWT from "../middlewares/validateJWT";
import { ExtendRequest } from "../types/extendedRequest";

const router = express.Router();

router.get("/", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const cart = await getActiveCart({ userId: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch cart", error });
  }
});

router.post("/items", validateJWT, async (req: ExtendRequest, res) => {
  const { productId, quantity } = req.body;
  try {
    const result = await addToCart({
      userId: req.user?._id,
      productId,
      quantity,
    });

    if (result.status >= 400)
      return res.status(result.status).json({ message: result.data });

    res.status(201).json(result.data);
  } catch (error) {
    res.status(500).json({ message: "Failed to add to cart", error });
  }
});

export default router;
