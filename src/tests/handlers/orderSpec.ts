import jwt from "jsonwebtoken";
import supertest from "supertest";
import { app } from "../../server";

const request = supertest(app);
const tokenSecret: string = "testing_secret";

const createToken = (id: number, username: string): string => {
  return jwt.sign({ id, username }, tokenSecret);
};
const token: string = createToken(1, "bearer");

describe("Orders controllers: ", () => {
  it("/order/create should return a new order ", () => {
    const data = {
      user_id: 1,
      status: "active",
    };
    request
      .post("/api/orders/create")
      .set("Authorization", `Bearer ${token}`)
      .send(data)
      .expect("Content-Type", "application/json")
      .expect(201)
      .expect({
        id: 1,
        user_id: 1,
        status: "active",
      });
  });

  it("/addproduct/:id should add a product to an order", () => {
    const data = {
      product_id: 1,
      quantity: 10,
    };
    request
      .post("/api/order/addproduct/1")
      .set("Authorization", `Bearer ${token}`)
      .send(data)
      .expect(201)
      .expect({
        id: 1,
        order_id: 1,
        product_id: 1,
        quantity: 10,
      });
  });

  it("/orders/create should fail if status is not included in parameters", () => {
    const data = {
      user_id: 1,
    };
    request
      .post("/api/order/create")
      .set("Authorization", `Bearer ${token}`)
      .send(data)
      .expect(400)
      .expect({
        error: "there are a parameter/s missing -  status",
      });
  });

  it("/order should show all orders", () => {
    request
      .get("/api/order")
      .expect("Content-Type", "application/json")
      .expect(200)
      .expect({
        user_id: 1,
        status: "active",
      });
  });

  it("/order/:id show a order", () => {
    request
      .get("/api/order/1")
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .expect({
        id: 1,
        user_id: 1,
        status: "active",
      });
  });

  it("/order/update should update an order", () => {
    const data = {
      id: 1,
      user_id: 1,
      status: "complete",
    };
    request
      .put("/api/order/update")
      .set("Authorization", `Bearer ${token}`)
      .send(data)
      .expect(200)
      .expect({
        id: 1,
        user_id: 1,
        status: "complete",
      });
  });

  it("/order/:id should delete an order", () => {
    request
      .delete("/api/order/1")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });
});
