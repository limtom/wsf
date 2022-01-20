/**
 * Middleware for handling try and catch
 * @param fn: the controller function 
 */

//Dependencies
import { Request, Response, NextFunction } from 'express';

export const asyncWrapper = (fn: any) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			await fn(req, res, next);
		} catch (error) {
			next(error);
		}
	};
};
