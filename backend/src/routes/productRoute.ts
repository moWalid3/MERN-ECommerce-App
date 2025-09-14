import express from "express";
import {
  addProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../services/productService";
import validateBodyData from "../middlewares/validateBodyData";
import { body } from "express-validator";
import validateJWT from "../middlewares/validateJWT";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await getProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products", error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await getProductById(req.params.id);
    if (!product) return res.status(404).json({ message: "product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch product", error });
  }
});

router.post(
  "/",
  validateJWT,
  validateBodyData([
    body("title").notEmpty().withMessage("Title is required"),
    body("price").notEmpty().withMessage("Price is required"),
  ]),
  async (req, res) => {
    try {
      const product = await addProduct(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ message: "Failed to add product", error });
    }
  }
);

router.put("/:id", validateJWT, async (req, res) => {
  try {
    if (!req.params.id)
      return res.status(404).json({ message: "Product not found" });
    const updated = await updateProduct(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "Product not found" });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: "Failed to update product", error });
  }
});

router.delete("/:id", validateJWT, async (req, res) => {
  try {
    if (!req.params.id)
      return res.status(404).json({ message: "Product not found" });
    const deleted = await deleteProduct(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product", error });
  }
});

export default router;
