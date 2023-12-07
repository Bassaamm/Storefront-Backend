import jwt from "jsonwebtoken";
import supertest from "supertest";
import { app } from "../../server";

const request = supertest(app);
const tokenSecret: string = "testing_secret";

const createToken = (id: number, username: string): string => {
  return jwt.sign({ id, username }, tokenSecret);
};
const token: string = createToken(1, "bearer");

describe("User Controller Test Suite", () => {
  const newUser = {
    username: "Bassam",
    first_name: "Bassam",
    last_name: "Hey",
    password: "test",
  };
  it("User creation should be successful when all required fields are provided", () => {
    request.post("/api/user/create").send(newUser).expect(200).expect(token);
  });

  it("User creation should fail when the password is not provided", () => {
    const incompleteUser = {
      username: "Bassam",
      first_name: "Bassam",
      last_name: "Hey",
    };
    request
      .post("/api/user/create")
      .set("Authorization", `Bearer ${token}`)
      .send(incompleteUser)
      .expect(400);
  });

  it("Should fetch all users", () => {
    request
      .get("/api/users")
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .expect([
        {
          id: 1,
          username: "Bassam",
          first_name: "Bassam",
          last_name: "Hey",
        },
      ]);
  });

  it("Should delete a user successfully", () => {
    request.delete("/api/user/1").expect(200).expect({
      status: "Successfully deleted user 1",
    });
  });
});
