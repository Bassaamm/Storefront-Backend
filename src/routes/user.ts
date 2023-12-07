import express from "express";
import jwtChecker from "../middlewares/jwt";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../handlers/user";

const userRouter = express.Router();

userRouter.get("/", jwtChecker, getUsers);
userRouter.post("/create", createUser);
userRouter.put("/update", jwtChecker, updateUser);
userRouter.delete("/delete/:id", jwtChecker, deleteUser);
userRouter.get("/:id", jwtChecker, getUserById);

export default userRouter;
