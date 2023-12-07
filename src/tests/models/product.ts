import postgresClient from "../../database";
import { Product } from "../../models/product";

describe("Product Model", async () => {
  const product = new Product();
  const conn = await postgresClient.connect();

  it("should create a product", async () => {
    const result = await product.create({
      name: "product",
      price: 100,
      category: "a",
    });
    expect(result).toEqual({
      id: 1,
      name: "Test product",
      price: 100,
      category: "a",
    });
  });

  it("should update a product", async () => {
    const result = await product.update({
      id: 1,
      name: "product",
      price: 100,
      category: "a",
    });
    expect(result).toEqual({
      id: 1,
      name: "product 2 ",
      price: 100,
      category: "b",
    });
  });

  it("should return a list of products", async () => {
    const result = await product.index();
    expect(result).toEqual([
      {
        id: 1,
        name: "product 2 ",
        price: 100,
        category: "b",
      },
    ]);
  });

  it("should return the correct product", async () => {
    const result = await product.show(1);
    expect(result).toEqual({
      id: 1,
      name: "product 2 ",
      price: 100,
      category: "b",
    });
  });

  it("should delete the product", async () => {
    await product.delete(1);
    const result = await product.index();

    expect(result).toEqual([]);
  });
  conn.release();
});
