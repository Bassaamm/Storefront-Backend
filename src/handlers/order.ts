import express from "express";
import { Order } from "../models/order";
import { CartType } from "../types/cart";
import { OrderType } from "../types/order";

const orderStore = new Order();

export const index = async (req: express.Request, res: express.Response) => {
  try {
    const allOrders = await orderStore.index();
    res.status(200).json(allOrders);
  } catch (error) {
    res.status(200).json(`Error while calling all the products ${error}`);
  }
};
export const show = async (req: express.Request, res: express.Response) => {
  try {
    const orderId = Number(req.params.id);
    const order = await orderStore.show(orderId);
    res.status(200).json(order);
  } catch (error) {
    res.status(200).json(`Error while calling all the product ${error}`);
  }
};
export const createOrder = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const order = req.body;
    const creartProduct = await orderStore.create(order);
    res.status(200).json(creartProduct);
  } catch (error) {
    res.status(200).json(`Error while creating the product ${error}`);
  }
};
export const addProductToOrder = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const orderId = Number(req.params.id);
    const productId = req.body.product_id;
    const quantity = req.body.quantity;
    const cart: CartType = {
      orderId,
      productId,
      quantity,
    };
    if (!productId || !orderId || !quantity) {
      return res.status(400).json({
        error: "Something is missing try again later",
      });
    }

    const product = await orderStore.addProductToOrder(cart);

    res.status(200).json(product);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

export const updateOrder = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { userId, status } = req.body;
    const id = Number(req.params.id);

    if (!id || !userId || !status) {
      return res.status(400).json({
        error: "Something is missing try again later",
      });
    }
    const orderObject: OrderType = {
      id,
      userId,
      status,
    };
    const order = await orderStore.update(orderObject);
    res.status(201).json(order);
  } catch (e) {
    res.status(500).json(e);
  }
};

export const deleteOrder = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    await orderStore.delete(Number(req.params.id));
    res.status(200).json({ status: `Order deleted with id ${req.params.id}` });
  } catch (e) {
    res.status(500).json(e);
  }
};

export const getCurrentOrders = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const getCurrentOrders = await orderStore.currentUserOrders(
      Number(req.params.id),
    );
    res.status(200).json(getCurrentOrders);
  } catch (e) {
    res.status(400).json(e);
  }
};
