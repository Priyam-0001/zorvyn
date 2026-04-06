import { Router } from "express";
import {
    createFinance,
    getFinances,
    updateFinance,
    deleteFinance
} from "../controllers/finance.controller.js"

import { validate } from "../middlewares/validate.js";
import {
    createFinanceSchema,
    updateFinanceSchema
} from "../utils/finance.validation.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { authorize } from "../middlewares/authorize.js";
import { Role } from "../models/user.model.js";

const router = Router();

router.post(
    "/",
    authorize(Role.ADMIN),
    validate(createFinanceSchema),
    asyncHandler(createFinance)
);

router.get(
    "/",
    authorize(Role.ANALYST, Role.ADMIN),
    asyncHandler(getFinances)
);

router.patch(
    "/:id",
    authorize(Role.ADMIN),
    validate(updateFinanceSchema),
    asyncHandler(updateFinance)
);

router.delete(
    "/:id",
    authorize(Role.ADMIN),
    asyncHandler(deleteFinance)
);

export default router;