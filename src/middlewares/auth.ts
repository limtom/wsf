/**
 * Authenticate middleware 
 */

//Dependencies
import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
import { reIssueAccessToken } from "../services/users.service";
import { verifytoken } from "../utils/jwtUtils";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    //Get auth header 
    const authHeader = req.headers['authorization']

    //Extract the token
    const accessToken = authHeader && authHeader.split(' ')[1]//Bearer token

    //Extract the refresh token
    const refreshToken = req.cookies.refresh_Token

    //If no access token 
    if (accessToken === null) {
        res.status(403).json({ msg: 'No JWT provided' })
    }

    //Verify the access token
    try {
        //Get the toke payload
        const jwtPayload = jwt.verify(<string>accessToken, <string>process.env.ACCESS_TOKEN_SECRET)

        //Set the payload on the req
        res.locals.user = jwtPayload
    } catch (error: any) {
        if (error.message === 'jwt expired' && refreshToken) {
            //Generate a new accessToken 
            const newAccessToken = await reIssueAccessToken(refreshToken)

            //Set the access token on the header 
            if (newAccessToken) {
                res.setHeader('x-access-token', newAccessToken)
            }
            
            //Verify the token 
            const result = verifytoken(<string>newAccessToken, <string>process.env.ACCESS_TOKEN_SECRET)

            //Add the result to the request 
            res.locals.user = (await result).decoded
            return next()
        }
        res.status(403).json({ msg: error.message })
        return
    }
    next()
}