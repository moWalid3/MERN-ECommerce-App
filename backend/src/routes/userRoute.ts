import express from "express";
import { login, register } from "../services/userService";

const router = express.Router();

router.post("/register", async (req, res) => {
  const data = req.body;
  try {
    const result = await register(data);

    if (result.status >= 400)
      res.status(result.status).json({ message: result.data });

    res.status(200).json({ token: result.data });
  } catch (error) {
    res.status(500).json({ message: "Failed to register", error });
  }
});

router.post("/login", async (req, res) => {
  const data = req.body;
  try {
    const result = await login(data);

    if (result.status >= 400)
      res.status(result.status).json({ message: result.data });

    res.status(200).json({ token: result.data });
  } catch (error) {
    res.status(500).json({ message: "Failed to login", error });
  }
});

export default router;
