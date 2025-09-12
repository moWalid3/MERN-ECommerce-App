import express from "express";
import {
  addToCart,
  checkout,
  clearCart,
  deleteCartItem,
  getActiveCart,
  updateCartItem,
} from "../services/cartService";
import validateJWT from "../middlewares/validateJWT";
import { ExtendRequest } from "../types/extendedRequest";

const router = express.Router();

router.get("/", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const cart = await getActiveCart({ userId: req.user?._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch cart", error });
  }
});

router.delete("/", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const cart = await clearCart(req.user?._id);
    if (!cart) return res.status(404).json({ message: "Cart not found!" });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Failed to clear cart", error });
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

router.put("/items", validateJWT, async (req: ExtendRequest, res) => {
  const { productId, quantity } = req.body;
  try {
    const result = await updateCartItem({
      userId: req.user?._id,
      productId,
      quantity,
    });

    if (result.status >= 400)
      return res.status(result.status).json({ message: result.data });

    res.json(result.data);
  } catch (error) {
    res.status(500).json({ message: "Failed to update cart item", error });
  }
});

router.delete(
  "/items/:productId",
  validateJWT,
  async (req: ExtendRequest, res) => {
    const { productId } = req.params;

    if (!productId)
      return res.status(400).json({ message: "Missing required productId" });

    try {
      const result = await deleteCartItem({ userId: req.user?._id, productId });

      if (result.status >= 400)
        return res.status(result.status).json({ message: result.data });

      res.json(result.data);
    } catch (error) {
      res.status(400).json({ message: "Failed to delete cart item", error });
    }
  }
);

router.post("/checkout", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const result = await checkout({
      userId: req.user?._id,
      address: req.body.address,
    });
    
    if (result.status >= 400)
      return res.status(result.status).json({ message: result.data });

    res.json(result.data);
  } catch (error) {
    res.status(500).json({ message: "Failed to checkout" });
  }
});

export default router;
