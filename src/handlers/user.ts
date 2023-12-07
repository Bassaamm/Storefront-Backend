import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import express from "express";
import { User } from "../models/user";
import { UserType } from "../types/user";
import jwtChecker from "../middlewares/jwt";

dotenv.config();

const userStore = new User();

export const getUsers = async (req: express.Request, res: express.Response) => {
  try {
    const allUsers: UserType[] = await userStore.index();
    res.status(200).json({ users: allUsers });
  } catch (error) {
    res.status(500).send(`Error while calling all the users , ${error}`);
  }
};
export const getUserById = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const userId: Number = Number(req.params.id);
    const user: UserType = await userStore.show(userId);
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).send(`Error while calling the user , ${error}`);
  }
};
export const createUser = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const user: UserType = req.body;
    const createUser = await userStore.create(user);
    const token = jwt.sign({ user: createUser }, process.env.TOKEN_SECERT!);
    res.status(200).json({ token: token });
  } catch (error) {
    res.status(500).send(`Error while creating the user , ${error}`);
  }
};

export const updateUser = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const user: UserType = req.body;
    await userStore.update(user);
    res.status(200).json({ message: "Account updated" });
  } catch (error) {
    res.status(500).send(`Error while creating the user , ${error}`);
  }
};

export const deleteUser = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const id = Number(req.params);
    await userStore.delete(id);
    res.status(200).json({ message: "Account updated" });
  } catch (error) {
    res.status(500).send(`Error while creating the user , ${error}`);
  }
};
