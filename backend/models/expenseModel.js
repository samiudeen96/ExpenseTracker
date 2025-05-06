import db from "../config/db.js";

const addExpenseByUser = async (user_id, category, amount, image, date) => {
  const [result] = await db.query(
    `INSERT INTO expenses (user_id, category, amount, image, date) VALUES(?,?,?,?,?)`,
    [user_id, category, amount, image, date]
  );
  return result;
};

const getExpensesByUser = async (user_id) => {
  const [rows] = await db.query(
    `SELECT *,category As resource, 'expense' AS type FROM expenses WHERE user_id=?`,
    [user_id]
  );
  return rows;
};

const deleteExpenseByUser = async (id, user_id) => {
  const [result] = await db.query(
    `DELETE FROM expenses WHERE id=? AND user_id=?`,
    [id, user_id]
  );
  return result;
};

const getTotalExpenseByUser = async (user_id) => {
  const [rows] = await db.query(
    `SELECT SUM(amount) AS total_expense FROM expenses WHERE user_id=? `,
    [user_id]
  );
  const total = rows[0].total_expense || 0;

  return total;
  // console.log(rows[0].total_income || 0);
};

export {
  addExpenseByUser,
  getExpensesByUser,
  deleteExpenseByUser,
  getTotalExpenseByUser,
};
