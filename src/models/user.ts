import dotenv from "dotenv";
import postgresClient from "../database";
import { UserType } from "../types/user";
import bcrypt from "bcrypt";

dotenv.config();

export class User {
  async index(): Promise<UserType[]> {
    try {
      const conn = await postgresClient.connect();
      const sql = `SELECT * FROM users;`;
      const res = await conn.query(sql);
      conn.release();
      return res.rows;
    } catch (error) {
      throw error;
    }
  }

  async show(user_id: Number): Promise<UserType> {
    try {
      const conn = await postgresClient.connect();
      const sql = `SELECT * FROM users WHERE users.id = $1`;
      console.log(user_id);
      const res = await conn.query(sql, [user_id]);
      conn.release();
      return res.rows[0];
    } catch (error) {
      throw error;
    }
  }

  async create(user: UserType): Promise<UserType> {
    try {
      const { BCRYPT_PASSWORD, SALT_ROUNDES } = process.env;
      const conn = await postgresClient.connect();
      const hash = bcrypt.hashSync(
        user.password! + BCRYPT_PASSWORD!,
        parseInt(SALT_ROUNDES!),
      );
      const sql = `INSERT INTO users (firstName , lastName , password) VALUES($1,$2,$3)`;
      const res = await conn.query(sql, [user.firstName, user.lastName, hash]);
      conn.release();
      return res.rows[0];
    } catch (error) {
      throw error;
    }
  }
  async update(user: UserType): Promise<UserType> {
    try {
      // @ts-ignore
      const conn = await postgresClient.connect();
      const sql = `UPDATE users SET username = $2, first_name = $3, last_name = $4, password_digest = $5 WHERE id = $1 `;
      const result = await conn.query(sql, [
        user.id,
        user.firstName,
        user.lastName,
        user.password,
      ]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  async delete(id: Number): Promise<UserType> {
    try {
      const conn = await postgresClient.connect();
      const sql = "DELETE FROM users WHERE id=$1";
      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
}
