import express from "express";
import {
  addExpense,
  deleteExpense,
  getExpenseInExcel,
  getExpenses,
} from "../controllers/expenseController.js";
import requireAuth from "../middleware/auth.js";

const expenseRoute = express.Router();

expenseRoute.post("/add", requireAuth, addExpense);
expenseRoute.get("/list", requireAuth, getExpenses);
expenseRoute.delete("/remove/:id", requireAuth, deleteExpense);
expenseRoute.get("/download", requireAuth, getExpenseInExcel);

export default expenseRoute;
