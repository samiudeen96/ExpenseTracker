import db from "../config/db.js";

const createUser = async (name, email, hashedPassword, display_picture) => {
  const [result] = await db.query(
    `INSERT INTO users (name, email, password, display_picture) VALUES (?, ?, ?, ?)`,
    [name, email, hashedPassword, display_picture]
  );
  return result.insertId; // contains insertId, affectedRows, etc.
};

const getUserByEmail = async (email) => {
  const [rows] = await db.query(`SELECT * FROM users WHERE email = ?`, [email]);
  return rows[0]; // array of matching users
};

const getUserById = async (id) => {
  const [rows] = await db.query(
    `SELECT name, email, display_picture FROM users WHERE id =?`,
    [id]
  );
  return rows[0];
};

const updatePwd = async (password, id) => {
  const [result] = await db.query(
    `UPDATE users SET password = ? WHERE id = ?`,
    [password, id]
  );
  return result;
};

export { createUser, getUserByEmail, getUserById, updatePwd };
