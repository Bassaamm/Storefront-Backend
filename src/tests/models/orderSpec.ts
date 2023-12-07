import { Order } from "../../models/order";

const order = new Order();

describe("Product Model", () => {
  it("index method", () => {
    expect(order.index).toBeDefined();
  });
  it("show method", () => {
    expect(order.show).toBeDefined();
  });
  it(" create method", () => {
    expect(order.create).toBeDefined();
  });
});
