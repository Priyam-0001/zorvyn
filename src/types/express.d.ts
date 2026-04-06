import { Role } from "../models/user.model.ts";

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                role: Role;
            };
        }
    }
}