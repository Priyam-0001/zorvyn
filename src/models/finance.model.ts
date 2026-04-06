import mongoose from "mongoose";

export enum TransactionType{
    INCOME = "INCOME",
    EXPENSE = "EXPENSE"
}

const financeSchema = new mongoose.Schema(
    {
        amount: {
            type: Number,
            required: true
        },
        type: {
            type: String,
            enum: Object.values(TransactionType),
            required: true
        },
        category: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        notes: {
            type: String
        },
    },
    { timestamps: true }
);

export const Finance = mongoose.model("Finance", financeSchema);