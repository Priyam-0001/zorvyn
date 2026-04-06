import { z } from "zod";

export const createFinanceSchema = z.object({
    amount: z.number().positive(),
    type: z.enum(["INCOME", "EXPENSE"]),
    category: z.string().min(1),
    date: z.coerce.date(),
    notes: z.string().nullable().optional()
});

export const updateFinanceSchema = createFinanceSchema.partial();