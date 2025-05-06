import {
  last30DaysExpense,
  last60DaysIncome,
  last30DaysTotalExpense,
  last60DaysTotalIncome,
  newTransaction,
} from "../models/dashboardModel.js";
import { getTotalExpenseByUser } from "../models/expenseModel.js";
import { getTotalIncomeByUser } from "../models/incomeModel.js";

export const getDashboardData = async (req, res) => {
  const userId = req.user.id;

  try {
    // Fetch total income and expense
    const income = await getTotalIncomeByUser(userId);
    const expense = await getTotalExpenseByUser(userId);
    const balance = income - expense;

    const totalAmt = {
      totalBalance: balance,
      totalIncome: Number(Number(income).toFixed(0)),
      totalExpense: Number(Number(expense).toFixed(0)),
    };

    // Get income transaction in the last 60 Days
    const lastSixtyDaysIncome = await last60DaysIncome(userId);
    // console.log("log last 60 days income data", lastSixtyDaysIncome);

    // Get total income for last 60 Days
    const lastSixtyDaysTotalIncome = await last60DaysTotalIncome(userId);
    // console.log("log last 60 days total income data", lastSixtyDaysTotalIncome);

    // Get expense transaction in the last 30 Days
    const lastThirtyDaysExpense = await last30DaysExpense(userId);
    // console.log("log last 60 days expense data", lastThirtyDaysExpense);

    // Get total expense for last 30 Days
    const lastThirtyDaysTotalExpense = await last30DaysTotalExpense(userId);
    // console.log("log last 30 days total expense data", lastThirtyDaysTotalExpense);

    // Fetch last 5 transactions (icome + expense)
    const latestTransaction = await newTransaction(userId);
    // console.log("log latest transaction data", latestTransaction);

    res.status(201).json({
      success: true,
      totalAmt,
      last30DaysExpenses: {
        total: Number(Number(lastThirtyDaysTotalExpense).toFixed(0)),
        transaction: lastThirtyDaysExpense,
      },
      last60DaysIncomes: {
        total: Number(Number(lastSixtyDaysTotalIncome).toFixed(0)),
        transaction: lastSixtyDaysIncome,
      },
      recentTransactions: latestTransaction,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error,
    });
  }
};
