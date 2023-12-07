import postgresClient from "../database";
import { CartType } from "../types/cart";
import { OrderType } from "../types/order";

export class Order {
  async index(): Promise<OrderType[]> {
    const conn = await postgresClient.connect();
    const sql = "SELECT * FROM orders";
    const res = await conn.query(sql);
    conn.release();
    return res.rows;
  }
  async show(id: number): Promise<OrderType> {
    const conn = await postgresClient.connect();
    const sql = `SELECT * FROM orders WHERE id=$1`;
    const res = await conn.query(sql, [id]);
    conn.release();
    return res.rows[0];
  }
  async create(newOrder: OrderType): Promise<OrderType> {
    const conn = await postgresClient.connect();
    const sql = `INSERT INTO orders (status,user_id) VALUES ($1,$2)  *`;
    const res = await conn.query(sql, [newOrder.status, newOrder.userId]);
    conn.release();
    return res.rows[0];
  }
  async update(order: OrderType): Promise<OrderType> {
    const connection = await postgresClient.connect();

    const sql = `UPDATE orders SET user_id = $2, status = $3 WHERE id = $1  `;
    const result = await connection.query(sql, [
      order.id,
      order.userId,
      order.status,
    ]);
    connection.release();

    return result.rows[0];
  }

  async delete(id: number): Promise<OrderType> {
    const conn = await postgresClient.connect();

    const sql = "DELETE FROM products WHERE id= $1";
    const result = await conn.query(sql, [id]);
    conn.release();

    return result.rows[0];
  }

  async currentUserOrders(id: number): Promise<Order[]> {
    const conn = await postgresClient.connect();
    const sql = `SELECT * FROM orders WHERE user_id = $1;`;

    const result = await conn.query(sql, [id]);
    conn.release();

    return result.rows;
  }

  async addProductToOrder(cart: CartType): Promise<CartType> {
    const sql =
      "INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3)  *";
    const connection = await postgresClient.connect();

    const result = await connection.query(sql, [
      cart.orderId,
      cart.productId,
      cart.quantity,
    ]);
    connection.release();

    return result.rows[0];
  }
}
