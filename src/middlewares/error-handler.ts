/**
 * Error hadnling middleware 
 */

//Dependencies
import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
	return res.status(500).json({ msg: err.message });
};
