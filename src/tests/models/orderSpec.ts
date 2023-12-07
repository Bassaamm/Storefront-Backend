import { Order } from "../../models/order";
import postgresClient from "../../database";

describe("Order Model", async () => {
  const order = new Order();
  const conn = await postgresClient.connect();

  it("index method", () => {
    expect(order.index).toBeDefined();
  });
  it("show method", () => {
    expect(order.show).toBeDefined();
  });
  it(" create method", () => {
    expect(order.create).toBeDefined();
  });
  it("should get all orders", async () => {
    const res = await order.index();
    expect(res).toEqual(jasmine.any(Array));
  });

  it("should get an order by id", async () => {
    const res = await order.show(1); // assuming an order with id 1 exists
    expect(res).toEqual(jasmine.any(Object));
    expect(res.id).toEqual(1);
  });
  afterAll(() => conn.release());
});
