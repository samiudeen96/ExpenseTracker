import {
  addExpenseByUser,
  deleteExpenseByUser,
  getExpensesByUser,
} from "../models/expenseModel.js";

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

export { addExpense, getExpenses, deleteExpense };
