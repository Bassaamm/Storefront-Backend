import express from "express";
import {
  addProductToOrder,
  createOrder,
  deleteOrder,
  getCurrentOrders,
  index,
  show,
  updateOrder,
} from "../handlers/order";

const orderRoutes = express.Router();

orderRoutes.get("/ ", index);
orderRoutes.post("/create ", createOrder);
orderRoutes.get("/:id ", show);
orderRoutes.post("/addorder/:id ", addProductToOrder);
orderRoutes.put("/updateOrder/:id ", updateOrder);
orderRoutes.delete("/deleteOrder/:id ", deleteOrder);
orderRoutes.get("/currentorders/:id ", getCurrentOrders);

export default orderRoutes;
