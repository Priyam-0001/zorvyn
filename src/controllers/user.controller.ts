import type { Request, Response } from "express";
import { User } from "../models/user.model.js";
import type { z } from "zod";
import { createUserSchema } from "../utils/user.validation.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";

type CreateUserInput = z.infer<typeof createUserSchema>

export const createUser = async (
    req: Request<{}, {}, CreateUserInput>,
    res: Response
) => {

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({
        ...req.body,
        password: hashedPassword
    });
    
    const { password, ...safeUser} = user.toObject();

    res.status(201).json({
        success: true,
        data: safeUser,
    });
};

export const getUsers = async (req: Request, res: Response) => {
    const users = await User.find().select("-password");
    res.json({
        success: true,
        data: users
    });
}

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if(!user) {
        throw new ApiError(401, "Invalid credentials")
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) {
        throw new ApiError(401, "Invalid credentials")
    }

    const token = jwt.sign(
        {
            id: user._id,
            role: user.role
        },
        process.env.JWT_SECRET as string,
        { expiresIn: "1d"}
    );

    res.json({
        success: true,
        token
    });
}

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
        throw new ApiError(400, "Invalid ID");
    }

    const user = await User.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
    ).select("-password");

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    res.json({
        success: true,
        data: user
    });
};

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
        throw new ApiError(400, "Invalid ID");
    }

    const user = await User.findByIdAndDelete(id);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    res.json({
        success: true,
        message: "User deleted"
    });
};