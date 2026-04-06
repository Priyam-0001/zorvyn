import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { ApiError } from "../utils/ApiError.js";

export const errorHandler = (
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) => {

    //Zod validation error
    if (err instanceof ZodError) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: err.issues.map((e) => ({
                field: e.path.join("."),
                message: e.message,
            })),
        });
    };

    //Mongoose validation error
    if (err instanceof Error && err.name === "ValidationError") {
        return res.status(400).json({
            success: false,
            message: err.message,
        });
    }

    //Mongo duplicate key error
    if (
        typeof err === "object" &&
        err !== null &&
        "code" in err &&
        (err as any).code === 11000
    ) {
        return res.status(409).json({
            success: false,
            message: "Duplicate field value",
        });
    }

    if(err instanceof ApiError){
        return res.status(err.statusCode).json({
            success: false,
            message: err.message
        });
    }

    //Default fallback
    if (err instanceof Error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}