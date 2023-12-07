import postgresClient from "../../database";
import { User } from "../../models/user";

describe("User Model", async () => {
  const user = new User();
  const conn = await postgresClient.connect();
  it("should create a user", async () => {
    const result = await user.create({
      firstName: "Bassam",
      lastName: "H",
      password: "123123",
    });
    expect(result.firstName).toEqual("Bassam");
  });

  it("should update a user", async () => {
    const users = await user.index();
    const userId = users[0].id;

    const result = await user.update({
      id: userId,
      firstName: "Ahmed",
      lastName: "q",
      password: "123123",
    });
    expect(result.firstName).toEqual("Ahmed");
  });

  it("should return a list of users", async () => {
    const result = await user.index();
    expect(result.length).toEqual(1);
  });

  it("should return the correct user", async () => {
    const users = await user.index();
    const userId = users[0].id as number;

    const result = await user.show(userId);
    expect(result.firstName).toEqual("Ahmed");
  });

  it("should delete the user", async () => {
    let users = await user.index();
    const userId = users[0].id as number;

    await user.delete(userId);
    users = await user.index();

    expect(users.length).toEqual(0);
  });
  conn.release();
});
