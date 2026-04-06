import type { Request, Response } from "express";
import { Finance } from "../models/finance.model.js";
import type { z } from "zod";
import { createFinanceSchema } from "../utils/finance.validation.js";
import { ApiError } from "../utils/ApiError.js";
import mongoose from "mongoose";

type CreateFinanceInput = z.infer<typeof createFinanceSchema>;

export const createFinance = async (
    req: Request<{}, {}, CreateFinanceInput>,
    res: Response
) => {

    const payload = {
        ...req.body,
        notes: req.body.notes ?? null
    };

    const record = await Finance.create(payload);

    res.status(201).json({
        success: true,
        data: record
    })
}

export const getFinances = async (req: Request, res: Response) => {
    const { type , category, startDate, endDate} = req.query;

    const filter: any = {};

    if(type) filter.type = type;
    if(category) filter.category = category;

    if(startDate || endDate){
        filter.date ={}
        if(startDate) filter.date.$gte = new Date(startDate as string);
        if(endDate) filter.date.$lte = new Date(endDate as string);
    }

    const records = await Finance.find(filter).sort({date: -1});

    res.json({
        success: true,
        data: records
    });
};

export const updateFinance = async (req: Request, res: Response) => {
    
    const { id } = req.params;
    
    if(!id || Array.isArray(id)){
        throw new ApiError(400, "Invalid ID");
    }

    if(!mongoose.Types.ObjectId.isValid(id)){
        throw new ApiError(400, "Invalid ID");
    }
    
    const record = await Finance.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
    );

    if(!record){
        throw new ApiError(404, "Record not found");
    }

    res.json({
        success: true,
        data: record
    });
};

export const deleteFinance = async (req: Request, res: Response) => {
    
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
        throw new ApiError(400, "Invalid ID");
    }

    if(!mongoose.Types.ObjectId.isValid(id)){
        throw new ApiError(400, "Invalid ID");
    }

    const record = await Finance.findByIdAndDelete(id);

    if(!record){
        throw new ApiError(404, "Record not found");
    }

    res.json({
        success: true,
        message: "Deleted successfully"
    });
};