import { Product } from "./../models/product";
import express from "express";

const ProductStore = new Product();

export const getProducts = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const allProducts = await ProductStore.index();
    res.status(200).json(allProducts);
  } catch (error) {
    res.status(200).json(`Error while calling all the products ${error}`);
  }
};
export const getProductById = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const productId = Number(req.params.id);
    const product = await ProductStore.show(productId);
    res.status(200).json(product);
  } catch (error) {
    res.status(200).json(`Error while calling all the product ${error}`);
  }
};
export const createProduct = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const product = req.body;
    const creartProduct = await ProductStore.create(product);
    res.status(200).json(creartProduct);
  } catch (error) {
    res.status(500).json(`Error while creating the product ${error}`);
  }
};

export const updateProduct = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const product = req.body;
    await ProductStore.update(product);
  } catch (error) {
    res.status(500).json(`Error while adding the product ${error}`);
  }
};
export const deleteProduct = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const product = req.body;
    await ProductStore.delete(product.id);
  } catch (error) {
    res.status(500).json(`Error while adding the product ${error}`);
  }
};
