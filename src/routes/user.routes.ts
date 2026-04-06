import { Router } from "express";
import { createUser, getUsers, loginUser, updateUser, deleteUser } from "../controllers/user.controller.js";
import { validate } from "../middlewares/validate.js";
import { createUserSchema } from "../utils/user.validation.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { authorize } from "../middlewares/authorize.js";
import { Role } from "../models/user.model.js";
import { auth } from "../middlewares/auth.js";

const router = Router();

router.post(
    "/",
    auth,
    authorize(Role.ADMIN),
    validate(createUserSchema),
    asyncHandler(createUser)
);

router.get(
    "/",
    auth,
    authorize(Role.ANALYST, Role.ADMIN),
    asyncHandler(getUsers)
);

router.post(
    "/login",
    asyncHandler(loginUser)
)

router.patch(
    "/:id",
    auth,
    authorize(Role.ADMIN),
    asyncHandler(updateUser)
);

router.delete(
    "/:id",
    auth,
    authorize(Role.ADMIN),
    asyncHandler(deleteUser)
);

export default router;