import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { Role } from "../models/user.model.js";

export const auth = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers["authorization"];

    if(!header || !header.startsWith("Bearer ")){
        return next(new ApiError(401, "Unauthorized"));
    };

    const token = String(header.split(' ')[1]);

    const secret = process.env.JWT_SECRET;

    if(!secret){
        throw new Error("JWT_SECRET is not defined");
    }
    
    try{
        const decoded = jwt.verify(
            token,
            secret as string
        ) as { id: string, role: string };
        
        if(!Object.values(Role).includes(decoded.role as Role)){
            return next(new ApiError(401, "Invalid role in token"));
        }

        req.user = {
            id: decoded.id,
            role: decoded.role as Role
        };

        next();
    } catch {
        return next(new ApiError(401, "Invalid token"));
    }

    
}