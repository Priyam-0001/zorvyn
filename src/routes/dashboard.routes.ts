import { Router } from "express";
import {
    getDashboardSummary,
    getCategoryBreakdown,
    getRecentTransactions,
    getMonthlyTrends
} from "../controllers/dashboard.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { authorize } from "../middlewares/authorize.js";
import { Role } from "../models/user.model.js";

const router = Router();

router.get("/summary", authorize(Role.VIEWER, Role.ANALYST, Role.ADMIN) ,asyncHandler(getDashboardSummary));
router.get("/categories", authorize(Role.VIEWER, Role.ANALYST, Role.ADMIN), asyncHandler(getCategoryBreakdown));
router.get("/recent", authorize(Role.VIEWER, Role.ANALYST, Role.ADMIN), asyncHandler(getRecentTransactions));
router.get("/trends", authorize(Role.VIEWER, Role.ANALYST, Role.ADMIN), asyncHandler(getMonthlyTrends));

export default router;