import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  ENV,
  POSTGRES_DB_TEST,
  POSTGRES_USER_TEST,
  POSTGRES_PASSWORD_TEST,
  POSTGRES_HOST_TEST,
  POSTGRES_PORT_TEST,
} = process.env;

let postgresClient: Pool;
console.log(ENV);

if (ENV == "test") {
  postgresClient = new Pool({
    host: POSTGRES_HOST_TEST,
    port: Number(POSTGRES_PORT_TEST),
    database: POSTGRES_DB_TEST,
    user: POSTGRES_USER_TEST,
    password: POSTGRES_PASSWORD_TEST,
  });
} else {
  postgresClient = new Pool({
    host: POSTGRES_HOST,
    port: Number(POSTGRES_PORT),
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  });
}

export default postgresClient;
