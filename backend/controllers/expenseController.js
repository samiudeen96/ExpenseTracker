import { extractedDate } from "../helper/helper.js";
import {
  addExpenseByUser,
  deleteExpenseByUser,
  getExpensesByUser,
} from "../models/expenseModel.js";
import xlsx from "xlsx";

const addExpense = async (req, res) => {
  const userId = req.user.id;
  const { category, amount, image, date } = req.body;

  try {
    const addedDetails = await addExpenseByUser(
      userId,
      category,
      amount,
      image,
      date
    );

    res.status(201).json({
      success: true,
      message: addedDetails,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const getExpenses = async (req, res) => {
  const userId = req.user.id;

  try {
    const expenses = await getExpensesByUser(userId);
    res.status(200).json({
      success: true,
      expenses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

const deleteExpense = async (req, res) => {
  const userId = req.user.id;
  const id = req.params.id;

  try {
    await deleteExpenseByUser(id, userId);
    res.status(200).json({
      success: true,
      message: "Successfully deleted",
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const getExpenseInExcel = async (req, res) => {
  const userId = req.user.id;

  try {
    const expenseExcel = await getExpensesByUser(userId);

    const data = expenseExcel.map((item) => ({
      category: item.resource,
      Amount: item.amount,
      Date: extractedDate(item.date),
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "expense");
    xlsx.writeFile(wb, "expense_details.xlsx");
    res.download("expense_details.xlsx");
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export { addExpense, getExpenses, deleteExpense, getExpenseInExcel };
