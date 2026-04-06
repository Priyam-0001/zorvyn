import type { Request, Response } from "express";
import { Finance } from "../models/finance.model.js";

export const getDashboardSummary = async (req: Request, res: Response) => {

    const result = await Finance.aggregate([
        {
            $group: {
                _id: "$type",
                total: { $sum: "$amount"}
            }
        }
    ]);

    let totalIncome = 0;
    let totalExpense =  0;

    result.forEach((item) => {
        if(item._id === "INCOME") totalIncome = item.total;
        if(item._id === "EXPENSE") totalExpense = item.total;
    });

    const netBalance = totalIncome - totalExpense;

    res.json({
        success: true,
        data: {
            totalIncome,
            totalExpense,
            netBalance
        }
    });
};

export const getCategoryBreakdown = async (req: Request, res: Response) => {
    const result = await Finance.aggregate([
        {
            $group: {
                _id: {
                    category: "$category",
                    type: "$type"
                },
                total: { $sum: "$amount" }
            }
        },
        {
            $sort: { total: -1 }
        }
    ]);

    res.json({
        success: true,
        data: result
    });
};

export const getRecentTransactions = async (req: Request, res: Response) => {

    const records = await Finance.find()
        .sort({ createdAt: -1})
        .limit(5);

    res.json({
        success: true,
        data: records
    });
};

export const getMonthlyTrends = async (req: Request, res: Response) => {
    const result = await Finance.aggregate([
        {
            $group: {
                _id: {
                    year: { $year: "$date" },
                    month: { $month: "$date" },
                    type: "$type"
                },
                total: { $sum: "$amount" }
            }
        },
        {
            $sort: {
                "_id.year": 1,
                "_id.month": 1
            }
        }
    ]);

    res.json({
        success: true,
        data: result
    });
};