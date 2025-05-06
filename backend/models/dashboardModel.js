import db from "../config/db.js";

// Income

const last60DaysIncome = async (user_id) => {
  const [rows] = await db.query(
    `SELECT *,'income' AS type, source AS resource FROM incomes WHERE user_id=? AND date >= CURRENT_DATE() - INTERVAL 60 DAY`,
    [user_id]
  );

  return rows;
};

const last60DaysTotalIncome = async (user_id) => {
  const [rows] = await db.query(
    `SELECT SUM(amount) AS total_count FROM incomes WHERE user_id=? AND date >= CURRENT_DATE() - INTERVAL 60 DAY`,
    [user_id]
  );

  return rows[0].total_count || 0;
};

// Expense

const last30DaysExpense = async (user_id) => {
  const [rows] = await db.query(
    `SELECT *,'expense' AS type, category AS resource FROM expenses WHERE user_id=? AND date >= CURRENT_DATE() - INTERVAL 30 DAY`,
    [user_id]
  );

  return rows;
};

const last30DaysTotalExpense = async (user_id) => {
  const [rows] = await db.query(
    `SELECT SUM(amount) AS total_count FROM expenses WHERE user_id=? AND date >= CURRENT_DATE() - INTERVAL 30 DAY`,
    [user_id]
  );

  return rows[0].total_count || 0;
};

const newTransaction = async (user_id) => {
  const [rows] = await db.query(
    `
      SELECT * FROM (
          SELECT 'income' AS type, i.source AS resource, i.image, i.amount, i.date 
          FROM incomes AS i 
          WHERE i.user_id = ?
          
          UNION ALL
  
          SELECT 'expense' AS type, e.category AS resource, e.image, e.amount, e.date 
          FROM expenses AS e 
          WHERE e.user_id = ?
      ) AS combined
      ORDER BY date DESC
      LIMIT 5;
      `,
    [user_id, user_id]
  );

  return rows;
};

export {
  last60DaysIncome,
  last60DaysTotalIncome,
  last30DaysExpense,
  last30DaysTotalExpense,
  newTransaction,
};
