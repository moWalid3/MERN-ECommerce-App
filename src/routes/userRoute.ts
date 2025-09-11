import express from "express";
import { login, register } from "../services/userService";

const router = express.Router();

router.post("/register", async (req, res) => {
  const data = req.body;
  const result = await register(data);
  res.status(result.statusCode).send(result.data);
});

router.post("/login", async (req, res) => {
  const data = req.body;
  const result = await login(data);
  res.status(result.statusCode).send(result.data);
});

export default router;
