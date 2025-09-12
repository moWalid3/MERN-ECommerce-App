import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel";
import { ExtendRequest } from "../types/extendedRequest";

const validateJWT = (req: ExtendRequest, res: Response, next: NextFunction) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(403).json({ message: "No token provided" });
  }

  const token = authorizationHeader.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "Bearer token not found" });
  }

  jwt.verify(
    token,
    "SKLJ*Jfjasi2ojf@#r21iojr12kljjk@fks",
    async (error, payload) => {
      if (error) {
        return res.status(403).json({ message: "Invalid token" });
      }

      if (!payload) {
        return res.status(403).json({ message: "Invalid token payload" });
      }

      const userPayload = payload as { name: string; email: string };

      const user = await userModel.findOne({ email: userPayload.email });
      req.user = user;
      next();
    }
  );
};

export default validateJWT;
