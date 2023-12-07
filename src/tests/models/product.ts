import { Product } from "../../models/product";

const product = new Product();

describe("Product Model", () => {
  it("index method", () => {
    expect(product.index).toBeDefined();
  });
  it("show method", () => {
    expect(product.show).toBeDefined();
  });
  it(" create method", () => {
    expect(product.create).toBeDefined();
  });
});
