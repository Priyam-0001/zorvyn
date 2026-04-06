import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import type { ZodType } from "zod";

export const validate = (schema: ZodType<any>) => (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body = schema.parse(req.body);
        next();
    } catch (err) {
        if (err instanceof ZodError) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: err.issues.map((e) => ({
                    field: e.path.join("."),
                    message: e.message
                })),
            });
        }
        next(err);
    }
}