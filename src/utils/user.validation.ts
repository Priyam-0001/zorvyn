import { z } from "zod";

export const createUserSchema = z.object({
    name: z.string().trim().min(1, "Name is required"),
    email: z.string().trim().pipe(z.email({ message: "Invalid email" })),
    password: z.string().min(6),
    role: z.enum(["VIEWER", "ANALYST", "ADMIN"]).default("VIEWER"),
    isActive: z.boolean().default(true)
});