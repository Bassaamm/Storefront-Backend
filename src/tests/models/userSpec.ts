import { User } from "../../models/user";

const user = new User();

describe("Users Model", () => {
  it("index method", () => {
    expect(user.index).toBeDefined();
  });
  it("show method", () => {
    expect(user.show).toBeDefined();
  });
  it(" create method", () => {
    expect(user.create).toBeDefined();
  });
});
