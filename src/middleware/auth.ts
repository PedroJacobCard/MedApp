import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import authSecret from "../config/authSecret";

export default function(req: Request, res: Response, next: NextFunction) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    jwt.verify(token, authSecret.secret as string);
    return next();
  } catch (error) {
    return res.status(401).json({ error: "Ivalid token." })
  }
}