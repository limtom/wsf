/**
 * User service logic; 
 * For interacting with the users table within the database 
 */

import { get, omit } from "lodash"
import { User } from "../entities/user"
import jwt from 'jsonwebtoken'
import { getTokens } from "../utils/jwtUtils"

//User interface
interface Iuser {
    name: string,
    phone_number: string,
    password?: string
    role?: string
}

//User log-in interface
interface IuserLoginDetails {
    phone_number: string,
    password: string
}

//Create a user
export const createUser = async (userObject: Iuser) => {
    try {
        const user = User.create({
            name: userObject.name,
            phone_number: userObject.phone_number,
            password: userObject.password,
            role: userObject.role
        })
        return await user.save()
    } catch (error) {
        throw new Error('A user with that phone number already exist')
    }
}

//Log a user in
export const logIn = async (loginDetails: IuserLoginDetails) => {

    //Look up the user by the user phone number 
    const user = await User.findOne({ where: { phone_number: loginDetails.phone_number } })

    //Check if user exist 
    if (!user) {
        throw new Error('The specified user does not exist')
    }

    //Otherwise compare the password 
    const passwordIsValid = user.comparePassword(loginDetails.password)

    //Check if valid or not
    if (!passwordIsValid) {
        throw new Error('Invalid phone number or password')
    }

    //If not return the user 
    return omit(user, ['password'])
}

//Get all user 
export const getAllUser = async () => {
    //Look up for all the users 
    const users = await User.find()

    //Remove the password from the users
    return users.map((user) => {
        return omit(user, ['password'])
    })
}

//Get s specific user
export const findUser = async (userId: string) => {
    const user = await User.findOne(userId)
    return omit(user, ['password'])
}

//Get s specific user
export const getUser = async (userId: string) => {
    const user = await User.findOne(userId)
    return user
}

//Update a user 
export const updateUser = async (userId: string, userObject: Iuser) => {
    const updates = await User.update({ user_id: userId }, userObject)
    return updates
}

export const reIssueAccessToken = async (refreshToken: string) => {
    //Verify the refresh token 
    const jwtPayload = jwt.verify(<string>refreshToken, <string>process.env.REFRESH_TOKEN_SECRET)

    //Validate the payload 
    if (!jwtPayload) {
        return false
    }

    //Look up for the user using the userId
    const user = await User.findOne({ where: { user_id: get(jwtPayload, 'user_id') } })

    //If user does not exist
    if (!user) {
        return false
    }

    //Extract user info 
    const { user_id, phone_number, role } = user

    //Generate a new set of tokens 
    const tokens = await getTokens({ user_id, phone_number, role })

    //return the accessToken
    return tokens.accessToken
}