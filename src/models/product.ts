import postgresClient from "../database";
import { ProductType } from "../types/product";

export class Product {
  async index(): Promise<ProductType[]> {
    const conn = await postgresClient.connect();
    const sql = "SELECT * FROM product";
    const res = await conn.query(sql);
    conn.release();
    return res.rows;
  }
  async show(productId: number): Promise<ProductType> {
    const conn = await postgresClient.connect();
    const sql = `SELECT * FROM user WHERE product.id = $1`;
    const res = await conn.query(sql, [productId]);
    conn.release();
    return res.rows[0];
  }

  async create(product: ProductType) {
    const conn = await postgresClient.connect();
    const sql = `INSERT INTO products (name , price , category) VALUES($1,$2,$3)`;
    await conn
      .query(sql, [product.name, product.price, product.category])
      .then(() => console.log("product been inserted"));
  }

  async update(product: ProductType) {
    const conn = await postgresClient.connect();
    const sql = `UPDATE products SET name = $2, price = $3, category = $4 WHERE id = $1  *`;
    const result = await conn.query(sql, [
      product.id,
      product.name,
      product.price,
      product.category,
    ]);
    conn.release();
    return result.rows[0];
  }
  async delete(id: number) {
    const conn = await postgresClient.connect();
    const sql = "DELETE FROM products WHERE id=($1)";
    const result = await conn.query(sql, [id]);
    conn.release();

    return result.rows[0];
  }
}
