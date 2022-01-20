/**
 * Middleware for validating schema
 */

//Dependencies
import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";

//Create the validate function 
export const validateSchema = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse({
            body: req.body,
            params: req.params,
            query: req.query
        })
        next()
    } catch (error: any) {
        res.status(400).send(error.errors)
    }

}