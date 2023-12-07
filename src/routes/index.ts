import express from "express";
import userRouter from "./user";
import productRoutes from "./product";
import orderRoutes from "./order";

const api = express.Router();

api.use("/user", userRouter);
api.use("/product", productRoutes);
api.use("/order", orderRoutes);

export default api;
