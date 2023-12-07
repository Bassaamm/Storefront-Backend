import express from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../handlers/product";
import jwtChecker from "../middlewares/jwt";

const productRoutes = express.Router();

productRoutes.get("/all", getProducts);
productRoutes.post("/create", jwtChecker, createProduct);
productRoutes.get("/:id", getProductById);
productRoutes.put("/update", jwtChecker, updateProduct);
productRoutes.delete("/delete/:id", jwtChecker, deleteProduct);

export default productRoutes;
