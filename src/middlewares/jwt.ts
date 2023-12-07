import dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";

dotenv.config();

export default function jwtChecker(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  try {
    const authorizationToken = req.headers.authorization;
    const token = authorizationToken?.split(" ")[1];
    jwt.verify(token || " ", process.env.TOKEN_SECERT!);
  } catch (error) {
    res.status(401);
    res.json("Access denied, invalid token");
    return;
  }
  next();
}
