import db from "../config/db.js";

const addIncomeByUser = async (user_id, source, amount, image, date) => {
  const [result] = await db.query(
    `INSERT INTO incomes (user_id, source, amount, image, date) VALUES(?,?,?,?,?)`,
    [user_id, source, amount, image, date]
  );
  return result;
};

const getIncomesByUser = async (user_id) => {
  const [rows] = await db.query(
    `SELECT *,source As resource, 'income' AS type FROM incomes WHERE user_id=?`,
    [user_id]
  );
  return rows;
};

const deleteIncomeByUser = async (id, user_id) => {
  const [result] = await db.query(
    `DELETE FROM incomes WHERE id=? AND user_id=?`,
    [id, user_id]
  );

  return result;
};

const getTotalIncomeByUser = async (user_id) => {
  const [rows] = await db.query(
    `SELECT SUM(amount) AS total_income FROM incomes WHERE user_id=? `,
    [user_id]
  );
  const total = rows[0].total_income || 0;

  return total;
  // console.log(rows[0].total_income || 0);
};

export {
  addIncomeByUser,
  getIncomesByUser,
  deleteIncomeByUser,
  getTotalIncomeByUser,
};
