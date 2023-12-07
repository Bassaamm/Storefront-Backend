import jwt from "jsonwebtoken";
import supertest from "supertest";
import { app } from "../../server";

const request = supertest(app);
const tokenSecret: string = "testing_secret";

const createToken = (id: number, username: string): string => {
  return jwt.sign({ id, username }, tokenSecret);
};
const token: string = createToken(1, "bearer");

describe("Product Controller Tests", () => {
  it("A new product should be returned after successful creation", () => {
    const data = {
      name: "Test",
      price: 100,
      category: "A",
    };
    request
      .post("/api/product/create")
      .set("Authorization", `Bearer ${token}`)
      .send(data)
      .expect(201)
      .expect({
        id: 1,
        name: "Test",
        price: 100,
        category: "A",
      });
  });

  it("A specific product should be displayed when given an id", () => {
    request.get("/api/product/1").expect(200).expect({
      id: 1,
      name: "Test",
      price: 100,
      category: "A",
    });
  });
  it("A product should be updated successfully", () => {
    const data = {
      name: "Test",
      price: 70,
    };
    request
      .put("/api/product/1")
      .set("Authorization", `Bearer ${token}`)
      .send(data)
      .expect(200)
      .expect({
        id: 1,
        name: "Test",
        price: 70,
        category: "C",
      });
  });
});
