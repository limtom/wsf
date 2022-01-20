/**
 * JWT creation logic
 */

//Dependencies 
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

//Create a token 
export const getTokens = ({ user_id, phone_number, role }: { user_id: string, phone_number: string, role:string }) => {

    //Create the accessToken 
    const accessToken = jwt.sign({ user_id, phone_number, role }, <string>process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })

    //Creat the refresh token 
    const refreshToken = jwt.sign({ user_id, phone_number, role }, <string>process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1y' })

    //return the tokens 
    return {
        accessToken, refreshToken
    }

}

//Verify token 
export const verifytoken = async (token: string, secret:string) => {
    try {
        const decoded = jwt.verify(token, secret, { ignoreExpiration: true });
        return {
            valid: true,
            expired: false,
            decoded
        }
    } catch (error: any) {
        return {
            valid: false,
            expired: error.message === 'jwt expired',
            decoded: null
        }
    }
}