import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const db = mysql
  .createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.PORT,
  })
  .promise();

export default db;
 