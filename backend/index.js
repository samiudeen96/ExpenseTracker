import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/userRoute.js";
import { incomeRoute } from "./routes/incomeRoute.js";
import expenseRoute from "./routes/expenseRoute.js";
import dashboardRoute from "./routes/dashboardRoute.js";
dotenv.config();

const app = express();

// Middleware
app.use(express.json());

app.use(cors());

// Routes
// User Route
app.use("/api/user", userRouter);
app.use("/uploads", express.static("uploads"));

// Income Route
app.use("/api/income", incomeRoute);

// Expense Route
app.use("/api/expense", expenseRoute);

// Dashboard Route
app.use('/api/dashboard', dashboardRoute)

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
