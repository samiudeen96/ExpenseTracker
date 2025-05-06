import express from "express";
import requireAuth from "../middleware/auth.js";
import { getDashboardData } from "../controllers/dashboardController.js";

const dashboardRoute = express.Router();

dashboardRoute.get('/totalAmount', requireAuth, getDashboardData)

export default dashboardRoute;
