import express from "express";
import { addIncome, deleteIncome, getIncomeInExcel, getIncomes } from "../controllers/incomeController.js";
import requireAuth from "../middleware/auth.js";

const incomeRoute = express.Router();

incomeRoute.post("/add", requireAuth, addIncome);
incomeRoute.get("/list", requireAuth, getIncomes);
incomeRoute.delete("/remove/:id", requireAuth, deleteIncome);
incomeRoute.get("/download", requireAuth, getIncomeInExcel);

export { incomeRoute };
