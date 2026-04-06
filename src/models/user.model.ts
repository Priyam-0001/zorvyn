import mongoose from "mongoose";

export enum Role {
    VIEWER = "VIEWER",
    ANALYST = "ANALYST",
    ADMIN = "ADMIN"
}

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: Object.values(Role),
            default: Role.VIEWER
        },
        isActive: {
            type: Boolean,
            default: true
        },
    },
    { timestamps: true }
);

export const User = mongoose.model("User", userSchema);