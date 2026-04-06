import type { Request, Response, NextFunction } from "express";
import { Role } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js";

export const authorize = (...allowedRoles: Role[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = req.user;

        if(!user){
            return next(new ApiError(401, "Unauthorized"));
        }

        if(!allowedRoles.includes(user.role)){
            return next(new ApiError(403, "Forbidden"));
        };

        next();
    };
};